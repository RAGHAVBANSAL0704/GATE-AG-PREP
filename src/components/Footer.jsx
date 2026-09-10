import React, { useState } from 'react';
import { 
  Heart, 
  HelpCircle, 
  MessageSquare, 
  BookOpen, 
  Award, 
  FileText, 
  Mail, 
  Linkedin, 
  Send,
  ArrowUp,
  ShieldCheck,
  Globe,
  Shield,
  GraduationCap,
  ExternalLink,
  Scale,
  X,
  Info
} from 'lucide-react';

export default function Footer({ setActiveTab }) {
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 shadow-sm mt-10 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl 2xl:max-w-[1500px] mx-auto space-y-4">
        
        {/* Main Sleek Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* Dedication Pill */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold shadow-2xs">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-pulse" />
            <span>by <strong className="text-emerald-600 dark:text-emerald-400 font-bold">Raghav Bansal</strong> for his dear juniors</span>
          </div>

          {/* Essential Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-bold text-slate-700 dark:text-slate-300">
            <button 
              onClick={() => setActiveTab('practicehub')} 
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Practice
            </button>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <button 
              onClick={() => setActiveTab('mocktest')} 
              className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer"
            >
              CBT Mocks
            </button>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <button 
              onClick={() => setActiveTab('syllabus')} 
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
            >
              Syllabus
            </button>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <button 
              onClick={() => setActiveTab('support')} 
              className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer"
            >
              Support & Contact
            </button>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <button 
              onClick={() => setActiveTab('feedback')} 
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
            >
              Feedback
            </button>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <button 
              onClick={() => setIsDisclaimerOpen(true)} 
              className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer inline-flex items-center gap-1"
            >
              <Scale className="w-3 h-3" />
              <span>Legal & Disclaimer</span>
            </button>
          </div>

          {/* Social Icons & Back-to-Top */}
          <div className="flex items-center gap-3">
            {/* Email */}
            <a 
              href="mailto:raghavbansal0704@gmail.com" 
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 hover:text-emerald-600 dark:hover:text-emerald-400 transition shadow-2xs"
              title="Email: raghavbansal0704@gmail.com"
            >
              <Mail className="w-4 h-4" />
            </a>

            {/* LinkedIn */}
            <a 
              href="https://linkedin.com/in/raghavbansal0704" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition shadow-2xs"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            {/* Telegram Community */}
            <a 
              href="https://t.me/gate_ag_prep" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 hover:text-cyan-600 dark:hover:text-cyan-400 transition shadow-2xs"
              title="Telegram Community"
            >
              <Send className="w-4 h-4" />
            </a>

            {/* Divider */}
            <div className="h-5 w-px bg-slate-200 dark:bg-slate-800" />

            {/* Back to top */}
            <button 
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 transition flex items-center gap-1.5 text-xs font-bold cursor-pointer shadow-2xs"
              title="Scroll to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Top</span>
            </button>
          </div>

        </div>

        {/* Allied Web Portals by Raghav Bansal */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 font-bold text-slate-700 dark:text-slate-300">
            <Globe className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>More Portals by Raghav Bansal:</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <a
              href="https://main-portal-ncc-01.vercel.app/#/home"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/50 hover:bg-amber-100 dark:hover:bg-amber-900/60 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-800/80 font-bold transition shadow-2xs group"
              title="NCC Preparation Portal - CBT, Notes & Certification Drills"
            >
              <Shield className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>NCC Prep Portal</span>
              <ExternalLink className="w-3 h-3 text-amber-600 dark:text-amber-400 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </a>

            <button
              type="button"
              onClick={() => alert("COAET Student's Corner is currently under active testing and development. Access is temporarily disabled.")}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 font-bold transition shadow-2xs cursor-not-allowed opacity-80"
              title="COAET Student's Corner is currently under testing and development"
            >
              <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
              <span>COAET Student's Corner (CCS HAU)</span>
              <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-800">
                Under Dev
              </span>
            </button>
          </div>
        </div>

        {/* Fair Dealing & Non-Affiliation Notice */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
          <p className="flex-1">
            <strong className="text-slate-700 dark:text-slate-300 font-semibold">Educational Fair Dealing & Disclaimer:</strong> GATE is administered by IITs &amp; IISc on behalf of NCB-GATE. This student-built portal is independent and not affiliated with or endorsed by IITs, IISc, or the Ministry of Education. Past examination papers &amp; keys are reproduced for non-commercial student preparation under the Fair Dealing provisions of Section 52(1) of the Indian Copyright Act, 1957.
          </p>
          <button
            onClick={() => setIsDisclaimerOpen(true)}
            className="shrink-0 inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-bold underline underline-offset-2 cursor-pointer transition"
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Read Full Legal Notice</span>
          </button>
        </div>

        {/* Bottom Line */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 font-mono font-medium">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>© {new Date().getFullYear()} GATE AG Prep Portal</span>
          </div>
          <div>COAET CCS HAU Hisar</div>
        </div>

      </div>

      {/* Comprehensive Legal & Copyright Disclaimer Modal */}
      {isDisclaimerOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setIsDisclaimerOpen(false)}
        >
          <div 
            className="relative w-full max-w-2xl max-h-[85vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                    Legal Notice &amp; Fair Dealing Statement
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Indian Copyright Act, 1957 • Non-Affiliation &amp; Intellectual Property
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsDisclaimerOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              
              {/* Section 1 */}
              <div className="space-y-1.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 text-xs">
                  <Shield className="w-3.5 h-3.5 text-blue-500" />
                  <span>1. Independence &amp; Non-Affiliation</span>
                </h4>
                <p>
                  GATE (Graduate Aptitude Test in Engineering) is conducted and organized jointly by the Indian Institute of Science (IISc Bangalore) and seven Indian Institutes of Technology (IIT Bombay, IIT Delhi, IIT Guwahati, IIT Kanpur, IIT Kharagpur, IIT Madras, IIT Roorkee) on behalf of the <strong>National Coordination Board (NCB)-GATE</strong>, Department of Higher Education, Ministry of Education, Government of India.
                </p>
                <p className="font-medium text-slate-800 dark:text-slate-200">
                  The <strong>GATE AG Prep Portal</strong> is an independent educational platform created by Raghav Bansal to assist agricultural engineering aspirants. This website is <strong>neither affiliated with, authorized by, maintained, sponsored, nor endorsed</strong> by any IIT, IISc, the Ministry of Education, or the National Coordination Board (NCB)-GATE.
                </p>
              </div>

              {/* Section 2 */}
              <div className="space-y-1.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 text-xs">
                  <Scale className="w-3.5 h-3.5 text-emerald-500" />
                  <span>2. Fair Dealing under the Indian Copyright Act, 1957</span>
                </h4>
                <p>
                  All official previous years’ question papers, question formulations, and official answer keys remain the intellectual property of their respective organizing institutes and NCB-GATE. They are cataloged, referenced, and rendered on this portal strictly in accordance with:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-1 text-slate-700 dark:text-slate-300">
                  <li>
                    <strong>Section 52(1)(a)</strong>: Fair dealing for the purposes of private or personal use, research, criticism, or review.
                  </li>
                  <li>
                    <strong>Section 52(1)(h)</strong>: Reproduction of examination questions and answers in the course of academic instruction, preparation, and self-assessment.
                  </li>
                </ul>
                <p>
                  The organizing IITs routinely release previous examination papers and keys into the public domain via their official portals for free candidate access.
                </p>
              </div>

              {/* Section 3 */}
              <div className="space-y-1.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 text-xs">
                  <Award className="w-3.5 h-3.5 text-purple-500" />
                  <span>3. Transformative Value &amp; Original Educational Works</span>
                </h4>
                <p>
                  All step-by-step solutions, conceptual derivations, interactive Computer-Based Test (CBT) mock simulation engine, dynamic negative-marking algorithms, formula reference guides, subject weightage heatmaps, and performance analytics are original educational works developed to provide substantive transformative learning value.
                </p>
              </div>

              {/* Section 4 */}
              <div className="space-y-1.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 text-xs">
                  <Info className="w-3.5 h-3.5 text-amber-500" />
                  <span>4. Trademarks &amp; Grievance Contact</span>
                </h4>
                <p>
                  All trademarks, service marks, trade names, and logos belong to their respective owners. Any reference to &quot;GATE&quot; or related acronyms is strictly nominative to indicate the examination curriculum.
                </p>
                <p>
                  If any institution, copyright holder, or authority has questions or concerns regarding any content on this portal, please direct inquiries to:
                </p>
                <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  Email: raghavbansal0704@gmail.com
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-950">
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                Indian Copyright Act, 1957 • Sec 52(1)
              </span>
              <button
                onClick={() => setIsDisclaimerOpen(false)}
                className="px-4 py-1.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition shadow-xs cursor-pointer"
              >
                I Understand
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
