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
  CreditCard
} from 'lucide-react';

export default function SupportPage({ currentStudent }) {
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [requestedExamName, setRequestedExamName] = useState('');
  const [requestedExamNotes, setRequestedExamNotes] = useState('');

  const upiId = "raghavbansal0704@oksbi";
  const whatsappNumber = "919466810704"; // Raghav Bansal WhatsApp contact

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleDirectUpiPay = (amount = null) => {
    let url = `upi://pay?pa=${upiId}&pn=${encodeURIComponent('GATE AG Prep Mission')}&cu=INR`;
    if (amount) {
      url += `&am=${amount}`;
    }

    try {
      const link = document.createElement('a');
      link.href = url;
      link.click();
    } catch (err) {
      console.warn("UPI protocol launch note:", err);
    }

    // Auto-copy UPI ID to clipboard as instant fallback
    navigator.clipboard.writeText(upiId);
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
        
        {/* Left Column: Direct UPI Support */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 space-y-4 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800">
              <Coffee className="w-4 h-4 text-emerald-500 shrink-0" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Support Server & Hosting Costs
              </h2>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 dark:text-slate-300">Official UPI ID</span>
                <span className="text-[10px] font-mono text-slate-400">GPay / PhonePe / Paytm</span>
              </div>

              {/* UPI Field */}
              <div className="flex items-center gap-2">
                <div className="flex-1 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-mono font-bold text-slate-900 dark:text-slate-100 truncate selection:bg-emerald-500 selection:text-white">
                  {upiId}
                </div>
                <button
                  onClick={handleCopyUpi}
                  className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center gap-1.5 shrink-0 shadow-xs"
                >
                  {copiedUpi ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedUpi ? 'Copied!' : 'Copy UPI'}</span>
                </button>
              </div>

              {/* Direct UPI App Launch Button */}
              <button
                onClick={() => handleDirectUpiPay()}
                className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-md transition flex items-center justify-center gap-2"
              >
                <CreditCard className="w-4 h-4 text-white" />
                <span>Pay via UPI App (GPay / PhonePe / Paytm)</span>
                <ExternalLink className="w-3.5 h-3.5 text-blue-200" />
              </button>

              {/* Preset 1-Click Contribution Pay Chips */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold pt-1">
                <button
                  onClick={() => handleDirectUpiPay(50)}
                  className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 transition text-left sm:text-center"
                >
                  <div className="text-emerald-600 dark:text-emerald-400 font-extrabold text-xs">₹50</div>
                  <div className="text-[9px] text-slate-400 font-normal mt-0.5">Pay ₹50</div>
                </button>

                <button
                  onClick={() => handleDirectUpiPay(100)}
                  className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition text-left sm:text-center"
                >
                  <div className="text-blue-600 dark:text-blue-400 font-extrabold text-xs">₹100</div>
                  <div className="text-[9px] text-slate-400 font-normal mt-0.5">Pay ₹100</div>
                </button>

                <button
                  onClick={() => handleDirectUpiPay(250)}
                  className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-500 transition text-left sm:text-center"
                >
                  <div className="text-purple-600 dark:text-purple-400 font-extrabold text-xs">₹250</div>
                  <div className="text-[9px] text-slate-400 font-normal mt-0.5">Pay ₹250</div>
                </button>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-[11px] space-y-1 text-slate-600 dark:text-slate-300 mt-3">
            <div className="font-bold text-blue-900 dark:text-blue-200 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
              <span>100% Free Guarantee</span>
            </div>
            <p>
              This portal will remain free forever for all students. Optional contributions help cover domain & hosting bandwidth.
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
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-slate-100 outline-none text-xs focus:ring-1 focus:ring-emerald-500 font-medium"
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
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-slate-100 outline-none text-xs focus:ring-1 focus:ring-emerald-500 font-medium resize-none"
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

    </div>
  );
}
