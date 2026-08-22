import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Tractor, 
  UserCheck, 
  Lock, 
  Mail, 
  Phone, 
  Calendar, 
  GraduationCap, 
  Building2, 
  KeyRound, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  ChevronDown,
  User,
  Clipboard,
  Eraser,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { 
  registerStudent, 
  loginStudent, 
  getRememberedIdentifier, 
  validateHAUAdmissionNo
} from '../services/authService';

const HARYANA_AND_INDIA_COLLEGES = [
  "COAET CCS HAU Hisar (Campus Student)",
  "GJUS&T Hisar (Guru Jambheshwar University)",
  "DCRUST Murthal (Deenbandhu Chhotu Ram Univ.)",
  "YMCA UST Faridabad (J.C. Bose Univ.)",
  "Kurukshetra University (UIET / Campus)",
  "MDU Rohtak (UIET / Campus)",
  "PAU Ludhiana (Punjab Agricultural University)",
  "NDRI Karnal (National Dairy Research Institute)",
  "IARI New Delhi (Pusa Institute / ICAR)",
  "IIT Kharagpur (Agri & Food Engg. Dept.)",
  "TNAU Coimbatore (Tamil Nadu Agri Univ.)",
  "MPUAT Udaipur (Maharana Pratap Univ.)",
  "GBPUAT Pantnagar (Govind Ballabh Pant Univ.)",
  "JAU Junagadh (Junagadh Agricultural Univ.)",
  "CAET Anand Agricultural University",
  "Dr. PDKV Akola (Panjabrao Deshmukh Krishi)",
  "IGKV Raipur (Indira Gandhi Krishi Vishwavidyalaya)",
  "UBKV Cooch Behar (Uttar Banga Krishi Viswavidyalaya)",
  "Central Agricultural University (Imphal / Sikkim)",
  "Other Institute / Enter Manually"
];

