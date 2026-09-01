import React, { useState, useEffect } from 'react';
import { 
  User, 
  Heart, 
  ShieldCheck, 
  Sparkles, 
  Linkedin, 
  Instagram, 
  Mail, 
  MessageSquare, 
  Code, 
  Award, 
  GraduationCap, 
  CheckCircle2, 
  ExternalLink,
  Users,
  Bot,
  SearchCheck,
  Cpu,
  Building,
  BookOpen,
  Layers,
  HeartHandshake,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  KeyRound,
  Radio
} from 'lucide-react';
import SupportPage from './SupportPage';
import AdminQuestionManager from './AdminQuestionManager';
import AdminUserRoleManager from './AdminUserRoleManager';
import { isAdminUnlocked, setAdminUnlocked, verifyAdminPasscode } from '../services/questionSyncService.js';

export default function CreatorAdminHQ({ 
  initialSubTab = 'creator',
  questions = [], 
  mockPapers = [], 
  customMockPapers = [], 
  editedQuestionsMap = {}, 
  onSaveEditedQuestion, 
  onOpenCalc,
  currentStudent 
}) {
  const [activeSubTab, setActiveSubTab] = useState(initialSubTab);
  const [isAdminAuth, setIsAdminAuth] = useState(() => isAdminUnlocked(currentStudent));
  const [adminPasscode, setAdminPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAdminUnlocked(currentStudent)) {
      setIsAdminAuth(true);
    }
  }, [currentStudent]);

  const handleUnlockAdmin = (e) => {
    if (e) e.preventDefault();
    setPasscodeError('');

    if (verifyAdminPasscode(adminPasscode)) {
      setIsAdminAuth(true);
      setAdminUnlocked(true);
      setAdminPasscode('');
    } else {
      setPasscodeError('Invalid admin passcode. Access denied.');
    }
  };

  const handleLockAdmin = () => {
    setIsAdminAuth(false);
    setAdminUnlocked(false);
  };

  useEffect(() => {
    if (initialSubTab) {
      setActiveSubTab(initialSubTab);
    }
  }, [initialSubTab]);

  const teamMembers = [
    {
      name: "Pankaj Goswami",
      initials: "PG",
      role: "UI/UX Co-Designer & Lead Question QA Engineer",
      category: "Human Contributor",
      badgeColor: "bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800",
      avatarGradient: "from-purple-600 to-indigo-600",
      highlights: [
        "Co-designed intuitive UI/UX interface layouts for seamless navigation",
        "Forensic auditing of 20+ years of GATE AG question papers for error detection",
        "Identified & corrected numerical answer key typos and formula derivations",
        "Assisted in raw dataset collection, verification, and syllabus categorization"
      ]
    },
    {
      name: "Sahid Iqbal",
      initials: "SI",
      role: "UI/UX Co-Designer & Data Collection Specialist",
      category: "Human Contributor",
      badgeColor: "bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800",
      avatarGradient: "from-blue-600 to-cyan-600",
      highlights: [
        "UI/UX component design refinement & visual consistency across devices",
        "Comprehensive data collection & generation from official GATE AG archives",
        "Double-verification of option choices, MSQ keys, and NAT interval bounds",
        "Collaborated on question pool structuring and subtopic indexing"
      ]
    }
  ];

  const aiContributors = [
    {
      name: "Google Antigravity System",
      provider: "Google DeepMind Agentic AI",
      role: "Autonomous System Architect & Lead AI Engineer",
      avatarGradient: "from-amber-500 via-rose-500 to-indigo-600",
      badgeColor: "bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800",
      description: "End-to-end full-stack codebase architect. Built the 180-min CBT exam engine, multi-mode practice suite, offline sync engine, Gemini AI Study Assistant, and automated test frameworks."
    },
    {
      name: "Claude.ai",
      provider: "Anthropic AI Intelligence",
      role: "LaTeX Derivations & Solution Co-Pilot",
      avatarGradient: "from-orange-500 to-amber-600",
      badgeColor: "bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800",
      description: "Advanced mathematical co-pilot. Assisted in generating LaTeX equation renderings, step-by-step mathematical derivations, and deep syllabus concept breakdowns."
    }
  ];

  const acknowledgements = [
    {
      title: "CCS Haryana Agricultural University (CCS HAU, Hisar)",
      subtitle: "Academic & Institutional Alma Mater",
      icon: Building,
      badge: "Institutional Heritage",
      badgeColor: "bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
      description: "Profound gratitude to CCS HAU Hisar, the College of Agricultural Engineering and Technology (COAE&T), and revered professors whose rigorous academic teachings in Farm Machinery & Power, Soil & Water Conservation, Agricultural Processing, and Renewable Energy formed the core bedrock of this platform."
    },
    {
      title: "GATE Organizing IITs & IISc Bangalore",
      subtitle: "Benchmark Examination Standards (2007–2026)",
      icon: GraduationCap,
      badge: "Curriculum Standard",
      badgeColor: "bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
      description: "Acknowledging the GATE Organizing Committees at IIT Kharagpur, IIT Bombay, IIT Roorkee, IIT Delhi, IIT Madras, IIT Kanpur, IIT Guwahati, and IISc Bangalore for establishing two decades of rigorous, standardized engineering evaluation papers that inspire agricultural engineers across India."
    },
    {
      title: "Open-Source & Computational Ecosystem",
      subtitle: "Software Engineering & Math Frameworks",
      icon: Code,
      badge: "Open Source",
      badgeColor: "bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800",
      description: "Built on world-class open-source technologies including React, Vite, KaTeX (Khan Academy LaTeX renderer), Tailwind CSS, Lucide Icons, Canvas Confetti, and Supabase PostgreSQL for high-speed offline-first client architecture."
    },
    {
      title: "Student Community & Peer Reviewers",
      subtitle: "Aspirant Feedback & Quality Assurance",
      icon: HeartHandshake,
      badge: "Community Driven",
      badgeColor: "bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800",
      description: "Special thanks to all student beta testers, peer study groups, and GATE AG aspirants across the country who actively test CBT mock tests, suggest features, and report question typos for rapid corrections."
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-200">
      
      {/* Master Segmented Tab Navigation */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-1.5 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap gap-1">
        <button
          onClick={() => setActiveSubTab('creator')}
          className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-xl text-xs font-extrabold transition flex items-center justify-center gap-2 cursor-pointer ${
            activeSubTab === 'creator'
              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Creator & Acknowledgements</span>
        </button>

        <button
          onClick={() => setActiveSubTab('support')}
          className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-xl text-xs font-extrabold transition flex items-center justify-center gap-2 cursor-pointer ${
            activeSubTab === 'support'
              ? 'bg-rose-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Heart className="w-4 h-4 text-rose-300 fill-rose-300" />
          <span>Support & Exam Requests</span>
        </button>

        <button
          onClick={() => setActiveSubTab('admin')}
          className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-xl text-xs font-extrabold transition flex items-center justify-center gap-2 cursor-pointer ${
            activeSubTab === 'admin'
              ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Question Admin Studio</span>
        </button>

        <button
          onClick={() => setActiveSubTab('roles')}
          className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-xl text-xs font-extrabold transition flex items-center justify-center gap-2 cursor-pointer ${
            activeSubTab === 'roles'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Roles & Contributors</span>
        </button>
      </div>

      {/* TAB 1: CREATOR, TEAM & ACKNOWLEDGEMENTS */}
      {activeSubTab === 'creator' && (
        <div className="space-y-8 animate-in fade-in duration-150">
          
          {/* Header Banner */}
          <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-2xl">
            <div className="absolute -right-16 -top-16 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -left-16 -bottom-16 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
              
              {/* 3D Developer Avatar */}
              <div className="relative shrink-0">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-slate-800 via-emerald-800 to-teal-700 text-white font-extrabold flex items-center justify-center text-2xl sm:text-3xl shadow-2xl border-2 border-white/20">
                  RB
                </div>

                <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1.5 rounded-full shadow-lg border-2 border-slate-900" title="Verified Creator">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>

              {/* Bio Text */}
              <div className="text-center sm:text-left space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-xs font-bold text-emerald-300">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Platform Creator & Lead Developer</span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Raghav Bansal
                </h1>

                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed font-medium">
                  Creator of the <strong>GATE AG Prep Portal</strong> — engineered to empower Agricultural Engineering aspirants with 20 years of PYQ mock test CBT simulations, section-wise solved practice pools, AI doubt solvers, and real-time concept analytics.
                </p>
              </div>
            </div>
          </div>

          {/* About My Team Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <span>About My Team — Core Contributors</span>
              </h2>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                UI Design & QA Team
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teamMembers.map((member) => (
                <div 
                  key={member.name}
                  className="card-3d rounded-3xl p-6 space-y-4 border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${member.avatarGradient} text-white font-extrabold flex items-center justify-center text-sm shadow-md shrink-0`}>
                        {member.initials}
                      </div>
                      <div>
                        <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                          {member.name}
                        </h3>
                        <span className={`inline-block text-[10px] font-extrabold uppercase px-2 py-0.5 rounded border mt-0.5 ${member.badgeColor}`}>
                          {member.role}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                      <div className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <SearchCheck className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Core Contributions & Expertise:</span>
                      </div>
                      <ul className="space-y-1.5 text-slate-600 dark:text-slate-400 pl-1">
                        {member.highlights.map((h, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-[11px] leading-snug">
                            <span className="text-indigo-500 font-bold">•</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Acknowledgements & Institutional Contributions */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span>Acknowledgements & Contributions</span>
              </h2>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                Honorary Mentions
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {acknowledgements.map((ack, idx) => {
                const IconComponent = ack.icon;
                return (
                  <div 
                    key={idx}
                    className="card-3d rounded-3xl p-6 space-y-3 border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-800 dark:text-slate-200 shrink-0 shadow-xs">
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">
                              {ack.title}
                            </h3>
                            <p className="text-[11px] text-slate-500 font-medium">
                              {ack.subtitle}
                            </p>
                          </div>
                        </div>
                        <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded border shrink-0 ${ack.badgeColor}`}>
                          {ack.badge}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-2 border-t border-slate-100 dark:border-slate-800 font-medium">
                        {ack.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI Architecture & Intelligence Contributions */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <Cpu className="w-5 h-5 text-amber-500" />
                <span>AI Architecture & Intelligence Contributions</span>
              </h2>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                Agentic AI Systems
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aiContributors.map((ai) => (
                <div 
                  key={ai.name}
                  className="card-3d rounded-3xl p-6 space-y-3 border border-slate-200 dark:border-slate-800"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${ai.avatarGradient} text-white flex items-center justify-center shadow-md shrink-0`}>
                      <Bot className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                        {ai.name}
                      </h3>
                      <span className={`inline-block text-[10px] font-extrabold uppercase px-2 py-0.5 rounded border mt-0.5 ${ai.badgeColor}`}>
                        {ai.role}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-1 border-t border-slate-100 dark:border-slate-800">
                    {ai.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Connect Cards */}
          <div className="space-y-4">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Code className="w-4.5 h-4.5 text-blue-600" />
              <span>Get in Touch & Connect</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/raghav-bansal-04a252328"
                target="_blank"
                rel="noopener noreferrer"
                className="card-3d p-4 rounded-2xl flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-200 dark:border-blue-900 group-hover:scale-110 transition shadow-xs">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-slate-900 dark:text-white">LinkedIn</h3>
                    <p className="text-[10px] text-slate-500 font-medium">Raghav Bansal</p>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 transition" />
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/raghavbansal0704"
                target="_blank"
                rel="noopener noreferrer"
                className="card-3d p-4 rounded-2xl flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-pink-50 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 flex items-center justify-center border border-pink-200 dark:border-pink-900 group-hover:scale-110 transition shadow-xs">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-slate-900 dark:text-white">Instagram</h3>
                    <p className="text-[10px] text-slate-500 font-medium">@raghavbansal0704</p>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-pink-500 transition" />
              </a>

              {/* Email */}
              <a
                href="mailto:raghavbansal0704@gmail.com"
                className="card-3d p-4 rounded-2xl flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-200 dark:border-amber-900 group-hover:scale-110 transition shadow-xs">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-slate-900 dark:text-white">Email</h3>
                    <p className="text-[10px] text-slate-500 font-medium truncate max-w-[100px]">raghavbansal0704</p>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-500 transition" />
              </a>

              {/* WhatsApp / Call */}
              <a
                href="https://wa.me/917206283166"
                target="_blank"
                rel="noopener noreferrer"
                className="card-3d p-4 rounded-2xl flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-200 dark:border-emerald-900 group-hover:scale-110 transition shadow-xs">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-slate-900 dark:text-white">WhatsApp</h3>
                    <p className="text-[10px] text-slate-500 font-medium">+91 7206283166</p>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-500 transition" />
              </a>

            </div>
          </div>

          {/* Direct Issue Reporting Box */}
          <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-8 space-y-4 border border-emerald-800 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 text-emerald-300 text-xs font-bold border border-emerald-700">
                  <MessageSquare className="w-3.5 h-3.5 fill-emerald-300" />
                  <span>Direct Student Help & Error Reporting</span>
                </div>
                <h2 className="text-xl font-extrabold text-white">
                  Faced any Problem, Mistake, or Issue?
                </h2>
                <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                  If you find any question error, calculation typo, UI bug, or face any issue while practicing, message Raghav directly on WhatsApp for immediate correction!
                </p>
              </div>

              <a
                href="https://wa.me/917206283166?text=Hi%20Raghav!%20I%20faced%20an%20issue%20on%20GATE%20AG%20Prep%20Web%20Portal:"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs transition shadow-lg shrink-0 flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4 fill-slate-950" />
                <span>Report Issue via WhatsApp</span>
              </a>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: SUPPORT & EXAM REQUESTS */}
      {activeSubTab === 'support' && (
        <SupportPage currentStudent={currentStudent} />
      )}

      {/* TAB 3: QUESTION ADMIN STUDIO (PASSCODE PROTECTED) */}
      {activeSubTab === 'admin' && (
        !isAdminAuth ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 shadow-xl max-w-md mx-auto text-center space-y-6 animate-in fade-in">
            <div className="w-16 h-16 rounded-3xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mx-auto shadow-md">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Question Admin Studio Protected
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Enter the master creator/admin passcode to edit questions, refine answer keys, and manage mock tests.
              </p>
            </div>

            <form onSubmit={handleUnlockAdmin} className="space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter Admin Passcode..."
                  value={adminPasscode}
                  onChange={(e) => { setAdminPasscode(e.target.value); setPasscodeError(''); }}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-900 dark:text-slate-100 font-mono text-xs outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {passcodeError && (
                <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-xs font-bold animate-in fade-in">
                  {passcodeError}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs rounded-2xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <KeyRound className="w-4 h-4" />
                <span>Unlock Question Studio</span>
              </button>
            </form>

            <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-center gap-1.5 border-t border-slate-100 dark:border-slate-800">
              <Radio className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
              <span>Real-Time Multi-Device Sync is Active</span>
            </div>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in">
            {/* Admin Live Sync & Lock Banner */}
            <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 rounded-2xl p-3 sm:p-4 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-300">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Live Multi-Device Sync Active — Any edits broadcast instantly across all devices.</span>
              </div>

              <button
                onClick={handleLockAdmin}
                className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-rose-50 hover:text-rose-600 text-slate-700 dark:text-slate-300 font-extrabold text-xs transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                title="Lock Question Admin Studio"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Lock Studio</span>
              </button>
            </div>

            <AdminQuestionManager
              questions={questions}
              mockPapers={mockPapers}
              customMockPapers={customMockPapers}
              editedQuestionsMap={editedQuestionsMap}
              onSaveEditedQuestion={onSaveEditedQuestion}
              onOpenCalc={onOpenCalc}
            />
          </div>
        )
      )}

      {/* TAB 4: USER ROLES & CONTRIBUTOR CONTROL */}
      {activeSubTab === 'roles' && (
        !isAdminAuth ? (
          <div className="max-w-md mx-auto my-12 p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl space-y-6 text-center animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-900 flex items-center justify-center mx-auto text-indigo-600 dark:text-indigo-400 shadow-inner">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                Admin Role Control Locked
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Enter your administrative security passcode to manage user roles, promote solvers, and assign faculty contributor badges.
              </p>
            </div>

            <form onSubmit={handleUnlockAdmin} className="space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Admin Passcode"
                  value={adminPasscode}
                  onChange={(e) => setAdminPasscode(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-mono text-center tracking-widest text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {passcodeError && (
                <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-xs font-bold animate-in fade-in">
                  {passcodeError}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs rounded-2xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <KeyRound className="w-4 h-4" />
                <span>Unlock Role Management</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in">
            {/* Admin Live Sync & Lock Banner */}
            <div className="bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900 rounded-2xl p-3 sm:p-4 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 font-bold text-indigo-800 dark:text-indigo-300">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
                <span>Admin Contributor Studio Unlocked — Changes persist immediately.</span>
              </div>

              <button
                onClick={handleLockAdmin}
                className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-rose-50 hover:text-rose-600 text-slate-700 dark:text-slate-300 font-extrabold text-xs transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                title="Lock Studio"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Lock Studio</span>
              </button>
            </div>

            <AdminUserRoleManager currentStudent={currentStudent} />
          </div>
        )
      )}

    </div>
  );
}
