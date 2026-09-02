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
  Loader2,
  Award,
  BookOpen,
  Briefcase,
  ShieldCheck,
  Sparkles,
  X
} from 'lucide-react';
import { 
  registerStudent, 
  loginStudent, 
  registerFaculty,
  loginFaculty,
  getRememberedIdentifier, 
  validateHAUAdmissionNo,
  FACULTY_SALUTATIONS,
  AGRI_ENGG_DEPARTMENTS
} from '../services/authService';

export const CATEGORIZED_UNIVERSITIES = [
  {
    category: "🏛️ ICAR & Premier National Deemed Institutes",
    items: [
      "COAET CCS HAU Hisar (Campus Institute)",
      "IARI New Delhi (ICAR - Indian Agricultural Research Institute)",
      "NDRI Karnal (ICAR - National Dairy Research Institute)",
      "CIAE Bhopal (ICAR - Central Institute of Agricultural Engineering)",
      "CIPHET Ludhiana (ICAR - Central Institute of Post-Harvest Engg & Tech)",
      "IVRI Izatnagar (ICAR - Indian Veterinary Research Institute)",
      "CISH Lucknow / CPRI Shimla / IIHR Bangalore (ICAR Institutes)"
    ]
  },
  {
    category: "🎓 IITs, NITs & Premier Technology Institutes",
    items: [
      "IIT Kharagpur (Dept. of Agricultural & Food Engineering)",
      "IIT Roorkee (Dept. of WRD&M / Water Resources & Civil)",
      "IIT Guwahati (Dept. of Biosciences & Bioengineering)",
      "IIT Delhi (Centre for Rural Development & Tech)",
      "NIT Rourkela (Dept. of Food Process Engineering)",
      "NIFTEM Kundli / NIFTEM Thanjavur (Food Technology Institutes)"
    ]
  },
  {
    category: "🌾 Major State Agricultural Universities (SAUs)",
    items: [
      "PAU Ludhiana (Punjab Agricultural University - COAET)",
      "GBPUAT Pantnagar (G.B. Pant Univ. of Agriculture & Tech - COT)",
      "TNAU Coimbatore (AEC&RI Tamil Nadu Agricultural University)",
      "MPUAT Udaipur (CTAE Maharana Pratap Univ. of Agri & Tech)",
      "CAET Anand Agricultural University (AAU Gujarat)",
      "JAU Junagadh (Junagadh Agricultural University - CAET)",
      "NAU Navsari / SDAU Dantiwada (Gujarat Agricultural Universities)",
      "UAS Bangalore (GKVK University of Agricultural Sciences)",
      "UAS Dharwad (University of Agricultural Sciences Dharwad)",
      "UAS Raichur / UHS Bagalkot (Karnataka Agri & Horti Universities)",
      "Dr. PDKV Akola (Panjabrao Deshmukh Krishi Vidyapeeth)",
      "MPKV Rahuri (Mahatma Phule Krishi Vidyapeeth)",
      "Dr. BSKKV Dapoli (Dr. Balasaheb Sawant Konkan Krishi)",
      "VNMKV Parbhani (Vasantrao Naik Marathwada Krishi)",
      "OUAT Bhubaneswar (Orissa University of Agriculture & Tech)",
      "BCKV Mohanpur (Bidhan Chandra Krishi Viswavidyalaya)",
      "UBKV Cooch Behar (Uttar Banga Krishi Viswavidyalaya)",
      "IGKV Raipur (Indira Gandhi Krishi Vishwavidyalaya)",
      "JNKVV Jabalpur (Jawaharlal Nehru Krishi Vishwavidyalaya)",
      "RVSKVV Gwalior (Rajmata Vijayaraje Scindia Krishi)",
      "BAU Ranchi (Birsa Agricultural University)",
      "BAU Sabour (Bihar Agricultural University)",
      "Dr. RPCAU Pusa, Samastipur (Central Agricultural University)",
      "Central Agricultural University (Imphal / Sikkim / Pasighat)",
      "RLBCAU Jhansi (Rani Lakshmi Bai Central Agricultural Univ.)",
      "SKUAST Kashmir / SKUAST Jammu (Sher-e-Kashmir Univ. of Agri.)",
      "ANGRAU Guntur (Acharya N.G. Ranga Agricultural University)",
      "PJTSAU Hyderabad (Prof. Jayashankar Telangana State Agri Univ.)",
      "KAU Thrissur (Kerala Agricultural University - KCAET Tavanur)",
      "YSPUHF Solan (Dr. Y.S. Parmar Univ. of Horticulture & Forestry)",
      "CSK HPKV Palampur (Chaudhary Sarwan Kumar HP Krishi)",
      "SVPUAT Meerut (Sardar Vallabhbhai Patel University)",
      "CSAUAT Kanpur (Chandra Shekhar Azad Univ. of Agri & Tech)",
      "NDUAT Ayodhya (Acharya Narendra Deva Univ. of Agri & Tech)",
      "BUAT Banda (Banda University of Agriculture & Technology)",
      "SHUATS Prayagraj (Sam Higginbottom Univ. of Agri, Tech & Sciences)",
      "SKNAU Jobner / AU Jodhpur / AU Kota (Rajasthan Agri Universities)"
    ]
  },
  {
    category: "🏫 State Technical & Regional Universities",
    items: [
      "GJUS&T Hisar (Guru Jambheshwar Univ. of Science & Tech)",
      "DCRUST Murthal (Deenbandhu Chhotu Ram Univ. of Science & Tech)",
      "YMCA UST Faridabad (J.C. Bose Univ. of Science & Tech)",
      "Kurukshetra University (UIET / Campus)",
      "MDU Rohtak (UIET / Campus)"
    ]
  },
  {
    category: "🌐 Other / Manual Entry",
    items: [
      "Other Institute / Enter Manually"
    ]
  }
];

