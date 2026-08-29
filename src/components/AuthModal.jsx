import React, { useState, useEffect, useRef } from 'react';
import { 
  UserCheck, 
  Lock, 
  GraduationCap, 
  Building2, 
  KeyRound, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  User,
  Clipboard,
  Eraser,
  Eye,
  EyeOff,
  Sparkles,
  Zap,
  Cpu,
  Tractor,
  Gauge,
  Flame,
  Award
} from 'lucide-react';
import { 
  registerStudent, 
  loginStudent, 
  getRememberedIdentifier, 
  validateHAUAdmissionNo
} from '../services/authService';
import { playCyberSound } from '../utils/cyberBreakSound';

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
  const [primaryTab, setPrimaryTab] = useState('login'); // 'login' or 'signup'
  const [activeMode, setActiveMode] = useState('signup_hau'); // 'signup_hau', 'signup_external', 'signup_visitor'
  
  // Interactive Tractor & Engine States
  const [isDisintegrated, setIsDisintegrated] = useState(false);
  const [turboBoost, setTurboBoost] = useState(false);
  const [rpm, setRpm] = useState(1200); // 1000 to 9000 RPM
  const [isPlowing, setIsPlowing] = useState(false);

  // Tillage Drag Swipe Auth Canvas State
  const canvasRef = useRef(null);
  const [isDraggingSoil, setIsDraggingSoil] = useState(false);
  const [tillageProgress, setTillageProgress] = useState(0); // 0 to 100%
  const [unEarthedToken, setUnEarthedToken] = useState(false);

  // Form State
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

  // UI State
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Auto-decay RPM back to idle 1200 RPM
  useEffect(() => {
    const timer = setInterval(() => {
      setRpm(prev => (prev > 1200 ? Math.max(1200, prev - 350) : 1200));
    }, 150);
    return () => clearInterval(timer);
  }, []);

  // Rev engine up on typing in input fields
  const handleTypingRev = () => {
    setRpm(prev => {
      const nextRpm = Math.min(9000, prev + 1200);
      playCyberSound('rpmChug');
      return nextRpm;
    });
  };

  useEffect(() => {
    const remembered = getRememberedIdentifier();
    if (remembered) setLoginIdentifier(remembered);
  }, []);

  // Initialize Interactive Canvas Soil Tread Tracks
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Soil grid dots
    ctx.fillStyle = '#10b98122';
    for (let x = 10; x < canvas.width; x += 20) {
      for (let y = 5; y < canvas.height; y += 10) {
        ctx.fillRect(x, y, 2, 2);
      }
    }
  }, []);

  // Handle Tillage Soil Dragging
  const handleSoilMouseMove = (e) => {
    if (!isDraggingSoil) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;

    const progress = Math.min(100, Math.max(0, Math.round((x / canvas.width) * 100)));
    setTillageProgress(progress);

    // Draw Soil Tread Tracks
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#10b981';
    ctx.fillRect(x - 5, 10, 10, 20);

    playCyberSound('gearShift');

    if (progress >= 85 && !unEarthedToken) {
      setUnEarthedToken(true);
      playCyberSound('powerup');
      const remembered = getRememberedIdentifier();
      if (remembered) {
        setLoginIdentifier(remembered);
        setSuccessMsg('🌾 Soil Tilled! Auto-filled remembered credentials!');
      }
    }
  };

  // Trigger tractor disintegration & re-integration when tab changes
  const switchPrimaryTab = (newTab) => {
    if (newTab === primaryTab) return;
    
    playCyberSound('disintegrate');
    setIsDisintegrated(true);

    setTimeout(() => {
      setPrimaryTab(newTab);
      playCyberSound('integrate');
      setIsDisintegrated(false);
    }, 300);
  };

  // Interactive Tractor Click Handler
  const handleTractorClick = () => {
    playCyberSound('tractorRev');
    setTurboBoost(true);
    setRpm(9000);
    setTimeout(() => setTurboBoost(false), 800);

    switchPrimaryTab(primaryTab === 'login' ? 'signup' : 'login');
  };

  const handleInstantSignUp = async (e) => {
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

    // Trigger Exam Plow Animation
    setIsPlowing(true);
    setRpm(9000);
    playCyberSound('fanfare8bit');

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
        setSuccessMsg('🎉 Account created! Welcome.');
        setTimeout(() => {
          onLoginSuccess(res.student);
        }, 600);
      } else if (res.isDuplicate) {
        setErrorMsg(res.message);
        setTimeout(() => {
          setLoginIdentifier(res.prefillIdentifier || admissionNo || fullName);
          switchPrimaryTab('login');
          setErrorMsg('Switched to Login screen.');
        }, 1200);
      } else {
        setErrorMsg(res.message || 'Registration failed.');
      }
    } catch (err) {
      setErrorMsg('An error occurred during registration.');
    } finally {
      setIsLoading(false);
      setTimeout(() => setIsPlowing(false), 1000);
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

    // Trigger Exam Plow Animation
    setIsPlowing(true);
    setRpm(9000);
    playCyberSound('fanfare8bit');

    try {
      const res = await loginStudent(loginIdentifier, loginPassword, rememberMe);
      if (res.success) {
        setSuccessMsg('Welcome back!');
        setTimeout(() => {
          onLoginSuccess(res.student);
        }, 600);
      } else {
        setErrorMsg(res.message);
      }
    } catch (err) {
      setErrorMsg('Login failed.');
    } finally {
      setIsLoading(false);
      setTimeout(() => setIsPlowing(false), 1000);
    }
  };

  const handlePasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setLoginIdentifier(text.trim());
        handleTypingRev();
      }
    } catch (e) {}
  };

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto ${isPlowing ? 'animate-bounce' : ''}`}>
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-auto grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
        
        {/* ======================================================== */}
        {/* LEFT PANEL: INTERACTIVE TRACTOR, RPM TACHOMETER, TILLAGE  */}
        {/* ======================================================== */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 via-blue-950 to-emerald-950 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden text-white border-b lg:border-b-0 lg:border-r border-slate-800 select-none">
          
          {/* Cyber Grid Pattern */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]" />

          {/* Top Branding & RPM Tachometer Gauge */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-emerald-400 p-0.5 shadow-lg">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-emerald-400 font-black text-xs">
                  AG
                </div>
              </div>
              <div>
                <h1 className="font-extrabold text-base tracking-tight text-white flex items-center gap-1">
                  GATE <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">AG PREP</span>
                </h1>
                <p className="text-[9px] text-blue-300 font-mono tracking-wide">Agricultural Engineering</p>
              </div>
            </div>

            {/* Glowing 0-9000 RPM Digital Tachometer Gauge */}
            <div className="flex items-center gap-1.5 bg-slate-950/80 px-2.5 py-1 rounded-xl border border-emerald-500/40 shadow-inner">
              <Gauge className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
              <div className="text-right font-mono">
                <div className="text-[10px] text-emerald-400 font-bold tracking-wider">{rpm} RPM</div>
                <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 via-yellow-400 to-rose-500 transition-all duration-200"
                    style={{ width: `${(rpm / 9000) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* INTERACTIVE VECTOR CYBER-TRACTOR */}
          <div className="relative z-10 my-auto py-4 flex flex-col items-center justify-center text-center">
            
            <div 
              onClick={handleTractorClick}
              className={`relative cursor-pointer group transition-all duration-500 transform ${
                isDisintegrated 
                  ? 'scale-50 opacity-0 blur-md translate-y-10 rotate-12' 
                  : 'scale-100 opacity-100 blur-0 translate-y-0 rotate-0'
              } ${primaryTab === 'signup' ? 'translate-x-3 sm:translate-x-6' : '-translate-x-3 sm:-translate-x-6'} ${turboBoost || isPlowing ? 'animate-bounce' : ''}`}
              title="Click Cyber Tractor to Rev Engine & Switch Mode!"
            >
              <div className={`absolute -inset-4 rounded-full bg-gradient-to-r ${primaryTab === 'login' ? 'from-blue-500/30 to-indigo-500/30' : 'from-emerald-500/30 to-teal-500/30'} blur-xl group-hover:opacity-100 transition-opacity animate-pulse`} />

              {/* Ultra-Clean Efficient Agricultural Tractor Graphic */}
              <div className="relative w-52 h-36 flex items-center justify-center">
                <svg viewBox="0 0 200 130" className="w-full h-full drop-shadow-[0_0_15px_rgba(22,163,74,0.5)]">
                  {/* Ground Shadow */}
                  <ellipse cx="100" cy="120" rx="80" ry="4" fill="#000000" opacity="0.5" />

                  {/* Rear Fender */}
                  <path d="M 20 72 A 38 38 0 0 1 95 48" fill="none" stroke="#15803d" strokeWidth="4" strokeLinecap="round" />

                  {/* Driver Cabin & Window */}
                  <rect x="42" y="32" width="60" height="38" rx="2" fill="#0f172a" stroke="#16a34a" strokeWidth="2" />
                  <rect x="48" y="38" width="50" height="24" rx="2" fill="#38bdf8" opacity="0.35" />
                  
                  {/* Roof Canopy & Visor */}
                  <rect x="36" y="24" width="72" height="10" rx="3" fill="#15803d" stroke="#facc15" strokeWidth="1.5" />

                  {/* Engine Hood & Grille */}
                  <path d="M 102 44 L 165 48 L 165 70 L 102 70 Z" fill="url(#efficientTractorGrad)" stroke="#facc15" strokeWidth="1.5" />
                  <line x1="102" y1="58" x2="165" y2="58" stroke="#facc15" strokeWidth="1.5" />

                  {/* Front Headlight */}
                  <circle cx="165" cy="54" r="4" fill="#facc15" stroke="#ffffff" strokeWidth="1" className="animate-pulse" />

                  {/* Vertical Exhaust Stack */}
                  <rect x="138" y="16" width="4" height="32" fill="#334155" />
                  <ellipse cx="140" cy="14" rx="3.5" ry="1.8" fill="#facc15" className="animate-bounce" />

                  {/* Front Steering Wheel (r=18, Center: 152, 100 => Bottom: 118) */}
                  <g className="animate-[spin_2.5s_linear_infinite]" style={{ transformOrigin: '152px 100px' }}>
                    <circle cx="152" cy="100" r="18" fill="#090d16" stroke="#facc15" strokeWidth="3" />
                    <circle cx="152" cy="100" r="9" fill="#facc15" stroke="#090d16" strokeWidth="1.5" />
                    <line x1="152" y1="84" x2="152" y2="116" stroke="#090d16" strokeWidth="2" />
                    <line x1="136" y1="100" x2="168" y2="100" stroke="#090d16" strokeWidth="2" />
                  </g>

                  {/* Rear Drive Wheel (R=34, Center: 55, 84 => Bottom: 118) */}
                  <g className="animate-[spin_1.8s_linear_infinite]" style={{ transformOrigin: '55px 84px' }}>
                    <circle cx="55" cy="84" r="34" fill="#090d16" stroke="#facc15" strokeWidth="4" />
                    <circle cx="55" cy="84" r="17" fill="#facc15" stroke="#090d16" strokeWidth="2" />
                    <circle cx="55" cy="84" r="5" fill="#090d16" />
                    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((ang, i) => (
                      <line 
                        key={i}
                        x1={55 + 19 * Math.cos((ang * Math.PI) / 180)}
                        y1={84 + 19 * Math.sin((ang * Math.PI) / 180)}
                        x2={55 + 32 * Math.cos((ang * Math.PI) / 180)}
                        y2={84 + 32 * Math.sin((ang * Math.PI) / 180)}
                        stroke="#090d16"
                        strokeWidth="3.5"
                      />
                    ))}
                  </g>

                  <defs>
                    <linearGradient id="efficientTractorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#22c55e" />
                      <stop offset="100%" stopColor="#15803d" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Click Hint */}
              <div className="text-[10px] text-emerald-400 font-mono tracking-wider flex items-center justify-center gap-1 mt-1 opacity-90 group-hover:scale-105 transition-transform">
                <Flame className="w-3 h-3 text-amber-400 animate-bounce" />
                <span>[CLICK TRACTOR TO TURBO REV]</span>
              </div>
            </div>

            <h3 className="text-sm font-black text-white mt-2">All-India GATE AG Aspirants</h3>
          </div>

          {/* INTERACTIVE TILLAGE SWIPE SOIL CANVAS */}
          <div className="relative z-10 bg-slate-950/80 p-2.5 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between text-[10px] text-slate-300 font-mono mb-1.5">
              <span>🌾 TILLAGE SWIPE AUTH</span>
              <span className="text-emerald-400 font-bold">{tillageProgress}% TILLED</span>
            </div>

            <div className="relative overflow-hidden rounded-xl cursor-crosshair">
              <canvas 
                ref={canvasRef} 
                width={260} 
                height={35}
                onMouseDown={() => setIsDraggingSoil(true)}
                onMouseUp={() => setIsDraggingSoil(false)}
                onMouseLeave={() => setIsDraggingSoil(false)}
                onMouseMove={handleSoilMouseMove}
                className="w-full h-9 rounded-xl block border border-emerald-500/30"
              />
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-[10px] text-slate-400 font-mono">
                {unEarthedToken ? (
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <Award className="w-3 h-3 text-amber-400" /> TOKEN UNEARTHED!
                  </span>
                ) : (
                  <span>Drag Tractor Across Soil</span>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* ======================================================== */}
        {/* RIGHT PANEL: 2-STEP OPTION SWITCHER & FORM               */}
        {/* ======================================================== */}
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between bg-white dark:bg-slate-900">
          
          <div>
            {/* Clean Tab Switcher: Log In | Sign Up */}
            <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 mb-5">
              <button
                type="button"
                onClick={() => switchPrimaryTab('login')}
                className={`py-2.5 px-4 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 border ${
                  primaryTab === 'login'
                    ? 'bg-blue-600 text-white border-blue-500 shadow-md font-extrabold'
                    : 'bg-transparent text-slate-600 dark:text-slate-400 border-transparent hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <KeyRound className="w-4 h-4" />
                <span>Log In</span>
              </button>

              <button
                type="button"
                onClick={() => switchPrimaryTab('signup')}
                className={`py-2.5 px-4 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 border ${
                  primaryTab === 'signup'
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-md font-extrabold'
                    : 'bg-transparent text-slate-600 dark:text-slate-400 border-transparent hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                <span>Sign Up</span>
              </button>
            </div>

            {/* Clean Form Heading */}
            <div className="mb-4">
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                {primaryTab === 'login' ? 'Log in to your account' : 'Create your student account'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {primaryTab === 'login'
                  ? 'Access your mock test results, bookmarks, and formula sheets.'
                  : 'Register for free offline PWA practice and GATE AG 2027 test series.'}
              </p>
            </div>

            {/* STEP 2: CATEGORY SELECTOR (ONLY WHEN SIGN UP ACTIVE) */}
            {primaryTab === 'signup' && (
              <div className="flex rounded-xl bg-slate-50 dark:bg-slate-950 p-1 border border-slate-200 dark:border-slate-800 mb-4 gap-1 overflow-x-auto animate-in fade-in">
                <button
                  type="button"
                  onClick={() => { setActiveMode('signup_hau'); setErrorMsg(''); playCyberSound('laser'); }}
                  className={`flex-1 py-1.5 px-2 text-[11px] font-bold rounded-lg transition-all flex items-center justify-center gap-1 ${
                    activeMode === 'signup_hau'
                      ? 'bg-emerald-700 text-white font-extrabold shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>CCS HAU Student</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setActiveMode('signup_external'); setErrorMsg(''); playCyberSound('laser'); }}
                  className={`flex-1 py-1.5 px-2 text-[11px] font-bold rounded-lg transition-all flex items-center justify-center gap-1 ${
                    activeMode === 'signup_external'
                      ? 'bg-emerald-700 text-white font-extrabold shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Other College</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setActiveMode('signup_visitor'); setErrorMsg(''); playCyberSound('laser'); }}
                  className={`flex-1 py-1.5 px-2 text-[11px] font-bold rounded-lg transition-all flex items-center justify-center gap-1 ${
                    activeMode === 'signup_visitor'
                      ? 'bg-emerald-700 text-white font-extrabold shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Visitor</span>
                </button>
              </div>
            )}

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
            {/* LOGIN FORM                                               */}
            {/* ======================================================== */}
            {primaryTab === 'login' && (
              <form onSubmit={handleLoginSubmit} className="space-y-3.5 text-xs animate-in fade-in">
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
                    placeholder="Username, Admission No, Mobile, or Email"
                    value={loginIdentifier}
                    onChange={(e) => {
                      setLoginIdentifier(e.target.value);
                      handleTypingRev();
                    }}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Password *</label>
                  <div className="relative">
                    <input
                      type={showLoginPassword ? "text" : "password"}
                      required
                      autoComplete="current-password"
                      placeholder="Password or DOB (DD/MM/YYYY)"
                      value={loginPassword}
                      onChange={(e) => {
                        setLoginPassword(e.target.value);
                        handleTypingRev();
                      }}
                      className="w-full px-3.5 py-2.5 pr-10 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-1"
                      title={showLoginPassword ? "Hide password" : "Show password"}
                    >
                      {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
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
                  {isLoading ? <span>Verifying...</span> : <span>Log In & Ignite Engine</span>}
                </button>
              </form>
            )}

            {/* ======================================================== */}
            {/* SIGN-UP FORM                                             */}
            {/* ======================================================== */}
            {primaryTab === 'signup' && (
              <form onSubmit={handleInstantSignUp} className="space-y-3.5 animate-in fade-in">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  
                  {/* Full Name */}
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-300">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aman Kumar"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        handleTypingRev();
                      }}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Unique Username */}
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                      <span>Unique Username *</span>
                      <span className="text-[10px] text-emerald-500 font-bold">No Duplicates</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-mono font-bold">@</span>
                      <input
                        type="text"
                        required
                        placeholder="amankumar2026"
                        value={username}
                        onChange={(e) => {
                          const val = e.target.value.replace(/^@/, '').toLowerCase().replace(/[^a-z0-9_]/g, '');
                          setUsername(val);
                          handleTypingRev();
                        }}
                        className="w-full pl-8 pr-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 font-mono placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
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
                    <label className="font-semibold text-slate-700 dark:text-slate-300">Date of Birth (DOB) *</label>
                    <input
                      type="date"
                      required
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* HAU Admission No (Only for CCS HAU) */}
                  {activeMode === 'signup_hau' && (
                    <div className="space-y-1 sm:col-span-2">
                      <label className="font-semibold text-slate-700 dark:text-slate-300">Admission No. (COAET HAU) *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 2022AE01BIV or 2024AE32BIV"
                        value={admissionNo}
                        onChange={(e) => {
                          setAdmissionNo(e.target.value);
                          handleTypingRev();
                        }}
                        className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 uppercase font-mono placeholder-slate-400 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  )}

                  {/* College Name Selection (Only for Other College) */}
                  {activeMode === 'signup_external' && (
                    <div className="space-y-1 sm:col-span-2">
                      <label className="font-semibold text-slate-700 dark:text-slate-300">College / Institute *</label>
                      <select
                        value={collegeName}
                        onChange={(e) => setCollegeName(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
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
                          className="w-full px-3.5 py-2.5 mt-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
                        />
                      )}
                    </div>
                  )}

                  {/* Mandatory Email */}
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-300">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. student@gmail.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        handleTypingRev();
                      }}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Mandatory Mobile */}
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-300">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile number"
                      value={mobileNumber}
                      onChange={(e) => {
                        setMobileNumber(e.target.value);
                        handleTypingRev();
                      }}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Custom Password (Optional) with Show/Hide Toggle */}
                  <div className="space-y-1 sm:col-span-2">
                    <label className="font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                      <span>Set Custom Password (Optional)</span>
                      <span className="text-[10px] text-slate-400 font-normal">Default: DOB (DD/MM/YYYY)</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showCustomPassword ? "text" : "password"}
                        placeholder="Enter password (min 6 characters)"
                        value={customPassword}
                        onChange={(e) => {
                          setCustomPassword(e.target.value);
                          handleTypingRev();
                        }}
                        className="w-full px-3.5 py-2.5 pr-10 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCustomPassword(!showCustomPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-1"
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
                  className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
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

          </div>
        </div>

      </div>
    </div>
  );
}
