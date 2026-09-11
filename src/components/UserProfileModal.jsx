import React, { useState, useEffect } from 'react';
import { 
  UserCheck, 
  Mail, 
  Phone, 
  Calendar, 
  GraduationCap, 
  Building2, 
  MapPin, 
  Camera, 
  Lock, 
  CheckCircle2, 
  AlertCircle,
  X,
  ShieldAlert,
  Save,
  Upload,
  User,
  Eye,
  EyeOff,
  AtSign,
  Sparkles,
  Key,
  Award,
  ShieldCheck,
  Briefcase,
  Clock,
  Target,
  FileText,
  Smile,
  KeyRound,
  HelpCircle,
  ShieldQuestion,
  HardDrive,
  Download,
  Database
} from 'lucide-react';
import { 
  updateStudentProfile, 
  getStudentMonthlyEditsStatus,
  FACULTY_SALUTATIONS, 
  AGRI_ENGG_DEPARTMENTS,
  PRESET_SECURITY_QUESTIONS
} from '../services/authService';
import { getStoredApiKey, setStoredApiKey } from '../services/geminiService';
import { exportFullDataJSON, importFullDataJSON, getStorageQuotaEstimate } from '../utils/indexedDB';

const PRESET_AVATARS = [
  { id: 'av_tractor', label: 'Tractor Tech', emoji: '🚜', color: 'from-amber-500 to-orange-600' },
  { id: 'av_sprout', label: 'Green Sprout', emoji: '🌱', color: 'from-emerald-500 to-teal-600' },
  { id: 'av_drone', label: 'Agri Drone', emoji: '🛸', color: 'from-sky-500 to-blue-600' },
  { id: 'av_wheat', label: 'Golden Wheat', emoji: '🌾', color: 'from-yellow-500 to-amber-600' },
  { id: 'av_solar', label: 'Solar Energy', emoji: '☀️', color: 'from-orange-500 to-rose-600' },
  { id: 'av_water', label: 'Hydro Flow', emoji: '💧', color: 'from-cyan-500 to-blue-600' },
  { id: 'av_brain', label: 'Concept Spark', emoji: '🧠', color: 'from-purple-500 to-indigo-600' },
  { id: 'av_trophy', label: 'AIR 1 Topper', emoji: '🏆', color: 'from-amber-400 to-yellow-600' }
];

