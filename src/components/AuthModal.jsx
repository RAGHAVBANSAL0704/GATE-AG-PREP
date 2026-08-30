import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  GraduationCap, 
  Building2, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  User,
  Eye,
  EyeOff,
  Mail,
  Phone,
  Calendar,
  Loader2
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
  const [primaryTab, setPrimaryTab] = useState('login'); // 'login' | 'signup'
  const [activeMode, setActiveMode] = useState('signup_hau'); // 'signup_hau' | 'signup_external' | 'signup_visitor'

  // Form Fields State
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('Male');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [currentYearSem, setCurrentYearSem] = useState('3rd Year / 6th Sem');
  const [admissionNo, setAdmissionNo] = useState('');
  const [collegeName, setCollegeName] = useState(HARYANA_AND_INDIA_COLLEGES[1]);
  const [customCollege, setCustomCollege] = useState('');
  const [customPassword, setCustomPassword] = useState('');
  const [showCustomPassword, setShowCustomPassword] = useState(false);

  // Login State
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // UI Feedback State
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Load remembered login identifier on mount
  useEffect(() => {
    const remembered = getRememberedIdentifier();
    if (remembered) setLoginIdentifier(remembered);
  }, []);

  const switchTab = (tab) => {
    setPrimaryTab(tab);
    setErrorMsg('');
    setSuccessMsg('');
  };

  // Sign Up Handler
  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    const cleanUsername = username.trim().replace(/^@/, '').toLowerCase().replace(/[^a-z0-9_]/g, '');
    if (!cleanUsername) {
      setErrorMsg('Please enter a valid unique username (letters, numbers, or underscores).');
      return;
    }
    if (cleanUsername.length < 3) {
      setErrorMsg('Username must be at least 3 characters long.');
      return;
    }

    if (!dob) {
      setErrorMsg('Please select your Date of Birth.');
      return;
    }
    if (!email.trim()) {
      setErrorMsg('Please enter your Email Address.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMsg('Please enter a valid Email Address (e.g. student@gmail.com).');
      return;
    }
    if (!mobileNumber.trim()) {
      setErrorMsg('Please enter your 10-digit Mobile Number.');
      return;
    }
    const cleanMobileNum = mobileNumber.replace(/\D/g, '');
    if (cleanMobileNum.length < 10) {
      setErrorMsg('Please enter a valid 10-digit Mobile Number.');
      return;
    }

    if (activeMode === 'signup_hau') {
      const validation = validateHAUAdmissionNo(admissionNo);
      if (!validation.isValid) {
        setErrorMsg(`Admission No Error: ${validation.message}`);
        return;
      }
    }

    const selectedCollege = activeMode === 'signup_visitor' 
      ? 'Guest Visitor / GATE AG Aspirant'
      : (collegeName === "Other Institute / Enter Manually" 
          ? (customCollege.trim() || "External Agricultural Institute")
          : collegeName);

    setIsLoading(true);

    try {
      const studentType = activeMode === 'signup_hau' ? 'hau' : (activeMode === 'signup_visitor' ? 'visitor' : 'external');

      const res = await registerStudent({
        studentType,
        fullName,
        username: cleanUsername,
        gender,
        mobileNumber,
        email,
        dob,
        currentYearSem: activeMode === 'signup_visitor' ? 'Guest Visitor' : currentYearSem,
        admissionNo: activeMode === 'signup_hau' ? admissionNo.trim().toUpperCase() : '',
        collegeName: selectedCollege,
        customPassword
      });

      if (res.success) {
        setSuccessMsg('Account created successfully! Redirecting...');
        setTimeout(() => {
          onLoginSuccess(res.student);
        }, 500);
      } else if (res.isDuplicate) {
        setErrorMsg(res.message);
        setTimeout(() => {
          setLoginIdentifier(res.prefillIdentifier || admissionNo || fullName);
          switchTab('login');
          setErrorMsg('An existing account was found. Please log in.');
        }, 1200);
      } else {
        setErrorMsg(res.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setErrorMsg('An error occurred during registration.');
    } finally {
      setIsLoading(false);
    }
  };

  // Login Handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!loginIdentifier.trim()) {
      setErrorMsg('Please enter your Username, Admission No, Mobile, or Email.');
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
        setSuccessMsg('Welcome back! Loading your dashboard...');
        setTimeout(() => {
          onLoginSuccess(res.student);
        }, 400);
      } else {
        setErrorMsg(res.message || 'Invalid credentials. Please check your details.');
      }
    } catch (err) {
      setErrorMsg('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
      <div className={`relative w-full ${primaryTab === 'signup' ? 'max-w-xl' : 'max-w-md'} bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden transition-all my-auto`}>
        
        {/* Top Minimal Header & Logo */}
        <div className="pt-8 pb-4 px-6 text-center border-b border-slate-100 dark:border-slate-800/80 bg-gradient-to-b from-slate-50/80 to-transparent dark:from-slate-800/30">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 mb-3 ring-1 ring-emerald-500/20">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            GATE <span className="text-emerald-600 dark:text-emerald-400">AG PREP</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Agricultural Engineering CBT Preparation Platform
          </p>
        </div>

        <div className="p-6 sm:p-8">
          {/* Segmented Control Tabs */}
          <div className="grid grid-cols-2 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl mb-6">
            <button
              type="button"
              onClick={() => switchTab('login')}
              className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                primaryTab === 'login'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => switchTab('signup')}
              className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                primaryTab === 'signup'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Feedback Alerts */}
          {errorMsg && (
            <div className="mb-5 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/50 text-rose-700 dark:text-rose-300 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-5 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-300 text-xs flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* ======================================================== */}
          {/* LOGIN FORM                                               */}
          {/* ======================================================== */}
          {primaryTab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Account Identifier
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    autoComplete="username"
                    placeholder="Username, Admission No, Email, or Mobile"
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Password
                  </label>
                  <span className="text-[11px] text-slate-400">
                    (Default: DOB DD/MM/YYYY)
                  </span>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showLoginPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    placeholder="Enter your password or DOB"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-9 pr-10 py-2.5 text-xs bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                    title={showLoginPassword ? "Hide password" : "Show password"}
                  >
                    {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1 pb-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 dark:border-slate-700 text-emerald-600 focus:ring-0 cursor-pointer"
                  />
                  <span>Remember me on this device</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-4 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center pt-3 text-xs text-slate-500 dark:text-slate-400">
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => switchTab('signup')}
                  className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline cursor-pointer"
                >
                  Create one now
                </button>
              </div>
            </form>
          )}

          {/* ======================================================== */}
          {/* SIGN-UP FORM                                             */}
          {/* ======================================================== */}
          {primaryTab === 'signup' && (
            <form onSubmit={handleSignUp} className="space-y-4">
              {/* Category Mode Pills */}
              <div className="flex rounded-xl bg-slate-100 dark:bg-slate-950/60 p-1 border border-slate-200 dark:border-slate-800 gap-1">
                <button
                  type="button"
                  onClick={() => { setActiveMode('signup_hau'); setErrorMsg(''); }}
                  className={`flex-1 py-1.5 px-2 text-[11px] font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    activeMode === 'signup_hau'
                      ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 font-bold shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>CCS HAU Student</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setActiveMode('signup_external'); setErrorMsg(''); }}
                  className={`flex-1 py-1.5 px-2 text-[11px] font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    activeMode === 'signup_external'
                      ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 font-bold shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Other College</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setActiveMode('signup_visitor'); setErrorMsg(''); }}
                  className={`flex-1 py-1.5 px-2 text-[11px] font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    activeMode === 'signup_visitor'
                      ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 font-bold shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Visitor Aspirant</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* Full Name */}
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={activeMode === 'signup_hau' ? 'e.g. Ananya Sharma' : 'e.g. Gayatri Aggarwal'}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Unique Username */}
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Username *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-mono font-medium">@</span>
                    <input
                      type="text"
                      required
                      placeholder={activeMode === 'signup_hau' ? 'ananya_sharma' : 'gayatri_aggarwal'}
                      value={username}
                      onChange={(e) => {
                        const val = e.target.value.replace(/^@/, '').toLowerCase().replace(/[^a-z0-9_]/g, '');
                        setUsername(val);
                      }}
                      className="w-full pl-7 pr-3 py-2 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 font-mono placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                    <input
                      type="email"
                      required
                      placeholder="student@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Mobile Number *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Phone className="w-3.5 h-3.5" />
                    </div>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile number"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Date of Birth (DOB) *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Calendar className="w-3.5 h-3.5" />
                    </div>
                    <input
                      type="date"
                      required
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Gender */}
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Gender *
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* HAU Admission No */}
                {activeMode === 'signup_hau' && (
                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Admission No. (COAET HAU) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 2022AE01BIV or 2024AE32BIV"
                      value={admissionNo}
                      onChange={(e) => setAdmissionNo(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 uppercase font-mono placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                )}

                {/* Other College Selector */}
                {activeMode === 'signup_external' && (
                  <div className="sm:col-span-2 space-y-2">
                    <label className="block font-semibold text-slate-700 dark:text-slate-300">
                      College / University *
                    </label>
                    <select
                      value={collegeName}
                      onChange={(e) => setCollegeName(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
                    >
                      {HARYANA_AND_INDIA_COLLEGES.map((c, i) => (
                        <option key={i} value={c}>{c}</option>
                      ))}
                    </select>
                    {collegeName === "Other Institute / Enter Manually" && (
                      <input
                        type="text"
                        required
                        placeholder="Enter your college / university name"
                        value={customCollege}
                        onChange={(e) => setCustomCollege(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
                      />
                    )}
                  </div>
                )}

                {/* Year / Semester (Only for HAU & External) */}
                {activeMode !== 'signup_visitor' && (
                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Current Year / Semester
                    </label>
                    <select
                      value={currentYearSem}
                      onChange={(e) => setCurrentYearSem(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
                    >
                      <option value="1st Year / 1st-2nd Sem">1st Year / 1st-2nd Sem</option>
                      <option value="2nd Year / 3rd-4th Sem">2nd Year / 3rd-4th Sem</option>
                      <option value="3rd Year / 5th-6th Sem">3rd Year / 5th-6th Sem</option>
                      <option value="4th Year / 7th-8th Sem">4th Year / 7th-8th Sem</option>
                      <option value="Graduated / Alum">Graduated / Alum</option>
                    </select>
                  </div>
                )}

                {/* Custom Password */}
                <div className="sm:col-span-2">
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-300">
                      Password (Optional)
                    </label>
                    <span className="text-[10px] text-slate-400">
                      Default is your DOB (DD/MM/YYYY)
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type={showCustomPassword ? "text" : "password"}
                      placeholder="Leave blank to use Date of Birth"
                      value={customPassword}
                      onChange={(e) => setCustomPassword(e.target.value)}
                      className="w-full pl-3 pr-10 py-2 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCustomPassword(!showCustomPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                      title={showCustomPassword ? "Hide password" : "Show password"}
                    >
                      {showCustomPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Creating account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Free Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center pt-2 text-xs text-slate-500 dark:text-slate-400">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => switchTab('login')}
                  className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline cursor-pointer"
                >
                  Sign in
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

