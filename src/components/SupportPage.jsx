import React, { useState } from 'react';
import { 
  Heart, 
  Copy, 
  Check, 
  Coffee, 
  MessageSquare,
  Send,
  Sparkles,
  ShieldCheck,
  Zap,
  ExternalLink,
  CreditCard,
  Globe,
  Shield,
  GraduationCap,
  Scale
} from 'lucide-react';

export default function SupportPage({ currentStudent }) {
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [requestedExamName, setRequestedExamName] = useState('');
  const [requestedExamNotes, setRequestedExamNotes] = useState('');

  const upiId = "raghavbansal0704@oksbi";
  const whatsappNumber = "919812203728"; // Raghav Bansal WhatsApp contact
  const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent('GATE AG Prep Mission')}&cu=INR`;

  const handleCopyUpi = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(upiId).catch(() => {});
    }
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleDirectUpiPay = () => {
    try {
      window.location.href = upiUrl;
    } catch (err) {
      console.warn("UPI protocol launch note:", err);
    }

    // Auto-copy UPI ID to clipboard as instant fallback (especially for desktop browsers)
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(upiId).catch(() => {});
    }
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleSendWhatsAppMessage = (e) => {
    e.preventDefault();
    if (!requestedExamName.trim()) return;

    const messageText = `Hi Raghav! I am using the GATE AG Prep Portal.\n\nI would like to request a new exam portal for:\n📌 *Exam Name:* ${requestedExamName.trim()}\n📝 *Details/Notes:* ${requestedExamNotes.trim() || 'Please add question papers & CBT mocks for this exam.'}\n\nStudent Name: ${currentStudent?.name || 'Aspirant'}`;

    const encodedText = encodeURIComponent(messageText);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedText}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-5 animate-in fade-in duration-200">
      
      {/* Minimalist Top Header */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              <span>Support & Exam Request Center</span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              100% free education mission for GATE Agricultural Engineering & competitive exam aspirants across India.
            </p>
          </div>

          <div className="text-xs font-mono font-bold px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900 shrink-0">
            Ad-Free & Free Forever
          </div>
        </div>
      </div>

      {/* Grid: Support Hosting & Direct WhatsApp Request */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Left Column: Direct Phone UPI Support */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 space-y-4 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800">
              <Coffee className="w-4 h-4 text-emerald-500 shrink-0" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Platform Hosting &amp; Domain Support
              </h2>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 dark:text-slate-300">Official UPI ID</span>
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">GPay / PhonePe / Paytm</span>
              </div>

              {/* UPI Field */}
              <div className="flex items-center gap-2">
                <div className="flex-1 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-mono font-bold text-slate-900 dark:text-slate-100 truncate selection:bg-emerald-500 selection:text-white">
                  {upiId}
                </div>
                <button
                  type="button"
                  onClick={handleCopyUpi}
                  className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center gap-1.5 shrink-0 shadow-xs cursor-pointer"
                  title="Copy UPI ID to clipboard"
                >
                  {copiedUpi ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedUpi ? 'Copied!' : 'Copy UPI'}</span>
                </button>
              </div>

              {/* Direct Phone UPI App Launch Button */}
              <a
                href={upiUrl}
                onClick={handleDirectUpiPay}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:via-indigo-500 hover:to-blue-600 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer text-center group"
              >
                <CreditCard className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                <span>Open in Phone UPI App (GPay / PhonePe / Paytm)</span>
                <ExternalLink className="w-3.5 h-3.5 text-blue-200 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center leading-relaxed">
                Redirects directly to your installed phone UPI app. Any voluntary amount can be chosen directly inside your UPI app.
              </p>
            </div>
          </div>

          {/* Transparent Infrastructure & Hosting Statement */}
          <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 text-[11px] space-y-1.5 text-slate-700 dark:text-slate-300 mt-3">
            <div className="font-bold text-emerald-950 dark:text-emerald-200 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Hosting &amp; Domain Expense Allocation</span>
            </div>
            <p className="leading-relaxed">
              <strong>100% Transparency Guarantee:</strong> Support money is used <strong>only to cover hosting, custom domain registration, server maintenance, and other related operational platform infrastructure charges</strong>. The portal is completely non-profit, ad-free, and 100% free forever for all students.
            </p>
          </div>
        </div>

        {/* Right Column: Direct WhatsApp Request for New Exam */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 space-y-4 shadow-xs">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800">
            <MessageSquare className="w-4 h-4 text-emerald-500 shrink-0" />
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Request New Exam Portal via WhatsApp
              </h2>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Send a direct WhatsApp message to the developer to request any exam portal.
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSendWhatsAppMessage} className="space-y-3">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                Exam Name / Code *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. ICAR JRF, GATE XE, State AE/JE, NABARD, UPSC IFS..."
                value={requestedExamName}
                onChange={(e) => setRequestedExamName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 placeholder:opacity-100 outline-none text-xs focus:ring-1 focus:ring-emerald-500 font-medium"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                Additional Details / Requests (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="Specific subjects, years needed, or syllabus notes..."
                value={requestedExamNotes}
                onChange={(e) => setRequestedExamNotes(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 placeholder:opacity-100 outline-none text-xs focus:ring-1 focus:ring-emerald-500 font-medium resize-none leading-relaxed"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center justify-center gap-2 group"
            >
              <Send className="w-4 h-4 fill-white group-hover:translate-x-0.5 transition-transform" />
              <span>Send Direct WhatsApp Message</span>
            </button>
          </form>
        </div>

      </div>

      {/* Allied Web Portals by Raghav Bansal */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
            <Globe className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>More Educational Platforms by Raghav Bansal</span>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
            Open Access
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a
            href="https://main-portal-ncc-01.vercel.app/#/home"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60 hover:border-amber-400 dark:hover:border-amber-600 transition flex items-center justify-between group shadow-2xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  NCC Prep Portal
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  CBT Tests & Study Notes for NCC Cadets
                </p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition" />
          </a>

          <div className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 opacity-85 flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-200 dark:border-amber-800">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-xs text-slate-800 dark:text-slate-200">
                    COAET Student's Corner
                  </h3>
                  <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-800">
                    Under Dev
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  Currently offline for testing and feature development • Launching soon
                </p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-1 rounded-md border border-amber-200 dark:border-amber-800">
              Disabled
            </span>
          </div>
        </div>
      </div>

      {/* Legal, Intellectual Property & Fair Dealing Statement */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-xs space-y-3">
        <div className="flex items-center gap-2 pb-2.5 border-b border-slate-100 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
          <Scale className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Official Disclaimer &amp; Fair Dealing Compliance</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 text-xs">
              <Shield className="w-3.5 h-3.5 text-blue-500" />
              <span>Independent Platform &amp; Non-Affiliation</span>
            </h4>
            <p className="text-[11px]">
              GATE is conducted by IITs &amp; IISc on behalf of the National Coordination Board (NCB)-GATE, Department of Higher Education, Ministry of Education, Government of India. This website is an independent educational platform created by Raghav Bansal (B.Tech Agricultural Engineering, Batch 2024, COAET CCS HAU Hisar) and is <strong>not affiliated with or endorsed by IITs, IISc, or the Ministry of Education</strong>.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 text-xs">
              <Scale className="w-3.5 h-3.5 text-emerald-500" />
              <span>Fair Dealing (Sec 52, Indian Copyright Act 1957)</span>
            </h4>
            <p className="text-[11px]">
              Past question papers and keys are the property of NCB-GATE / Organizing IITs, referenced here under <strong>Section 52(1)(a) &amp; (h)</strong> for non-commercial student study and examination preparation. All solutions, CBT algorithms, formula compendiums, and analytics are transformative original educational works.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