export const CATEGORIZED_FACULTY_DEPARTMENTS = [
  {
    group: "🚜 Core Agricultural Engineering Disciplines",
    items: [
      "Farm Machinery & Power Engineering (FMPE)",
      "Soil & Water Conservation Engineering (SWCE)",
      "Processing & Food Engineering (PFE / APFE)",
      "Renewable Energy Engineering (REE)",
      "Irrigation & Drainage Engineering (IDE)"
    ]
  },
  {
    group: "🌾 Specialized Food, Bio-Systems & Allied Engg",
    items: [
      "Dairy & Food Process Engineering",
      "Post-Harvest Engineering & Technology",
      "Hydrology & Water Resources Engineering",
      "Aquacultural & Environmental Engineering",
      "Agricultural Automation, Precision Farming & AI"
    ]
  },
  {
    group: "📐 Applied Sciences & Allied Disciplines",
    items: [
      "Basic Engineering & Applied Mathematics / Physics",
      "Agronomy, Soil Science & Plant Sciences",
      "Other / Allied Department"
    ]
  }
];

const HARYANA_AND_INDIA_COLLEGES = CATEGORIZED_UNIVERSITIES.flatMap(cat => cat.items);

export default function AuthModal({ 
  onLoginSuccess, 
  onClose, 
  onContinueAsGuest, 
  customPromptReason 
}) {
  // Top-level portal switcher: 'student' | 'faculty'
  const [portalRole, setPortalRole] = useState('student');

  // Sub-tabs: 'login' | 'signup'
  const [primaryTab, setPrimaryTab] = useState('login'); // 'login' | 'signup'
  const [activeMode, setActiveMode] = useState('signup_hau'); // 'signup_hau' | 'signup_external' | 'signup_visitor'

  // Student Form Fields State
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

  // Faculty Form Fields State
  const [facultyTitle, setFacultyTitle] = useState('Dr.');
  const [facultyFullName, setFacultyFullName] = useState('');
  const [facultyDepartment, setFacultyDepartment] = useState(AGRI_ENGG_DEPARTMENTS[0]);
  const [customDepartment, setCustomDepartment] = useState('');
  const [facultyInstitute, setFacultyInstitute] = useState('COAET CCS HAU Hisar (Campus Student)');
  const [customFacultyInstitute, setCustomFacultyInstitute] = useState('');
  const [facultyMobile, setFacultyMobile] = useState('');
  const [facultyEmail, setFacultyEmail] = useState('');
  const [facultyPassword, setFacultyPassword] = useState('');
  const [showFacultyPassword, setShowFacultyPassword] = useState(false);

  // Common Login State
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

  const switchPortal = (role) => {
    setPortalRole(role);
    setErrorMsg('');
    setSuccessMsg('');
  };

  // Student Sign Up Handler
  const handleStudentSignUp = async (e) => {
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

  // Faculty Sign Up Handler
  const handleFacultySignUp = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!facultyFullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    if (!facultyEmail.trim()) {
      setErrorMsg('Please enter your official/academic email address.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(facultyEmail.trim())) {
      setErrorMsg('Please enter a valid email address (e.g. prof.name@university.ac.in).');
      return;
    }

    if (!facultyMobile.trim()) {
      setErrorMsg('Please enter your 10-digit mobile number.');
      return;
    }
    const cleanMobileNum = facultyMobile.replace(/\D/g, '');
    if (cleanMobileNum.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    const effectiveDept = facultyDepartment === 'Other / Allied Department'
      ? (customDepartment.trim() || 'Agricultural Engineering')
      : facultyDepartment;

    const effectiveInst = facultyInstitute === "Other Institute / Enter Manually"
      ? (customFacultyInstitute.trim() || 'Agricultural University')
      : (facultyInstitute === "COAET CCS HAU Hisar (Campus Student)" ? "COAET CCS HAU Hisar" : facultyInstitute);

    if (facultyPassword && facultyPassword.trim().length > 0 && facultyPassword.trim().length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await registerFaculty({
        titlePrefix: facultyTitle,
        fullName: facultyFullName,
        department: effectiveDept,
        institute: effectiveInst,
        mobileNumber: facultyMobile,
        email: facultyEmail,
        password: facultyPassword
      });

      if (res.success) {
        setSuccessMsg(`Welcome, ${res.student.display_name || res.student.full_name}! Faculty access granted.`);
        setTimeout(() => {
          onLoginSuccess(res.student);
        }, 500);
      } else if (res.isDuplicate) {
        setErrorMsg(res.message);
        setTimeout(() => {
          setLoginIdentifier(res.prefillIdentifier || facultyEmail || facultyMobile);
          switchTab('login');
          setErrorMsg('An existing faculty account was found. Please sign in.');
        }, 1200);
      } else {
        setErrorMsg(res.message || 'Faculty registration failed. Please try again.');
      }
    } catch (err) {
      setErrorMsg('An error occurred during faculty registration.');
    } finally {
      setIsLoading(false);
    }
  };

  // Common Login Handler (Works for both Student and Faculty)
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!loginIdentifier.trim()) {
      setErrorMsg('Please enter your Email, Mobile, Username, or Admission No.');
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
        const isFac = res.student.role === 'faculty' || res.student.is_faculty;
        setSuccessMsg(isFac 
          ? `Welcome ${res.student.display_name || res.student.full_name}! Loading Faculty HQ...` 
          : 'Welcome back! Loading your dashboard...'
        );
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md overflow-y-auto">
      <div className={`relative w-full ${primaryTab === 'signup' ? 'max-w-xl' : 'max-w-md'} bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden transition-all my-auto`}>
        
        {/* Close / Dismiss Button if Guest Mode is supported */}
        {(onClose || onContinueAsGuest) && (
          <button
            type="button"
            onClick={onClose || onContinueAsGuest}
            className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer z-10"
            title="Close / Continue as Guest"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Top Minimal Header & Logo */}
        <div className={`pt-7 pb-4 px-6 text-center border-b border-slate-100 dark:border-slate-800/80 transition-colors ${
          portalRole === 'faculty' 
            ? 'bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent dark:from-indigo-950/30' 
            : 'bg-gradient-to-b from-emerald-500/10 via-teal-500/5 to-transparent dark:from-emerald-950/30'
        }`}>
          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3 ring-1 transition-all ${
            portalRole === 'faculty'
              ? 'bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 ring-indigo-500/20'
              : 'bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 ring-emerald-500/20'
          }`}>
            {portalRole === 'faculty' ? (
              <Building2 className="w-6 h-6" />
            ) : (
              <GraduationCap className="w-6 h-6" />
            )}
          </div>

          <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            GATE <span className={portalRole === 'faculty' ? 'text-indigo-600 dark:text-indigo-400' : 'text-emerald-600 dark:text-emerald-400'}>
              {portalRole === 'faculty' ? 'FACULTY PORTAL' : 'AG PREP'}
            </span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {portalRole === 'faculty'
              ? 'Academic Contributor & Professor Studio'
              : 'Agricultural Engineering CBT Preparation Platform'
            }
          </p>

          {/* Primary Portal Switcher: Student vs Faculty */}
          <div className="flex items-center justify-center mt-4">
            <div className="inline-flex p-1 bg-slate-200/80 dark:bg-slate-800 rounded-xl border border-slate-300/60 dark:border-slate-700/60 shadow-inner">
              <button
                type="button"
                onClick={() => switchPortal('student')}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  portalRole === 'student'
                    ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Student Portal</span>
              </button>

              <button
                type="button"
                onClick={() => switchPortal('faculty')}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  portalRole === 'faculty'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>Faculty / Professor</span>
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          {/* Contextual Action Gate Notice (if triggered by a gated feature) */}
          {customPromptReason && (
            <div className="mb-5 p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-transparent border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs flex items-start gap-3 animate-fadeIn">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs">Unlock Full Preparation Engine</h4>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">{customPromptReason}</p>
              </div>
            </div>
          )}

          {/* Sign In vs Create Account Tabs */}
          <div className="grid grid-cols-2 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl mb-6">
            <button
              type="button"
              onClick={() => switchTab('login')}
              className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                primaryTab === 'login'
                  ? (portalRole === 'faculty'
                      ? 'bg-indigo-600 text-white shadow-sm font-bold'
                      : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                    )
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {portalRole === 'faculty' ? 'Faculty Sign In' : 'Sign In'}
            </button>
            <button
              type="button"
              onClick={() => switchTab('signup')}
              className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                primaryTab === 'signup'
                  ? (portalRole === 'faculty'
                      ? 'bg-indigo-600 text-white shadow-sm font-bold'
                      : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                    )
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {portalRole === 'faculty' ? 'Register as Faculty' : 'Create Account'}
            </button>
          </div>

          {/* Feedback Alerts */}
          {errorMsg && (
            <div className="mb-5 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/50 text-rose-700 dark:text-rose-300 text-xs flex items-start gap-2.5 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-5 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-300 text-xs flex items-start gap-2.5 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* ======================================================== */}
          {/* LOGIN FORM (COMMON FOR BOTH STUDENT AND FACULTY)         */}
          {/* ======================================================== */}
          {primaryTab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  {portalRole === 'faculty' ? 'Faculty Email, Mobile, or Username' : 'Account Identifier'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    {portalRole === 'faculty' ? <Mail className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>
                  <input
                    type="text"
                    required
                    autoComplete="username"
                    placeholder={portalRole === 'faculty' ? 'e.g. prof.name@university.edu or 9876543210' : 'Username, Admission No, Email, or Mobile'}
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Password
                  </label>
                  {portalRole === 'student' ? (
                    <span className="text-[11px] text-slate-400">
                      (Default: DOB DD/MM/YYYY)
                    </span>
                  ) : (
                    <span className="text-[11px] text-indigo-500 dark:text-indigo-400 font-mono text-[10px]">
                      Default: Faculty@Last4Digits
                    </span>
                  )}
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showLoginPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-9 pr-10 py-2.5 text-xs bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
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
                    className="w-4 h-4 rounded border-slate-300 dark:border-slate-700 text-indigo-600 focus:ring-0 cursor-pointer"
                  />
                  <span>Remember me on this device</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-2.5 px-4 font-semibold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-4 cursor-pointer text-white ${
                  portalRole === 'faculty'
                    ? 'bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 shadow-indigo-500/20'
                    : 'bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 shadow-emerald-500/20'
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>{portalRole === 'faculty' ? 'Sign In to Faculty Portal' : 'Sign In'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center pt-3 text-xs text-slate-500 dark:text-slate-400">
                {portalRole === 'faculty' ? 'New faculty member? ' : "Don't have an account yet? "}
                <button
                  type="button"
                  onClick={() => switchTab('signup')}
                  className={`font-semibold hover:underline cursor-pointer ${
                    portalRole === 'faculty' ? 'text-indigo-600 dark:text-indigo-400' : 'text-emerald-600 dark:text-emerald-400'
                  }`}
                >
                  {portalRole === 'faculty' ? 'Register Faculty Profile' : 'Create one now'}
                </button>
              </div>
            </form>
          )}

          {/* ======================================================== */}
          {/* FACULTY REGISTRATION FORM                                */}
          {/* ======================================================== */}
          {primaryTab === 'signup' && portalRole === 'faculty' && (
            <form onSubmit={handleFacultySignUp} className="space-y-4">
              
              {/* Faculty Welcome Notice Banner */}
              <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/50 rounded-xl text-indigo-900 dark:text-indigo-200 text-xs flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <span>
                  <strong>Academic Contributor Registration</strong>: Verified Faculty receive official contributor tags and professor tools.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs">
                
                {/* Salutation / Title Prefix */}
                <div className="sm:col-span-4">
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Title / Prefix *
                  </label>
                  <select
                    value={facultyTitle}
                    onChange={(e) => setFacultyTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 font-semibold focus:outline-none focus:border-indigo-500"
                  >
                    {FACULTY_SALUTATIONS.map((sal) => (
                      <option key={sal} value={sal}>{sal}</option>
                    ))}
                  </select>
                </div>

                {/* Full Name */}
                <div className="sm:col-span-8">
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajesh Kumar"
                    value={facultyFullName}
                    onChange={(e) => setFacultyFullName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                {/* Department Selection */}
                <div className="sm:col-span-12 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block font-semibold text-slate-700 dark:text-slate-300">
                      Academic Department / Discipline *
                    </label>
                    <span className="text-[10px] text-slate-400 font-medium">Categorized by Specialization</span>
                  </div>
                  <select
                    value={facultyDepartment}
                    onChange={(e) => setFacultyDepartment(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 cursor-pointer text-xs"
                  >
                    {CATEGORIZED_FACULTY_DEPARTMENTS.map((deptGroup, gIdx) => (
                      <optgroup key={gIdx} label={deptGroup.group} className="font-bold text-slate-900 dark:text-slate-200 bg-white dark:bg-slate-900">
                        {deptGroup.items.map((dept, i) => (
                          <option key={i} value={dept} className="font-normal text-slate-800 dark:text-slate-300 py-1">
                            {dept}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  {facultyDepartment === 'Other / Allied Department' && (
                    <input
                      type="text"
                      required
                      placeholder="Specify your Department name (e.g. Bio-Energy & Agricultural Systems)"
                      value={customDepartment}
                      onChange={(e) => setCustomDepartment(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 text-xs mt-1.5 animate-fadeIn"
                    />
                  )}
                </div>

                {/* Institute / University Selection */}
                <div className="sm:col-span-12 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block font-semibold text-slate-700 dark:text-slate-300">
                      Institute / Agricultural University *
                    </label>
                    <span className="text-[10px] text-slate-400 font-medium">All-India ICAR, IIT & SAU Network</span>
                  </div>
                  <select
                    value={facultyInstitute}
                    onChange={(e) => setFacultyInstitute(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 cursor-pointer text-xs"
                  >
                    {CATEGORIZED_UNIVERSITIES.map((catGroup, cIdx) => (
                      <optgroup key={cIdx} label={catGroup.category} className="font-bold text-slate-900 dark:text-slate-200 bg-white dark:bg-slate-900">
                        {catGroup.items.map((inst, i) => (
                          <option key={i} value={inst} className="font-normal text-slate-800 dark:text-slate-300 py-1">
                            {inst}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  {facultyInstitute === "Other Institute / Enter Manually" && (
                    <input
                      type="text"
                      required
                      placeholder="Enter full name of your University / College / Institute"
                      value={customFacultyInstitute}
                      onChange={(e) => setCustomFacultyInstitute(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 text-xs mt-1.5 animate-fadeIn"
                    />
                  )}
                </div>

                {/* Email Address */}
                <div className="sm:col-span-6">
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    E-mail Address *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                    <input
                      type="email"
                      required
                      placeholder="e.g. prof.name@university.edu"
                      value={facultyEmail}
                      onChange={(e) => setFacultyEmail(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                {/* Mobile Number */}
                <div className="sm:col-span-6">
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
                      value={facultyMobile}
                      onChange={(e) => setFacultyMobile(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="sm:col-span-12">
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-300">
                      Faculty Account Password (Optional)
                    </label>
                    <span className="text-[10px] text-slate-400">
                      Default: Faculty@Last4Digits
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type={showFacultyPassword ? "text" : "password"}
                      placeholder="Enter minimum 6 character password"
                      value={facultyPassword}
                      onChange={(e) => setFacultyPassword(e.target.value)}
                      className="w-full pl-3 pr-10 py-2 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowFacultyPassword(!showFacultyPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                      title={showFacultyPassword ? "Hide password" : "Show password"}
                    >
                      {showFacultyPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-md shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Registering Faculty Profile...</span>
                  </>
                ) : (
                  <>
                    <Award className="w-4 h-4" />
                    <span>Register as Verified Faculty</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center pt-2 text-xs text-slate-500 dark:text-slate-400">
                Already registered as Faculty?{' '}
                <button
                  type="button"
                  onClick={() => switchTab('login')}
                  className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline cursor-pointer"
                >
                  Sign in here
                </button>
              </div>
            </form>
          )}

          {/* ======================================================== */}
          {/* STUDENT REGISTRATION FORM                                */}
          {/* ======================================================== */}
          {primaryTab === 'signup' && portalRole === 'student' && (
            <form onSubmit={handleStudentSignUp} className="space-y-4">
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
                  <div className="sm:col-span-2 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="block font-semibold text-slate-700 dark:text-slate-300">
                        College / Agricultural University *
                      </label>
                      <span className="text-[10px] text-slate-400 font-medium">All-India ICAR, IIT & SAU Network</span>
                    </div>
                    <select
                      value={collegeName}
                      onChange={(e) => setCollegeName(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 cursor-pointer text-xs"
                    >
                      {CATEGORIZED_UNIVERSITIES.map((catGroup, cIdx) => (
                        <optgroup key={cIdx} label={catGroup.category} className="font-bold text-slate-900 dark:text-slate-200 bg-white dark:bg-slate-900">
                          {catGroup.items.map((c, i) => (
                            <option key={i} value={c} className="font-normal text-slate-800 dark:text-slate-300 py-1">
                              {c}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                    {collegeName === "Other Institute / Enter Manually" && (
                      <input
                        type="text"
                        required
                        placeholder="Enter full name of your college / university"
                        value={customCollege}
                        onChange={(e) => setCustomCollege(e.target.value)}
                        className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 text-xs mt-1.5 animate-fadeIn"
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

          {/* Explore Portal as Guest / Visitor */}
          {onContinueAsGuest && (
            <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 text-center">
              <button
                type="button"
                onClick={onContinueAsGuest}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer border border-slate-200/80 dark:border-slate-700/60 group shadow-xs"
              >
                <Sparkles className="w-4 h-4 text-emerald-500 group-hover:scale-110 transition" />
                <span>Continue as Guest / Explore Preview</span>
              </button>
              <p className="text-[10.5px] text-slate-400 dark:text-slate-500 mt-2 font-medium">
                Browse syllabus, formulas, simulators & question papers freely
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
