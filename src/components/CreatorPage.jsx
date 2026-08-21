import React from 'react';
import { 
  Linkedin, 
  Instagram, 
  Mail, 
  MessageSquare, 
  Code, 
  Sparkles, 
  Award, 
  GraduationCap, 
  CheckCircle2, 
  ExternalLink,
  Users,
  Bot,
  Palette,
  SearchCheck,
  Cpu,
  HeartHandshake
} from 'lucide-react';

export default function CreatorPage() {
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
      description: "End-to-end full-stack codebase architect. Built the 180-min CBT exam engine, multi-mode practice suite, automated unit test framework (130+ passing tests), and PWA offline infrastructure."
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

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-2xl">
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-16 -bottom-16 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
          
          {/* 3D Developer Avatar */}
          <div className="relative shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-amber-500 text-white font-extrabold flex items-center justify-center text-2xl sm:text-3xl shadow-2xl border-2 border-white/20">
              RB
            </div>

            <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1.5 rounded-full shadow-lg border-2 border-slate-900" title="Verified Creator">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>

          {/* Bio Text */}
          <div className="text-center sm:text-left space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-xs font-bold text-blue-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Platform Creator & Lead Developer</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Raghav Bansal
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed font-medium">
              Creator of the <strong>GATE AG Prep Portal</strong> — engineered to empower Agricultural Engineering aspirants with 20 years of PYQ mock test CBT simulations, section-wise solved practice pools, and real-time concept analytics.
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

      {/* AI Contributions Section */}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/raghav-bansal-04a252328"
            target="_blank"
            rel="noopener noreferrer"
            className="card-3d p-5 rounded-2xl flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-200 dark:border-blue-900 group-hover:scale-110 transition shadow-xs">
                <Linkedin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">LinkedIn</h3>
                <p className="text-xs text-slate-500 font-medium">Raghav Bansal</p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition" />
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/raghavbansal0704"
            target="_blank"
            rel="noopener noreferrer"
            className="card-3d p-5 rounded-2xl flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-pink-50 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 flex items-center justify-center border border-pink-200 dark:border-pink-900 group-hover:scale-110 transition shadow-xs">
                <Instagram className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Instagram</h3>
                <p className="text-xs text-slate-500 font-medium">@raghavbansal0704</p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-pink-500 transition" />
          </a>

          {/* Email */}
          <a
            href="mailto:raghavbansal0704@gmail.com"
            className="card-3d p-5 rounded-2xl flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-200 dark:border-amber-900 group-hover:scale-110 transition shadow-xs">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Email</h3>
                <p className="text-xs text-slate-500 font-medium">raghavbansal0704@gmail.com</p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-amber-500 transition" />
          </a>

          {/* WhatsApp / Call */}
          <a
            href="https://wa.me/917206283166"
            target="_blank"
            rel="noopener noreferrer"
            className="card-3d p-5 rounded-2xl flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-200 dark:border-emerald-900 group-hover:scale-110 transition shadow-xs">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">WhatsApp / Call</h3>
                <p className="text-xs text-slate-500 font-medium">+91 7206283166</p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 transition" />
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

      {/* About Platform Card */}
      <div className="card-3d rounded-3xl p-6 sm:p-8 space-y-4">
        <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-amber-500" />
          <span>About GATE AG Prep Portal</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
          Designed specifically for GATE Agricultural Engineering (AG) aspirants. The portal integrates official CBT exam environment rules, instant answer key verification, KaTeX math equation rendering, and section/topic segregations from 2007 to 2026.
        </p>
      </div>

    </div>
  );
}
