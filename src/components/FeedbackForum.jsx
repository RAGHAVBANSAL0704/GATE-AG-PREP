import React, { useState } from 'react';
import { 
  AlertCircle, 
  MessageSquare, 
  Send, 
  FileQuestion, 
  Bug, 
  HelpCircle, 
  Sparkles, 
  User, 
  ExternalLink,
  CheckCircle2,
  PhoneCall
} from 'lucide-react';

export default function FeedbackForum() {
  const WHATSAPP_NUMBER = "917206283166";
  const DISPLAY_PHONE = "+91 7206283166";

  const [category, setCategory] = useState('Question Error');
  const [questionRef, setQuestionRef] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [sentStatus, setSentStatus] = useState(false);

  const generateWhatsAppUrl = () => {
    const formattedMsg = `*GATE AG Prep — Issue Report*
----------------------------------
*Category:* ${category}
*Target Ref/Question:* ${questionRef.trim() || 'N/A'}
*Student Name:* ${name.trim() || 'GATE Aspirant'}
----------------------------------
*Problem Details:*
${description.trim()}
----------------------------------
_Sent from GATE AG Prep Web Portal_`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(formattedMsg)}`;
  };

  const handleSendWhatsApp = (e) => {
    e.preventDefault();
    if (!description.trim()) return;

    const url = generateWhatsAppUrl();
    window.open(url, '_blank', 'noopener,noreferrer');
    setSentStatus(true);
    setTimeout(() => setSentStatus(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
      
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xs">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Direct Creator Support via WhatsApp</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              Report an Issue or Problem
            </h1>
            <p className="text-xs text-slate-500 max-w-2xl">
              Faced an error in a question solution, calculation typo, or technical glitch? Message creator <strong>Raghav Bansal</strong> directly on WhatsApp ({DISPLAY_PHONE}) for instant resolution.
            </p>
          </div>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs transition shadow-md"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>Open WhatsApp Chat ({DISPLAY_PHONE})</span>
          </a>
        </div>
      </div>

      {/* Main Issue Reporter Form */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-4 space-y-1">
          <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <AlertCircle className="w-4.5 h-4.5 text-rose-500" />
            <span>Submit Issue Details for Direct WhatsApp Message</span>
          </h2>
          <p className="text-xs text-slate-500">
            Fill in the details below. Clicking <strong>"Message Creator on WhatsApp"</strong> will format and open WhatsApp with your issue details pre-filled.
          </p>
        </div>

        <form onSubmit={handleSendWhatsApp} className="space-y-5 text-xs">
          
          {/* Category & Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Issue Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-slate-100 font-medium outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Question Error">🚨 Question Error / Answer Key Mistake</option>
                <option value="Calculation Typo">📐 Derivation / Calculation Typo</option>
                <option value="UI Bug">🐞 UI Glitch / Technical Bug</option>
                <option value="Other Problem">📢 Other Problem / Complaint</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Your Name (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Ankit or GATE Aspirant"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-slate-100 font-medium outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Question / Paper Ref */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Target Question ID / Paper Reference (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. GATE_2026_Q15, GATE 2027 Mock 01 Q22, or Practice Pool Q4"
              value={questionRef}
              onChange={(e) => setQuestionRef(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-slate-100 font-medium outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Describe the Issue / Problem Faced *
            </label>
            <textarea
              rows={5}
              required
              placeholder="Explain the problem, mistake, typo, or glitch in detail so we can fix it immediately..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3.5 text-slate-900 dark:text-slate-100 font-medium outline-none focus:ring-2 focus:ring-emerald-500 resize-none text-xs"
            />
          </div>

          {/* Action Button */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
            <div className="text-slate-500 text-[11px]">
              Direct WhatsApp Link: <span className="font-bold text-slate-800 dark:text-slate-200">{DISPLAY_PHONE}</span>
            </div>

            <button
              type="submit"
              disabled={!description.trim()}
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-extrabold text-xs transition shadow-md flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Message Creator on WhatsApp</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </button>
          </div>

        </form>

        {sentStatus && (
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs flex items-center gap-3 animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div className="font-bold">Opening WhatsApp... Check your browser window or app!</div>
          </div>
        )}

      </div>

      {/* Direct Contact Card */}
      <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 space-y-3 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="font-bold text-sm text-white">Prefer a direct call or email instead?</div>
          <div className="text-xs text-slate-400">Raghav Bansal • Creator & Platform Maintainer</div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="mailto:raghavbansal0704@gmail.com"
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition"
          >
            Email Raghav
          </a>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-extrabold text-white transition flex items-center gap-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-white" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>

    </div>
  );
}
