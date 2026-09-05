import React from 'react';
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
  ShieldCheck
} from 'lucide-react';

export default function Footer({ setActiveTab }) {
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

        {/* Bottom Line */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 font-mono font-medium">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>© {new Date().getFullYear()} GATE AG Prep Portal</span>
          </div>
          <div>COAET CCS HAU Hisar</div>
        </div>

      </div>
    </footer>
  );
}
