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
  User
} from 'lucide-react';
import { updateStudentProfile } from '../services/authService';

export default function UserProfileModal({ student, onClose, onProfileUpdated }) {
  const [fullName, setFullName] = useState(student?.full_name || '');
  const [gender, setGender] = useState(student?.gender || 'Male');
  const [mobileNumber, setMobileNumber] = useState(student?.mobile_number || '');
  const [dob, setDob] = useState(student?.dob || '');
  const [currentYearSem, setCurrentYearSem] = useState(student?.current_year_sem || '3rd Year / 6th Sem');
  const [admissionNo, setAdmissionNo] = useState(student?.admission_no || '');
  const [collegeName, setCollegeName] = useState(student?.college_name || '');
  const [address, setAddress] = useState(student?.address || '');
  const [photoUrl, setPhotoUrl] = useState(student?.profile_photo_url || '');
  const [newPassword, setNewPassword] = useState('');

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

    setIsLoading(true);

    try {
      const res = await updateStudentProfile(student.id, {
        full_name: fullName,
        gender,
        mobile_number: mobileNumber,
        dob,
        current_year_sem: currentYearSem,
        admission_no: admissionNo,
        college_name: collegeName,
        address,
        profile_photo_url: photoUrl,
        newPassword
      });

      if (res.success) {
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
            <div className="relative group w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-lg shrink-0">
              <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center overflow-hidden relative">
                {photoUrl ? (
                  <img src={photoUrl} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <UserCheck className="w-7 h-7 text-emerald-400" />
                )}
                
                {/* Upload Overlay */}
                <label className="absolute inset-0 bg-slate-950/75 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                  <Upload className="w-5 h-5 text-emerald-400" />
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
                <span>{student?.full_name}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono border border-emerald-500/30">
                  {student?.student_type === 'hau' ? 'CCS HAU' : 'External'}
                </span>
              </h3>
              <p className="text-xs text-slate-400">{student?.email}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Rate Limit Info Banner */}
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <ShieldAlert className="w-4 h-4 text-emerald-400" />
            <span>Weekly Edit Limit:</span>
          </div>
          <span className={`font-bold font-mono px-2.5 py-1 rounded-lg ${
            remainingUpdates > 0 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            
            {/* Full Name */}
            <div className="space-y-1 sm:col-span-2">
              <label className="font-medium text-slate-300 flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Direct Device Image File Picker Button */}
            <div className="space-y-1 sm:col-span-2">
              <label className="font-medium text-slate-300 flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-emerald-400" />
                Profile Photo (Upload from Device Storage)
              </label>
              <div className="flex items-center gap-2">
                <label className="flex-1 px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-400 hover:text-white cursor-pointer flex items-center justify-between border-dashed hover:border-emerald-500 transition">
                  <span>{photoUrl ? 'Photo Selected! (Click to change)' : 'Choose image file from phone / PC...'}</span>
                  <Upload className="w-4 h-4 text-emerald-400" />
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
            <div className="space-y-1">
              <label className="font-medium text-slate-300 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-emerald-400" />
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-emerald-500"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other / Prefer not to say</option>
              </select>
            </div>

            {/* Mobile Number (Optional) */}
            <div className="space-y-1">
              <label className="font-medium text-slate-300 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                Mobile Number (Optional)
              </label>
              <input
                type="tel"
                placeholder="10-digit mobile"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Date of Birth */}
            <div className="space-y-1">
              <label className="font-medium text-slate-300 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                Date of Birth
              </label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* All 8 Semesters Select */}
            <div className="space-y-1">
              <label className="font-medium text-slate-300 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                Semester / Year (All 8 Sems)
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

            {/* HAU Admission No */}
            {student?.student_type === 'hau' && (
              <div className="space-y-1 sm:col-span-2">
                <label className="font-medium text-slate-300 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                  HAU Admission No. (Formats: 2022AE01BIV, 2022AE05BLII, 2022AE05BIVR)
                </label>
                <input
                  type="text"
                  value={admissionNo}
                  onChange={(e) => setAdmissionNo(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-emerald-500 font-mono uppercase"
                />
              </div>
            )}

            {/* College Name */}
            <div className="space-y-1 sm:col-span-2">
              <label className="font-medium text-slate-300 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                College / Institute
              </label>
              <input
                type="text"
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Address */}
            <div className="space-y-1 sm:col-span-2">
              <label className="font-medium text-slate-300 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                Home / Campus Address (Optional)
              </label>
              <input
                type="text"
                placeholder="Hostel 4, CCS HAU Hisar, Haryana"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Change Password */}
            <div className="space-y-1 sm:col-span-2 pt-2 border-t border-slate-800">
              <label className="font-medium text-slate-300 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                Change Password (Optional)
              </label>
              <input
                type="password"
                placeholder="Enter new custom password (min 6 chars)"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading || remainingUpdates <= 0}
              className="flex-1 py-2.5 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile Changes</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