export default function UserProfileModal({ student, onClose, onProfileUpdated }) {
  const [roleType, setRoleType] = useState(
    (student?.role === 'faculty' || student?.is_faculty) ? 'faculty' : 'student'
  );
  const isFaculty = roleType === 'faculty';

  const [studentType, setStudentType] = useState(student?.student_type || 'external');
  const [titlePrefix, setTitlePrefix] = useState(student?.title_prefix || 'Dr.');
  const [fullName, setFullName] = useState(student?.full_name || '');
  const [username, setUsername] = useState(student?.username ? `@${student.username.replace(/^@/, '')}` : '');
  const [gender, setGender] = useState(student?.gender || 'Male');
  const [department, setDepartment] = useState(student?.department || AGRI_ENGG_DEPARTMENTS[0]);
  const [designation, setDesignation] = useState(student?.designation || 'Faculty Mentor / Subject Expert');
  const [mobileNumber, setMobileNumber] = useState(student?.mobile_number || '');
  const [email, setEmail] = useState(student?.email || '');
  const [dob, setDob] = useState(student?.dob || '');
  const [currentYearSem, setCurrentYearSem] = useState(student?.current_year_sem || '3rd Year / 6th Sem');
  const [admissionNo, setAdmissionNo] = useState(student?.admission_no || '');
  const [collegeName, setCollegeName] = useState(student?.college_name || student?.institute || 'COAET CCS HAU Hisar');
  const [address, setAddress] = useState(student?.address || '');
  const [city, setCity] = useState(student?.city || '');
  const [state, setState] = useState(student?.state || '');
  const [pincode, setPincode] = useState(student?.pincode || '');
  const [gateTargetYear, setGateTargetYear] = useState(student?.gate_target_year || 'GATE 2027');
  const [bio, setBio] = useState(student?.bio || '');
  const [photoUrl, setPhotoUrl] = useState(student?.profile_photo_url || '');
  
  // Password & Security State
  const [oldPassword, setOldPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Security Question & Answer
  const initialIsPreset = student?.security_question && PRESET_SECURITY_QUESTIONS.includes(student.security_question);
  const [securityQuestionType, setSecurityQuestionType] = useState(
    student?.security_question 
      ? (initialIsPreset ? student.security_question : 'CUSTOM') 
      : PRESET_SECURITY_QUESTIONS[0]
  );
  const [customSecurityQuestion, setCustomSecurityQuestion] = useState(
    (student?.security_question && !initialIsPreset) ? student.security_question : ''
  );
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [showSecurityAnswer, setShowSecurityAnswer] = useState(false);

  const [geminiApiKey, setGeminiApiKey] = useState(() => getStoredApiKey());
  const [showGeminiKey, setShowGeminiKey] = useState(false);

  const [activeTab, setActiveTab] = useState('general'); // 'general' | 'academic' | 'contact' | 'photo'

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [storageInfo, setStorageInfo] = useState({ supported: false, usageMb: 0, quotaMb: 0, percent: 0 });
  const [backupStatus, setBackupStatus] = useState('');

  useEffect(() => {
    getStorageQuotaEstimate().then(setStorageInfo).catch(() => {});
  }, []);

  const handleExportBackup = async () => {
    try {
      setBackupStatus('Generating offline backup payload...');
      const json = await exportFullDataJSON();
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `GATE_AG_Prep_Backup_${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setBackupStatus('Backup exported successfully!');
      setTimeout(() => setBackupStatus(''), 3500);
    } catch (err) {
      setBackupStatus('Backup error: ' + err.message);
    }
  };

  const handleImportBackup = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setBackupStatus('Restoring data...');
      const text = await file.text();
      const res = await importFullDataJSON(text);
      if (res.success) {
        setBackupStatus('Data restored successfully! Reloading...');
        setTimeout(() => window.location.reload(), 1200);
      } else {
        setBackupStatus(res.message || 'Import failed.');
      }
    } catch (err) {
      setBackupStatus('Restore failed: ' + err.message);
    }
  };

  // Monthly Edit Limit Status
  const editStatus = getStudentMonthlyEditsStatus(student);
  const remainingUpdates = editStatus.editsRemaining;
  const isLimitLocked = editStatus.isLimitReached;
  const resetInfo = editStatus.resetInfo;

  // Handle direct local file upload from device storage
  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('Image size should be less than 5 MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoUrl(reader.result); // Base64 data URL
      setSuccessMsg('Profile photo selected! Save profile to finalize.');
    };
    reader.readAsDataURL(file);
  };

  const handleSelectPresetAvatar = (avatar) => {
    const svgAvatarData = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" rx="20" fill="%230f172a"/><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-size="48">${avatar.emoji}</text></svg>`;
    setPhotoUrl(svgAvatarData);
    setSuccessMsg(`Selected ${avatar.label} avatar!`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (isLimitLocked || remainingUpdates <= 0) {
      setErrorMsg(`🔒 Monthly limit reached (3/3 edits used)! You can edit again on ${resetInfo.formattedDate}.`);
      return;
    }

    if (!fullName.trim()) {
      setErrorMsg('Full Name is required.');
      return;
    }

    // Password validation
    if (newPassword && newPassword.trim().length > 0) {
      if (!oldPassword || !oldPassword.trim()) {
        setErrorMsg('Please enter your current (old) password to set a new password.');
        return;
      }
      if (newPassword.trim().length < 6) {
        setErrorMsg('New password must be at least 6 characters long.');
        return;
      }
      if (newPassword !== confirmNewPassword) {
        setErrorMsg('New password and Confirm Password do not match.');
        return;
      }
    }

    // Security Question validation
    let chosenSecurityQuestion = null;
    if (securityQuestionType === 'CUSTOM') {
      chosenSecurityQuestion = customSecurityQuestion.trim();
      if (!chosenSecurityQuestion && securityAnswer.trim()) {
        setErrorMsg('Please enter your custom security question.');
        return;
      }
    } else {
      chosenSecurityQuestion = securityQuestionType;
    }

    setIsLoading(true);

    try {
      const payload = {
        role: roleType,
        is_faculty: isFaculty,
        student_type: isFaculty ? 'faculty' : studentType,
        title_prefix: isFaculty ? titlePrefix : null,
        full_name: fullName,
        username,
        gender,
        department: isFaculty ? department : null,
        designation: isFaculty ? designation : null,
        mobile_number: mobileNumber,
        email,
        dob,
        current_year_sem: isFaculty ? `Faculty • ${department}` : currentYearSem,
        admission_no: isFaculty ? (student?.admission_no || `FAC-${(mobileNumber || '0000').slice(-4)}`) : (studentType === 'hau' ? admissionNo : null),
        college_name: collegeName,
        institute: collegeName,
        address,
        city,
        state,
        pincode,
        gate_target_year: !isFaculty ? gateTargetYear : null,
        bio,
        profile_photo_url: photoUrl
      };

      if (newPassword && newPassword.trim().length >= 6) {
        payload.oldPassword = oldPassword.trim();
        payload.newPassword = newPassword.trim();
      }

      if (chosenSecurityQuestion && securityAnswer.trim()) {
        payload.security_question = chosenSecurityQuestion;
        payload.security_answer = securityAnswer.trim();
      }

      const res = await updateStudentProfile(student.id, payload);

      if (res.success && res.student) {
        if (res.student.full_name) setFullName(res.student.full_name);
        if (res.student.username) setUsername(`@${res.student.username.replace(/^@/, '')}`);
        if (res.student.mobile_number) setMobileNumber(res.student.mobile_number);
        if (res.student.email) setEmail(res.student.email);
        if (res.student.dob) setDob(res.student.dob);
        if (res.student.college_name) setCollegeName(res.student.college_name);
        if (res.student.address) setAddress(res.student.address);
        if (res.student.profile_photo_url) setPhotoUrl(res.student.profile_photo_url);

        setStoredApiKey(geminiApiKey);

        setSuccessMsg(`✅ Profile updated successfully! (${res.updatesRemaining} edits left this month. Reset: ${resetInfo.formattedDate})`);
        onProfileUpdated(res.student);
        setTimeout(() => {
          onClose();
        }, 1300);
      } else {
        setErrorMsg(res.message || 'Failed to update profile.');
      }
    } catch (err) {
      setErrorMsg('An unexpected error occurred while saving your profile.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-slate-900 dark:text-slate-100">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70 shrink-0">
          <div className="flex items-center gap-3">
            {/* Avatar preview */}
            <div className={`relative group w-12 h-12 rounded-2xl p-0.5 shadow-md shrink-0 ${
              isFaculty 
                ? 'bg-gradient-to-tr from-indigo-500 via-purple-500 to-indigo-400' 
                : 'bg-gradient-to-tr from-emerald-500 to-teal-400'
            }`}>
              <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center overflow-hidden relative">
                {photoUrl ? (
                  <img src={photoUrl} alt="Avatar" className="w-full h-full object-cover" />
                ) : isFaculty ? (
                  <Award className="w-6 h-6 text-indigo-400" />
                ) : (
                  <UserCheck className="w-6 h-6 text-emerald-400" />
                )}
              </div>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>{fullName || student?.full_name || 'My Profile'}</span>
                <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-mono border font-semibold ${
                  isFaculty 
                    ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30' 
                    : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                }`}>
                  {isFaculty ? '🏛️ Faculty Mentor' : (studentType === 'hau' ? 'CCS HAU Aspirant' : 'Aspirant')}
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">{student?.email || 'GATE AG Aspirant'}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            aria-label="Close Profile"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Strict 3-Edit Monthly Limit Banner */}
        <div className="px-5 sm:px-7 pt-4 pb-2 shrink-0">
          <div className={`p-3.5 rounded-2xl border text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 ${
            isLimitLocked
              ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/60 text-rose-900 dark:text-rose-200'
              : 'bg-slate-50 dark:bg-slate-950/70 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
          }`}>
            <div className="flex items-center gap-2.5">
              <div className={`p-2 rounded-xl shrink-0 ${
                isLimitLocked 
                  ? 'bg-rose-500/20 text-rose-600 dark:text-rose-400' 
                  : (isFaculty ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400')
              }`}>
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold flex items-center gap-1.5">
                  <span>Monthly Profile Edits:</span>
                  <span className={`font-mono px-2 py-0.5 rounded-md text-[11px] ${
                    isLimitLocked 
                      ? 'bg-rose-600 text-white font-black' 
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white font-bold'
                  }`}>
                    {3 - remainingUpdates} / 3 Used
                  </span>
                </div>
                <p className="text-[11px] opacity-80 mt-0.5">
                  Strict 3 edits allowed per calendar month ({resetInfo.currentMonthName}).
                </p>
              </div>
            </div>

            <div className="sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200 dark:border-slate-800 shrink-0">
              <span className="text-[10px] uppercase font-bold tracking-wider opacity-70 block">Next Limit Reset Date & Time:</span>
              <span className={`font-bold font-mono text-xs ${
                isLimitLocked ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'
              }`}>
                📅 {resetInfo.formattedDate}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
                ({resetInfo.daysRemaining} days, {resetInfo.hoursRemaining}h remaining)
              </span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-5 sm:px-7 pt-2 shrink-0">
          <div className="flex items-center gap-1.5 border-b border-slate-200 dark:border-slate-800 text-xs overflow-x-auto pb-1 scrollbar-none">
            <button
              type="button"
              onClick={() => setActiveTab('general')}
              className={`px-3.5 py-2 rounded-xl font-semibold transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'general'
                  ? (isFaculty ? 'bg-indigo-600 text-white shadow-md' : 'bg-emerald-600 text-white shadow-md')
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Identity & Role</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('academic')}
              className={`px-3.5 py-2 rounded-xl font-semibold transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'academic'
                  ? (isFaculty ? 'bg-indigo-600 text-white shadow-md' : 'bg-emerald-600 text-white shadow-md')
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{isFaculty ? 'Faculty & Dept' : 'Academic & Exam'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('contact')}
              className={`px-3.5 py-2 rounded-xl font-semibold transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'contact'
                  ? (isFaculty ? 'bg-indigo-600 text-white shadow-md' : 'bg-emerald-600 text-white shadow-md')
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Contact & Address</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('photo')}
              className={`px-3.5 py-2 rounded-xl font-semibold transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'photo'
                  ? (isFaculty ? 'bg-indigo-600 text-white shadow-md' : 'bg-emerald-600 text-white shadow-md')
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Photo & Security</span>
            </button>
          </div>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-5 sm:px-7 py-4 space-y-4">
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* TAB 1: GENERAL & IDENTITY */}
          {activeTab === 'general' && (
            <div className="space-y-4 text-xs">
              
              {/* Account Role Selector: Student vs Faculty */}
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Account Type / Role</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    disabled={isLimitLocked}
                    onClick={() => setRoleType('student')}
                    className={`p-3 rounded-2xl border text-left transition cursor-pointer flex items-center gap-3 ${
                      !isFaculty 
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-500/20' 
                        : 'bg-slate-50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                    }`}
                  >
                    <div className={`p-2 rounded-xl ${!isFaculty ? 'bg-emerald-500 text-white' : 'bg-slate-200 dark:bg-slate-800'}`}>
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-xs">Student / Aspirant</div>
                      <div className="text-[10px] opacity-75">GATE AG Candidate</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    disabled={isLimitLocked}
                    onClick={() => setRoleType('faculty')}
                    className={`p-3 rounded-2xl border text-left transition cursor-pointer flex items-center gap-3 ${
                      isFaculty 
                        ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500 text-indigo-900 dark:text-indigo-200 ring-2 ring-indigo-500/20' 
                        : 'bg-slate-50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                    }`}
                  >
                    <div className={`p-2 rounded-xl ${isFaculty ? 'bg-indigo-500 text-white' : 'bg-slate-200 dark:bg-slate-800'}`}>
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-xs">Faculty / Mentor</div>
                      <div className="text-[10px] opacity-75">Professor / Guide</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Salutation / Title Prefix (If Faculty) */}
              {isFaculty && (
                <div className="space-y-1">
                  <label className="font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-indigo-500" />
                    Title / Salutation
                  </label>
                  <select
                    disabled={isLimitLocked}
                    value={titlePrefix}
                    onChange={(e) => setTitlePrefix(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 font-semibold focus:outline-none focus:border-indigo-500"
                  >
                    {FACULTY_SALUTATIONS.map((sal) => (
                      <option key={sal} value={sal}>{sal}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Full Name */}
              <div className="space-y-1">
                <label className="font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <UserCheck className={`w-3.5 h-3.5 ${isFaculty ? 'text-indigo-500' : 'text-emerald-500'}`} />
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  disabled={isLimitLocked}
                  placeholder="e.g. Raghav Bansal"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              {/* Username (@username) */}
              <div className="space-y-1">
                <label className="font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <AtSign className={`w-3.5 h-3.5 ${isFaculty ? 'text-indigo-500' : 'text-emerald-500'}`} />
                  Unique Username (@handle)
                </label>
                <div className="relative">
                  <span className={`absolute left-3.5 top-1/2 -translate-y-1/2 font-mono font-bold ${isFaculty ? 'text-indigo-500' : 'text-emerald-500'}`}>@</span>
                  <input
                    type="text"
                    disabled={isLimitLocked}
                    placeholder="raghav_bansal"
                    value={username.replace(/^@/, '')}
                    onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                    className="w-full pl-8 pr-3.5 py-2.5 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
                <p className="text-[10px] text-slate-500">Allows fast login without typing full email. Letters, numbers, and underscores only.</p>
              </div>

              {/* Gender & DOB */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    Gender
                  </label>
                  <select
                    disabled={isLimitLocked}
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other / Prefer not to specify</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    disabled={isLimitLocked}
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Aspirant Bio / Motto */}
              <div className="space-y-1">
                <label className="font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  {isFaculty ? 'Faculty Bio / Research Interests' : 'Aspirant Motto / Goal Bio'}
                </label>
                <textarea
                  rows="2"
                  disabled={isLimitLocked}
                  placeholder={isFaculty ? 'e.g. Research in Precision Farm Machinery & AI...' : 'e.g. Aiming for All-India Rank 1 in GATE AG 2027! 🚜🌾'}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500 text-xs resize-none"
                />
              </div>

            </div>
          )}

          {/* TAB 2: ACADEMIC & EXAM / FACULTY INFO */}
          {activeTab === 'academic' && (
            <div className="space-y-4 text-xs">
              {isFaculty ? (
                /* FACULTY FIELDS */
                <>
                  <div className="space-y-1">
                    <label className="font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-indigo-500" />
                      Department
                    </label>
                    <select
                      disabled={isLimitLocked}
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
                    >
                      {AGRI_ENGG_DEPARTMENTS.map((dept, i) => (
                        <option key={i} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-indigo-500" />
                      Designation / Position
                    </label>
                    <input
                      type="text"
                      disabled={isLimitLocked}
                      placeholder="e.g. Assistant Professor / Senior Scientist"
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-indigo-500" />
                      University / Institution
                    </label>
                    <input
                      type="text"
                      disabled={isLimitLocked}
                      placeholder="e.g. CCS HAU Hisar / IIT Kharagpur / PAU Ludhiana"
                      value={collegeName}
                      onChange={(e) => setCollegeName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </>
              ) : (
                /* STUDENT FIELDS */
                <>
                  <div className="space-y-1">
                    <label className="font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-emerald-500" />
                      Student Category
                    </label>
                    <select
                      disabled={isLimitLocked}
                      value={studentType}
                      onChange={(e) => setStudentType(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500 font-semibold"
                    >
                      <option value="hau">CCS HAU Hisar Student</option>
                      <option value="external">Other State / Central Agri University Student</option>
                      <option value="visitor">Independent GATE AG Aspirant</option>
                    </select>
                  </div>

                  {studentType === 'hau' && (
                    <div className="space-y-1">
                      <label className="font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5 text-emerald-500" />
                        HAU Admission Number
                      </label>
                      <input
                        type="text"
                        disabled={isLimitLocked}
                        placeholder="e.g. 2022AE01BIV"
                        value={admissionNo}
                        onChange={(e) => setAdmissionNo(e.target.value.toUpperCase())}
                        className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500 font-mono uppercase"
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                        Semester / Current Year
                      </label>
                      <select
                        disabled={isLimitLocked}
                        value={currentYearSem}
                        onChange={(e) => setCurrentYearSem(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
                      >
                        <option value="1st Year / 1st Sem">1st Year / 1st Sem</option>
                        <option value="1st Year / 2nd Sem">1st Year / 2nd Sem</option>
                        <option value="2nd Year / 3rd Sem">2nd Year / 3rd Sem</option>
                        <option value="2nd Year / 4th Sem">2nd Year / 4th Sem</option>
                        <option value="3rd Year / 5th Sem">3rd Year / 5th Sem</option>
                        <option value="3rd Year / 6th Sem">3rd Year / 6th Sem</option>
                        <option value="4th Year / 7th Sem">4th Year / 7th Sem</option>
                        <option value="4th Year / 8th Sem">4th Year / 8th Sem</option>
                        <option value="Alumnus / Passout Aspirant">Alumnus / Passout Aspirant</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <Target className="w-3.5 h-3.5 text-emerald-500" />
                        Target GATE AG Exam
                      </label>
                      <select
                        disabled={isLimitLocked}
                        value={gateTargetYear}
                        onChange={(e) => setGateTargetYear(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500 font-semibold"
                      >
                        <option value="GATE 2027">GATE 2027 (Primary Aim)</option>
                        <option value="GATE 2028">GATE 2028</option>
                        <option value="GATE 2029">GATE 2029</option>
                        <option value="GATE 2030">GATE 2030</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-emerald-500" />
                      College / Institute Name
                    </label>
                    <input
                      type="text"
                      disabled={isLimitLocked}
                      placeholder="e.g. COAET CCS HAU Hisar / GBPUAT Pantnagar"
                      value={collegeName}
                      onChange={(e) => setCollegeName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </>
              )}
            </div>
          )}

          {/* TAB 3: CONTACT & ADDRESS */}
          {activeTab === 'contact' && (
            <div className="space-y-4 text-xs">
              
              <div className="space-y-1">
                <label className="font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-500" />
                  Mobile Number (Contact)
                </label>
                <input
                  type="tel"
                  disabled={isLimitLocked}
                  placeholder="10-digit mobile number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-emerald-500" />
                  Email Address
                </label>
                <input
                  type="email"
                  disabled={isLimitLocked}
                  placeholder="e.g. aspirant@gateagprep.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                  Campus / Residential Address
                </label>
                <input
                  type="text"
                  disabled={isLimitLocked}
                  placeholder="Hostel / Department / House Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-medium text-slate-700 dark:text-slate-300">City</label>
                  <input
                    type="text"
                    disabled={isLimitLocked}
                    placeholder="Hisar"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-medium text-slate-700 dark:text-slate-300">State</label>
                  <input
                    type="text"
                    disabled={isLimitLocked}
                    placeholder="Haryana"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-medium text-slate-700 dark:text-slate-300">PIN Code</label>
                  <input
                    type="text"
                    disabled={isLimitLocked}
                    placeholder="125004"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: PHOTO, PRESET AVATARS & SECURITY */}
          {activeTab === 'photo' && (
            <div className="space-y-4 text-xs">
              
              {/* Profile Photo Uploader */}
              <div className="space-y-2">
                <label className="font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-emerald-500" />
                  Profile Photo (Direct File Upload from Device)
                </label>
                <div className="flex items-center gap-2">
                  <label className={`flex-1 px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-between border-dashed hover:border-emerald-500 transition ${isLimitLocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
                    <span>{photoUrl ? 'Photo Selected! (Click to replace)' : 'Choose image file from phone / PC...'}</span>
                    <Upload className="w-4 h-4 text-emerald-500" />
                    <input
                      type="file"
                      disabled={isLimitLocked}
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="hidden"
                    />
                  </label>
                  {photoUrl && (
                    <button
                      type="button"
                      disabled={isLimitLocked}
                      onClick={() => setPhotoUrl('')}
                      className="px-3 py-2.5 bg-rose-500/10 border border-rose-500/30 text-rose-500 rounded-xl hover:bg-rose-500/20 cursor-pointer"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>

              {/* Preset AG Engineering Avatars */}
              <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                <label className="font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Smile className="w-3.5 h-3.5 text-amber-500" />
                  Or Choose Instant Preset Agricultural & Engineering Avatar:
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {PRESET_AVATARS.map((av) => (
                    <button
                      key={av.id}
                      type="button"
                      disabled={isLimitLocked}
                      onClick={() => handleSelectPresetAvatar(av)}
                      className="p-2 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-400 flex flex-col items-center justify-center gap-1 transition cursor-pointer group"
                      title={av.label}
                    >
                      <span className="text-xl group-hover:scale-110 transition-transform">{av.emoji}</span>
                      <span className="text-[9px] text-slate-500 dark:text-slate-400 truncate w-full text-center">{av.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Security Question for Password Recovery */}
              <div className="space-y-2.5 pt-3 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <ShieldQuestion className="w-4 h-4 text-emerald-500" />
                    <span>Security Question (For Password Recovery)</span>
                  </label>
                  <span className="text-[10px] text-slate-500 font-mono">Self-Service Reset</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Set a secret question and answer to securely reset your password if you ever forget it.
                </p>

                {/* Question Selector */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium text-slate-600 dark:text-slate-400">Select Question</label>
                  <select
                    disabled={isLimitLocked}
                    value={securityQuestionType}
                    onChange={(e) => setSecurityQuestionType(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500 text-xs font-medium"
                  >
                    {PRESET_SECURITY_QUESTIONS.map((q, idx) => (
                      <option key={idx} value={q}>{q}</option>
                    ))}
                    <option value="CUSTOM">✍️ Write my own custom security question...</option>
                  </select>
                </div>

                {/* Custom Question Text Input */}
                {securityQuestionType === 'CUSTOM' && (
                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-slate-600 dark:text-slate-400">Your Custom Question</label>
                    <input
                      type="text"
                      disabled={isLimitLocked}
                      placeholder="e.g. What was my high school physics teacher's name?"
                      value={customSecurityQuestion}
                      onChange={(e) => setCustomSecurityQuestion(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500 text-xs"
                    />
                  </div>
                )}

                {/* Security Answer */}
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-slate-600 dark:text-slate-400 flex items-center justify-between">
                    <span>Secret Answer</span>
                    <span className="text-[10px] text-slate-400">Case-insensitive</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showSecurityAnswer ? "text" : "password"}
                      disabled={isLimitLocked}
                      placeholder="Enter secret answer..."
                      value={securityAnswer}
                      onChange={(e) => setSecurityAnswer(e.target.value)}
                      className="w-full pl-3.5 pr-10 py-2.5 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500 text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSecurityAnswer(!showSecurityAnswer)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                    >
                      {showSecurityAnswer ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Password Management */}
              <div className="space-y-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <KeyRound className="w-4 h-4 text-emerald-500" />
                    <span>Change Account Password</span>
                  </label>
                  <span className="text-[10px] text-slate-500">Leave blank to keep current password</span>
                </div>

                {/* Old / Current Password */}
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1">
                    <Lock className="w-3 h-3 text-slate-400" />
                    <span>Current / Old Password</span>
                    {newPassword && <span className="text-rose-500">*</span>}
                  </label>
                  <div className="relative">
                    <input
                      type={showOldPassword ? "text" : "password"}
                      disabled={isLimitLocked}
                      placeholder="Enter your existing password to verify"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="w-full pl-3.5 pr-10 py-2.5 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500 text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => setShowOldPassword(!showOldPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                    >
                      {showOldPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* New Password & Confirm Password Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1">
                      <Lock className="w-3 h-3 text-slate-400" />
                      <span>New Password</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        disabled={isLimitLocked}
                        placeholder="Min 6 characters"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full pl-3.5 pr-10 py-2.5 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500 text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                      >
                        {showNewPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1">
                      <Lock className="w-3 h-3 text-slate-400" />
                      <span>Confirm New Password</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        disabled={isLimitLocked}
                        placeholder="Re-type new password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        className="w-full pl-3.5 pr-10 py-2.5 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500 text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                      >
                        {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gemini AI Key */}
              <div className="space-y-1 pt-2 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <label className="font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5 text-amber-500" />
                    Custom Gemini AI API Key (Optional)
                  </label>
                  <a 
                    href="https://aistudio.google.com/app/apikey" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[10px] text-amber-500 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>Get Free Key</span>
                    <Sparkles className="w-3 h-3" />
                  </a>
                </div>
                <div className="relative">
                  <input
                    type={showGeminiKey ? "text" : "password"}
                    disabled={isLimitLocked}
                    placeholder="AI Studio API key"
                    value={geminiApiKey}
                    onChange={(e) => setGeminiApiKey(e.target.value)}
                    className="w-full pl-3.5 pr-10 py-2.5 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-amber-500 font-mono text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowGeminiKey(!showGeminiKey)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                  >
                    {showGeminiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Offline Storage & Deep Data Backup */}
              <div className="space-y-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <label className="font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5 text-xs">
                    <Database className="w-3.5 h-3.5 text-blue-500" />
                    Offline Storage & Deep Data Backup
                  </label>
                  {storageInfo.supported && (
                    <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                      {storageInfo.usageMb} MB / {storageInfo.quotaMb > 0 ? `${storageInfo.quotaMb} MB` : 'Browser Quota'} ({storageInfo.percent}%)
                    </span>
                  )}
                </div>

                {storageInfo.supported && storageInfo.quotaMb > 0 && (
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-blue-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, Math.max(2, storageInfo.percent))}%` }}
                    />
                  </div>
                )}

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleExportBackup}
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700/80 text-[11px] font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-blue-500" />
                    <span>Export Backup (.json)</span>
                  </button>

                  <label className="flex-1 py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700/80 text-[11px] font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer text-center">
                    <HardDrive className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Restore Backup</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportBackup}
                      className="hidden"
                    />
                  </label>
                </div>

                {backupStatus && (
                  <div className="text-[11px] font-medium text-blue-600 dark:text-blue-400 text-center animate-fade-in">
                    {backupStatus}
                  </div>
                )}
              </div>

            </div>
          )}

          {/* Modal Footer Controls */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
            <div className="text-[11px] text-slate-500">
              {isLimitLocked ? (
                <span className="text-rose-500 font-semibold">🔒 Limit reached until {resetInfo.formattedDate}</span>
              ) : (
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">✨ {remainingUpdates} edits remaining this month</span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={isLoading || isLimitLocked}
                className={`px-5 py-2.5 text-white font-semibold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer ${
                  isFaculty
                    ? 'bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 shadow-indigo-500/20'
                    : 'bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 shadow-emerald-500/20'
                }`}
              >
                {isLoading ? (
                  <span>Saving...</span>
                ) : isLimitLocked ? (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Locked (3/3 Used)</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
}

