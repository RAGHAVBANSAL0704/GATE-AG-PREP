import React, { useState } from 'react';
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
  Briefcase
} from 'lucide-react';
import { 
  updateStudentProfile, 
  FACULTY_SALUTATIONS, 
  AGRI_ENGG_DEPARTMENTS 
} from '../services/authService';
import { getStoredApiKey, setStoredApiKey } from '../services/geminiService';

export default function UserProfileModal({ student, onClose, onProfileUpdated }) {
  const isFaculty = Boolean(student?.role === 'faculty' || student?.is_faculty);

  const [titlePrefix, setTitlePrefix] = useState(student?.title_prefix || 'Dr.');
  const [fullName, setFullName] = useState(student?.full_name || '');
  const [username, setUsername] = useState(student?.username ? `@${student.username.replace(/^@/, '')}` : '');
  const [gender, setGender] = useState(student?.gender || 'Male');
  const [department, setDepartment] = useState(student?.department || AGRI_ENGG_DEPARTMENTS[0]);
  const [mobileNumber, setMobileNumber] = useState(student?.mobile_number || '');
  const [dob, setDob] = useState(student?.dob || '');
  const [currentYearSem, setCurrentYearSem] = useState(student?.current_year_sem || '3rd Year / 6th Sem');
  const [admissionNo, setAdmissionNo] = useState(student?.admission_no || '');
  const [collegeName, setCollegeName] = useState(student?.college_name || student?.institute || '');
  const [address, setAddress] = useState(student?.address || '');
  const [photoUrl, setPhotoUrl] = useState(student?.profile_photo_url || '');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [geminiApiKey, setGeminiApiKey] = useState(() => getStoredApiKey());
  const [showGeminiKey, setShowGeminiKey] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const updatesCount = student?.profile_updates_count || 0;
  const remainingUpdates = Math.max(0, 3 - updatesCount);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (remainingUpdates <= 0) {
      setErrorMsg('🔒 Weekly limit reached! You can only update your profile 3 times per week.');
      return;
    }

    if (!fullName.trim()) {
      setErrorMsg('Full Name is required.');
      return;
    }

    if (newPassword && newPassword.trim().length > 0 && newPassword.trim().length < 6) {
      setErrorMsg('New password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await updateStudentProfile(student.id, {
        full_name: fullName,
        username,
        gender,
        title_prefix: isFaculty ? titlePrefix : null,
        department: isFaculty ? department : null,
        mobile_number: mobileNumber,
        dob,
        current_year_sem: isFaculty ? `Faculty • ${department}` : currentYearSem,
        admission_no: isFaculty ? (student.admission_no || `FAC-${(mobileNumber || '0000').slice(-4)}`) : admissionNo,
        college_name: collegeName,
        institute: collegeName,
        address,
        profile_photo_url: photoUrl,
        is_faculty: isFaculty,
        role: isFaculty ? 'faculty' : 'student',
        newPassword
      });

      if (res.success && res.student) {
        if (res.student.full_name) setFullName(res.student.full_name);
        if (res.student.username) setUsername(`@${res.student.username.replace(/^@/, '')}`);
        if (res.student.mobile_number) setMobileNumber(res.student.mobile_number);
        if (res.student.dob) setDob(res.student.dob);
        if (res.student.college_name) setCollegeName(res.student.college_name);
        if (res.student.address) setAddress(res.student.address);
        if (res.student.profile_photo_url) setPhotoUrl(res.student.profile_photo_url);

        setStoredApiKey(geminiApiKey);

        setSuccessMsg(`✅ Profile updated successfully! (${res.updatesRemaining} updates left this week)`);
        onProfileUpdated(res.student);
        setTimeout(() => {
          onClose();
        }, 1200);
      } else {
        setErrorMsg(res.message);
      }
    } catch (err) {
      setErrorMsg('Failed to update profile.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-auto p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            
            {/* Avatar Preview with Local Device Upload Trigger */}
            <div className={`relative group w-14 h-14 rounded-2xl p-0.5 shadow-lg shrink-0 ${
              isFaculty 
                ? 'bg-gradient-to-tr from-indigo-500 via-purple-500 to-indigo-400' 
                : 'bg-gradient-to-tr from-emerald-500 to-teal-400'
            }`}>
              <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center overflow-hidden relative">
                {photoUrl ? (
                  <img src={photoUrl} alt="Avatar" className="w-full h-full object-cover" />
                ) : isFaculty ? (
                  <Award className="w-7 h-7 text-indigo-400" />
                ) : (
                  <UserCheck className="w-7 h-7 text-emerald-400" />
                )}
                
                {/* Upload Overlay */}
                <label className="absolute inset-0 bg-slate-950/75 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                  <Upload className={`w-5 h-5 ${isFaculty ? 'text-indigo-400' : 'text-emerald-400'}`} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>{student?.display_name || student?.full_name}</span>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-mono border ${
                  isFaculty 
                    ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40 font-bold'
                    : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                }`}>
                  {isFaculty ? '🏛️ Verified Faculty' : (student?.student_type === 'hau' ? 'CCS HAU' : 'External')}
                </span>
              </h3>
              <p className="text-xs text-slate-400">{student?.email}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Rate Limit Info Banner */}
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <ShieldAlert className={`w-4 h-4 ${isFaculty ? 'text-indigo-400' : 'text-emerald-400'}`} />
            <span>Weekly Edit Limit:</span>
          </div>
          <span className={`font-bold font-mono px-2.5 py-1 rounded-lg ${
            remainingUpdates > 0 
              ? (isFaculty ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30')
              : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
          }`}>
            {remainingUpdates} of 3 edits left this week
          </span>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Edit Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs">
            
            {/* Faculty Title Prefix (If Faculty) */}
            {isFaculty && (
              <div className="space-y-1 sm:col-span-4">
                <label className="font-medium text-slate-300 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-indigo-400" />
                  Title / Prefix
                </label>
                <select
                  value={titlePrefix}
                  onChange={(e) => setTitlePrefix(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 font-semibold focus:outline-none focus:border-indigo-500"
                >
                  {FACULTY_SALUTATIONS.map((sal) => (
                    <option key={sal} value={sal}>{sal}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Full Name */}
            <div className={`space-y-1 ${isFaculty ? 'sm:col-span-8' : 'sm:col-span-12'}`}>
              <label className="font-medium text-slate-300 flex items-center gap-1.5">
                <UserCheck className={`w-3.5 h-3.5 ${isFaculty ? 'text-indigo-400' : 'text-emerald-400'}`} />
                Full Name
              </label>
              <input
                type="text"
                placeholder="e.g. Rajesh Kumar"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Faculty Department (If Faculty) */}
            {isFaculty && (
              <div className="space-y-1 sm:col-span-12">
                <label className="font-medium text-slate-300 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
                  Department
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
                >
                  {AGRI_ENGG_DEPARTMENTS.map((dept, i) => (
                    <option key={i} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Unique Username (@username) */}
            <div className="space-y-1 sm:col-span-12">
              <label className="font-medium text-slate-300 flex items-center gap-1.5">
                <AtSign className={`w-3.5 h-3.5 ${isFaculty ? 'text-indigo-400' : 'text-emerald-400'}`} />
                Unique Username (@username)
              </label>
              <div className="relative">
                <span className={`absolute left-3.5 top-1/2 -translate-y-1/2 font-mono font-bold ${isFaculty ? 'text-indigo-400' : 'text-emerald-400'}`}>@</span>
                <input
                  type="text"
                  placeholder="username"
                  value={username.replace(/^@/, '')}
                  onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                  className="w-full pl-8 pr-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>
              <p className="text-[10px] text-slate-400">Can be used to log in instead of Email or Mobile. Must be unique.</p>
            </div>

            {/* Direct Device Image File Picker Button */}
            <div className="space-y-1 sm:col-span-12">
              <label className="font-medium text-slate-300 flex items-center gap-1.5">
                <Camera className={`w-3.5 h-3.5 ${isFaculty ? 'text-indigo-400' : 'text-emerald-400'}`} />
                Profile Photo (Upload from Device Storage)
              </label>
              <div className="flex items-center gap-2">
                <label className="flex-1 px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-400 hover:text-white cursor-pointer flex items-center justify-between border-dashed hover:border-indigo-500 transition">
                  <span>{photoUrl ? 'Photo Selected! (Click to change)' : 'Choose image file from phone / PC...'}</span>
                  <Upload className={`w-4 h-4 ${isFaculty ? 'text-indigo-400' : 'text-emerald-400'}`} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    className="hidden"
                  />
                </label>
                {photoUrl && (
                  <button
                    type="button"
                    onClick={() => setPhotoUrl('')}
                    className="px-3 py-2.5 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-xl hover:bg-rose-500/20"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>

            {/* Gender Select */}
            <div className="space-y-1 sm:col-span-6">
              <label className="font-medium text-slate-300 flex items-center gap-1.5">
                <User className={`w-3.5 h-3.5 ${isFaculty ? 'text-indigo-400' : 'text-emerald-400'}`} />
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other / Prefer not to say</option>
              </select>
            </div>

            {/* Mobile Number */}
            <div className="space-y-1 sm:col-span-6">
              <label className="font-medium text-slate-300 flex items-center gap-1.5">
                <Phone className={`w-3.5 h-3.5 ${isFaculty ? 'text-indigo-400' : 'text-emerald-400'}`} />
                Mobile Number
              </label>
              <input
                type="tel"
                placeholder="10-digit mobile"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Date of Birth */}
            <div className="space-y-1 sm:col-span-6">
              <label className="font-medium text-slate-300 flex items-center gap-1.5">
                <Calendar className={`w-3.5 h-3.5 ${isFaculty ? 'text-indigo-400' : 'text-emerald-400'}`} />
                Date of Birth
              </label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Semester / Year (Only for Students) */}
            {!isFaculty && (
              <div className="space-y-1 sm:col-span-6">
                <label className="font-medium text-slate-300 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                  Semester / Year
                </label>
                <select
                  value={currentYearSem}
                  onChange={(e) => setCurrentYearSem(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-emerald-500"
                >
                  <option value="1st Year / 1st Sem">1st Year / 1st Sem</option>
                  <option value="1st Year / 2nd Sem">1st Year / 2nd Sem</option>
                  <option value="2nd Year / 3rd Sem">2nd Year / 3rd Sem</option>
                  <option value="2nd Year / 4th Sem">2nd Year / 4th Sem</option>
                  <option value="3rd Year / 5th Sem">3rd Year / 5th Sem</option>
                  <option value="3rd Year / 6th Sem">3rd Year / 6th Sem</option>
                  <option value="4th Year / 7th Sem">4th Year / 7th Sem</option>
                  <option value="4th Year / 8th Sem">4th Year / 8th Sem</option>
                  <option value="Alumnus / GATE Aspirant">Alumnus / GATE Aspirant</option>
                </select>
              </div>
            )}

            {/* HAU Admission No (Only for HAU Students) */}
            {!isFaculty && student?.student_type === 'hau' && (
              <div className="space-y-1 sm:col-span-12">
                <label className="font-medium text-slate-300 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                  HAU Admission No.
                </label>
                <input
                  type="text"
                  value={admissionNo}
                  onChange={(e) => setAdmissionNo(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-emerald-500 font-mono uppercase"
                />
              </div>
            )}

            {/* College / Institute Name */}
            <div className="space-y-1 sm:col-span-12">
              <label className="font-medium text-slate-300 flex items-center gap-1.5">
                <Building2 className={`w-3.5 h-3.5 ${isFaculty ? 'text-indigo-400' : 'text-emerald-400'}`} />
                {isFaculty ? 'Institute / University' : 'College / Institute'}
              </label>
              <input
                type="text"
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Address */}
            <div className="space-y-1 sm:col-span-12">
              <label className="font-medium text-slate-300 flex items-center gap-1.5">
                <MapPin className={`w-3.5 h-3.5 ${isFaculty ? 'text-indigo-400' : 'text-emerald-400'}`} />
                Department / Campus Address (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Department of FMPE, COAET"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Change Password */}
            <div className="space-y-1 sm:col-span-12 pt-2 border-t border-slate-800/80">
              <div className="flex items-center justify-between">
                <label className="font-medium text-slate-300 flex items-center gap-1.5">
                  <Lock className={`w-3.5 h-3.5 ${isFaculty ? 'text-indigo-400' : 'text-emerald-400'}`} />
                  Set New Password (Optional)
                </label>
                <span className="text-[10px] text-slate-500">Leave blank to keep unchanged</span>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Min 6 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pl-3.5 pr-10 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* AI Assistant API Key */}
            <div className="space-y-1 sm:col-span-12 pt-2 border-t border-slate-800/80">
              <div className="flex items-center justify-between">
                <label className="font-medium text-slate-300 flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-amber-400" />
                  Gemini API Key (Optional / Private)
                </label>
                <a 
                  href="https://aistudio.google.com/app/apikey" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[10px] text-amber-400 hover:underline flex items-center gap-1"
                >
                  <span>Get Free Key</span>
                  <Sparkles className="w-3 h-3" />
                </a>
              </div>
              <div className="relative">
                <input
                  type={showGeminiKey ? "text" : "password"}
                  placeholder="Paste your Gemini AI Studio API key here"
                  value={geminiApiKey}
                  onChange={(e) => setGeminiApiKey(e.target.value)}
                  className="w-full pl-3.5 pr-10 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-400 focus:outline-none focus:border-amber-500 font-mono text-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowGeminiKey(!showGeminiKey)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200"
                >
                  {showGeminiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

          </div>

          <div className="pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || remainingUpdates <= 0}
              className={`px-6 py-2.5 text-white font-semibold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer ${
                isFaculty
                  ? 'bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 shadow-indigo-500/20'
                  : 'bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 shadow-emerald-500/20'
              }`}
            >
              {isLoading ? (
                <span>Saving...</span>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Profile</span>
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