export default function AuthModal({ onLoginSuccess }) {
  const [activeMode, setActiveMode] = useState('signup_hau');
  
  // Form State
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('Male');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [currentYearSem, setCurrentYearSem] = useState('3rd Year / 6th Sem');
  const [admissionNo, setAdmissionNo] = useState('');
  const [collegeName, setCollegeName] = useState(HARYANA_AND_INDIA_COLLEGES[1]);
  const [customCollege, setCustomCollege] = useState('');
  const [customPassword, setCustomPassword] = useState('');

  // Login State
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // UI State
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const remembered = getRememberedIdentifier();
    if (remembered) setLoginIdentifier(remembered);
  }, []);

  const handleInstantSignUp = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!dob) {
      setErrorMsg('Please select your Date of Birth.');
      return;
    }
    if (activeMode === 'signup_hau') {
      const validation = validateHAUAdmissionNo(admissionNo);
      if (!validation.isValid) {
        setErrorMsg(`Admission No Error: ${validation.message}`);
        return;
      }
    }

    const selectedCollege = collegeName === "Other Institute / Enter Manually" 
      ? (customCollege.trim() || "External Agricultural Institute")
      : collegeName;

    setIsLoading(true);

    try {
      const res = await registerStudent({
        studentType: activeMode === 'signup_hau' ? 'hau' : 'external',
        fullName,
        gender,
        mobileNumber,
        email,
        dob,
        currentYearSem,
        admissionNo: admissionNo.trim().toUpperCase(),
        collegeName: selectedCollege,
        customPassword
      });

      if (res.success) {
        setSuccessMsg('🎉 Welcome! Account created.');
        setTimeout(() => {
          onLoginSuccess(res.student);
        }, 500);
      } else if (res.isDuplicate) {
        setErrorMsg(res.message);
        setTimeout(() => {
          setLoginIdentifier(res.prefillIdentifier || admissionNo || fullName);
          setActiveMode('login');
          setErrorMsg('Switched to Login screen.');
        }, 1200);
      } else {
        setErrorMsg(res.message || 'Registration failed.');
      }
    } catch (err) {
      setErrorMsg('An error occurred during registration.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!loginIdentifier.trim()) {
      setErrorMsg('Please enter your Admission No, Name, Mobile, or Email.');
      return;
    }
    if (!loginPassword.trim()) {
      setErrorMsg('Please enter your password.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await loginStudent(loginIdentifier, loginPassword, rememberMe);
      if (res.success) {
        setSuccessMsg('Welcome back!');
        setTimeout(() => {
          onLoginSuccess(res.student);
        }, 400);
      } else {
        setErrorMsg(res.message);
      }
    } catch (err) {
      setErrorMsg('Login failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setLoginIdentifier(text.trim());
    } catch (e) {}
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-auto grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
        
        {/* ======================================================== */}
        {/* LEFT PANEL: EXECUTIVE SAPPHIRE & EMERALD BRANDING        */}
        {/* ======================================================== */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 via-blue-950 to-emerald-950 p-8 flex flex-col justify-between relative overflow-hidden text-white border-b lg:border-b-0 lg:border-r border-slate-800">
          
          {/* Ambient Pattern */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px]" />

          {/* Top Branding Badge */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-emerald-400 p-0.5 shadow-lg">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-emerald-400 font-black text-sm">
                AG
              </div>
            </div>
            <div>
              <h1 className="font-extrabold text-lg tracking-tight text-white flex items-center gap-1.5">
                GATE <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">AG PREP</span>
              </h1>
              <p className="text-[10px] text-blue-300 font-mono tracking-wide">Agricultural Engineering Portal</p>
            </div>
          </div>

          {/* Dynamic Vector Tractor Graphic */}
          <div className="relative z-10 my-auto py-8 flex flex-col items-center justify-center">
            <div className="relative w-44 h-44 flex items-center justify-center">
              
              {/* Rotating Concentric Rings */}
              <div className="absolute inset-0 border-2 border-dashed border-emerald-500/30 rounded-full animate-[spin_25s_linear_infinite]" />
              <div className="absolute inset-3 border border-blue-500/20 rounded-full" />
              
              {/* Soft Pulse */}
              <div className="absolute inset-8 rounded-full bg-blue-500/10 animate-ping opacity-30" />

              {/* Central Tractor Icon */}
              <div className="relative z-10 p-5 rounded-2xl bg-slate-900/90 border border-emerald-400/40 shadow-2xl backdrop-blur-md">
                <Tractor className="w-14 h-14 text-emerald-400 animate-bounce" style={{ animationDuration: '3.5s' }} />
              </div>
            </div>

            <div className="mt-6 text-center space-y-1">
              <span className="text-xs font-extrabold text-emerald-300 uppercase tracking-wider flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                HAU & ALL INDIA PORTAL
              </span>
              <p className="text-[11px] text-slate-400">Professional GATE Prep & PYQ Test Engine</p>
            </div>
          </div>

          {/* Footer Badge */}
          <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-400 font-mono pt-4 border-t border-slate-800">
            <span>COAET CCS HAU</span>
            <span className="text-blue-400 font-bold">v2026</span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* RIGHT PANEL: PREMIUM WHITE & SAPPHIRE BLUE FORM          */}
        {/* ======================================================== */}
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between bg-white dark:bg-slate-900">
          
          <div>
            {/* Top Navigation Pill Tabs */}
            <div className="flex rounded-2xl bg-slate-100 dark:bg-slate-950 p-1 border border-slate-200 dark:border-slate-800 mb-6 gap-1">
              <button
                type="button"
                onClick={() => { setActiveMode('signup_hau'); setErrorMsg(''); setSuccessMsg(''); }}
                className={`flex-1 py-2.5 px-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  activeMode === 'signup_hau' 
                    ? 'bg-emerald-600 text-white shadow-md' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>CCS HAU</span>
              </button>

              <button
                type="button"
                onClick={() => { setActiveMode('signup_external'); setErrorMsg(''); setSuccessMsg(''); }}
                className={`flex-1 py-2.5 px-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  activeMode === 'signup_external' 
                    ? 'bg-emerald-600 text-white shadow-md' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Other College</span>
              </button>

              <button
                type="button"
                onClick={() => { setActiveMode('login'); setErrorMsg(''); setSuccessMsg(''); }}
                className={`flex-1 py-2.5 px-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  activeMode === 'login' 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>Login</span>
              </button>
            </div>

            {/* Notifications */}
            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* ======================================================== */}
            {/* SIGN-UP FORM                                             */}
            {/* ======================================================== */}
            {(activeMode === 'signup_hau' || activeMode === 'signup_external') && (
              <form onSubmit={handleInstantSignUp} className="space-y-3.5">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  
                  {/* Full Name */}
                  <div className="space-y-1 sm:col-span-2">
                    <label className="font-semibold text-slate-700 dark:text-slate-300">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Raghav Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  {/* Gender */}
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-300">Gender *</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Date of Birth */}
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-300">Date of Birth *</label>
                    <input
                      type="date"
                      required
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Admission Number (HAU Only) */}
                  {activeMode === 'signup_hau' && (
                    <div className="space-y-1 sm:col-span-2">
                      <label className="font-semibold text-slate-700 dark:text-slate-300">HAU Admission No. *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 2022AE01BIV or 2022AE05BLII or 2022AE05BIV(R)"
                        value={admissionNo}
                        onChange={(e) => setAdmissionNo(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 font-mono uppercase focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  )}

                  {/* College Select (External Only) */}
                  {activeMode === 'signup_external' && (
                    <div className="space-y-1 sm:col-span-2">
                      <label className="font-semibold text-slate-700 dark:text-slate-300">College / Institute *</label>
                      <div className="relative">
                        <select
                          value={collegeName}
                          onChange={(e) => setCollegeName(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500 appearance-none pr-8"
                        >
                          {HARYANA_AND_INDIA_COLLEGES.map((c, i) => (
                            <option key={i} value={c}>{c}</option>
                          ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                      </div>

                      {collegeName === "Other Institute / Enter Manually" && (
                        <input
                          type="text"
                          required
                          placeholder="Enter your college name & state"
                          value={customCollege}
                          onChange={(e) => setCustomCollege(e.target.value)}
                          className="mt-2 w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100"
                        />
                      )}
                    </div>
                  )}

                  {/* Class Semester */}
                  <div className="space-y-1 sm:col-span-2">
                    <label className="font-semibold text-slate-700 dark:text-slate-300">Class Semester *</label>
                    <select
                      value={currentYearSem}
                      onChange={(e) => setCurrentYearSem(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
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

                  {/* Optional Email */}
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-300">Email (Optional)</label>
                    <input
                      type="email"
                      placeholder="Optional email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Optional Mobile */}
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-300">Mobile (Optional)</label>
                    <input
                      type="tel"
                      placeholder="Optional 10-digit mobile"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
                >
                  {isLoading ? <span>Registering...</span> : (
                    <>
                      <span>Complete Free Registration</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* ======================================================== */}
            {/* LOGIN FORM                                               */}
            {/* ======================================================== */}
            {activeMode === 'login' && (
              <form onSubmit={handleLoginSubmit} className="space-y-3.5 text-xs">
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="font-semibold text-slate-700 dark:text-slate-300">Identifier *</label>
                    <div className="flex items-center gap-2 text-[11px]">
                      <button
                        type="button"
                        onClick={handlePasteClipboard}
                        className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-semibold"
                      >
                        <Clipboard className="w-3 h-3" /> Paste
                      </button>
                      {loginIdentifier && (
                        <button
                          type="button"
                          onClick={() => setLoginIdentifier('')}
                          className="text-slate-400 hover:text-rose-500 flex items-center gap-0.5"
                        >
                          <Eraser className="w-3 h-3" /> Clear
                        </button>
                      )}
                    </div>
                  </div>
                  <input
                    type="text"
                    required
                    autoComplete="username"
                    placeholder="Enter Admission No, Name, Mobile, or Email"
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Password *</label>
                  <input
                    type="password"
                    required
                    autoComplete="current-password"
                    placeholder="Default is DOB (DD/MM/YYYY)"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="flex items-center justify-between text-xs py-1">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400 font-medium">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-0 cursor-pointer"
                    />
                    <span>Remember on this device</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
                >
                  {isLoading ? <span>Verifying...</span> : <span>Log In</span>}
                </button>
              </form>
            )}

          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/60 text-center text-[11px] text-slate-400 font-medium">
            Strict Access Enforcement • GATE AG Prep Portal
          </div>

        </div>

      </div>
    </div>
  );
}
