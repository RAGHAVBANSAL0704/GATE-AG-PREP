import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  Send, 
  Hash, 
  ThumbsUp, 
  AlertCircle, 
  Sparkles, 
  User, 
  ShieldCheck, 
  Award, 
  Zap, 
  Trash2, 
  Ban, 
  CheckCircle2 
} from 'lucide-react';
import MathRenderer from './MathRenderer';
import { validateCleanInput, sanitizeText } from '../utils/profanityFilter';
import { saveToIDB, getAllFromIDB } from '../utils/indexedDB';
import { canModerate, isUserBanned, banUser } from '../services/userRoleService';

const CHANNELS = [
  { id: 'general-lounge', name: 'general-lounge', label: '💬 General Lounge' },
  { id: 'gate-ag-2027', name: 'gate-ag-2027', label: '🎯 GATE AG 2027 Target' },
  { id: 'doubts-and-maths', name: 'doubts-and-maths', label: '📐 Doubts & Engineering Maths' },
  { id: 'fmp-machinery', name: 'fmp-machinery', label: '🚜 Farm Machinery & Power' },
  { id: 'apfe-processing', name: 'apfe-processing', label: '🌾 Food & Process Engineering' }
];

const DEFAULT_MESSAGES = [
  {
    id: 'chat_1',
    channel: 'general-lounge',
    sender: 'Raghav Bansal',
    role: 'admin',
    contributorBadge: 'Creator & Lead Developer',
    verified: true,
    text: 'Welcome to the official GATE AG Prep Community Chat! Ask questions, share shortcuts, and study together.',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    upvotes: 8
  },
  {
    id: 'chat_2',
    channel: 'doubts-and-maths',
    sender: 'Dr. Rajesh Kumar',
    role: 'faculty',
    department: 'FMPE',
    verified: true,
    text: 'For 3x3 matrices in GATE Engineering Mathematics, remember $\\text{Trace}(A) = \\sum \\lambda_i$ and $\\det(A) = \\prod \\lambda_i$. This solves 80% of eigenvalue MCQs in 10 seconds.',
    timestamp: new Date(Date.now() - 2400000).toISOString(),
    upvotes: 14
  },
  {
    id: 'chat_3',
    channel: 'doubts-and-maths',
    sender: 'Ankit_HAU',
    role: 'solver',
    contributorBadge: 'Verified Solver',
    verified: true,
    text: 'Also remember that for symmetric matrices, eigenvalues are always real numbers!',
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    upvotes: 6
  }
];

export default function CommunityChatHub({ currentStudent }) {
  const [activeChannel, setActiveChannel] = useState('general-lounge');
  const [messages, setMessages] = useState(DEFAULT_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [moderationError, setModerationError] = useState('');
  const [actionNotice, setActionNotice] = useState('');
  const messagesContainerRef = useRef(null);

  const hasModPerks = canModerate(currentStudent);
  const isBanned = isUserBanned(currentStudent);

  useEffect(() => {
    async function loadChat() {
      const saved = await getAllFromIDB('chat_messages');
      if (Array.isArray(saved) && saved.length > 0) {
        setMessages([...saved, ...DEFAULT_MESSAGES]);
      }
    }
    loadChat();
  }, []);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, activeChannel]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    setModerationError('');
    setActionNotice('');

    if (isBanned) {
      setModerationError('Your account is restricted from posting due to community moderation.');
      return;
    }

    if (!inputText.trim()) return;

    // Strict Profanity & Abusive Language Validation
    const val = validateCleanInput(inputText, 'Chat Message');
    if (!val.isValid) {
      setModerationError(val.message);
      return;
    }

    const senderName = currentStudent?.display_name || currentStudent?.full_name || currentStudent?.username || 'GATE Aspirant';
    const userRole = (currentStudent?.role || (currentStudent?.is_faculty ? 'faculty' : 'student')).toLowerCase();

    const newMsgObj = {
      id: 'chat_' + Date.now(),
      channel: activeChannel,
      sender: senderName,
      senderId: currentStudent?.id || currentStudent?.username || currentStudent?.email || null,
      role: userRole,
      department: currentStudent?.department || null,
      contributorBadge: currentStudent?.contributor_badge || (userRole === 'solver' ? 'Verified Solver' : (userRole === 'faculty' ? 'Faculty Contributor' : null)),
      photoUrl: currentStudent?.profile_photo_url || null,
      verified: Boolean(currentStudent?.student_type === 'hau' || currentStudent?.admission_no || currentStudent?.is_faculty),
      text: sanitizeText(inputText.trim()),
      timestamp: new Date().toISOString(),
      upvotes: 0
    };

    const updated = [...messages, newMsgObj];
    setMessages(updated);
    await saveToIDB('chat_messages', newMsgObj);
    setInputText('');
  };

  const handleUpvoteMsg = (msgId) => {
    setMessages(messages.map(m => m.id === msgId ? { ...m, upvotes: m.upvotes + 1 } : m));
  };

  // Moderation: Delete message (Available to Solvers, Mentors, Admins)
  const handleDeleteMessage = async (msgId) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    const updated = messages.filter(m => m.id !== msgId);
    setMessages(updated);
    setActionNotice("Message deleted by Moderator.");
    setTimeout(() => setActionNotice(''), 3000);
  };

  // Moderation: Ban abusive sender (Available to Solvers, Mentors, Admins)
  const handleBanUser = (msg) => {
    if (!window.confirm(`Are you sure you want to block/ban "${msg.sender}" for inappropriate or abusive content?`)) return;
    banUser({
      id: msg.senderId || null,
      username: msg.sender,
      full_name: msg.sender
    }, 'Inappropriate or abusive language in chat');
    
    setActionNotice(`User "${msg.sender}" has been banned from community interactions.`);
    setTimeout(() => setActionNotice(''), 3500);
  };

  const channelMessages = messages.filter(m => m.channel === activeChannel);

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 animate-in fade-in duration-200">
      
      {/* Sidebar Channels Control */}
      <div className="md:col-span-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 space-y-4 shadow-xs">
        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <MessageSquare className="w-4 h-4 text-emerald-500" />
          <h2 className="font-extrabold text-xs uppercase tracking-wider text-slate-900 dark:text-white">Chat Channels</h2>
        </div>

        <div className="flex flex-row overflow-x-auto md:flex-col gap-1 pb-2 md:pb-0">
          {CHANNELS.map(ch => (
            <button
              key={ch.id}
              onClick={() => { setActiveChannel(ch.id); setModerationError(''); }}
              className={`text-left px-3.5 py-2.5 rounded-2xl text-xs font-bold transition flex items-center justify-between shrink-0 cursor-pointer ${
                activeChannel === ch.id
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span>{ch.label}</span>
            </button>
          ))}
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2 text-[11px] text-slate-400">
          <div className="font-bold uppercase tracking-wider text-[10px] text-slate-500">Community Rules</div>
          <div>✅ Respect fellow GATE AG aspirants</div>
          <div>🚫 Zero tolerance for abusive words</div>
          {hasModPerks && (
            <div className="pt-2 text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" />
              <span>Moderator Perks Enabled</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Chat Feed */}
      <div className="md:col-span-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl flex flex-col h-[600px] shadow-xs overflow-hidden">
        
        {/* Chat Room Header */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Hash className="w-4 h-4 text-emerald-500" />
            <span className="font-extrabold text-sm text-slate-900 dark:text-white">
              {CHANNELS.find(c => c.id === activeChannel)?.label}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {hasModPerks && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center gap-1">
                <Zap className="w-3 h-3" />
                <span>Solver Shield Active</span>
              </span>
            )}
            <span className="text-[11px] font-mono text-slate-400 font-bold">
              {channelMessages.length} Messages
            </span>
          </div>
        </div>

        {/* Action Notice (Deleted / Banned feedback) */}
        {actionNotice && (
          <div className="p-2.5 bg-amber-50 dark:bg-amber-950/60 border-b border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>{actionNotice}</span>
          </div>
        )}

        {/* Message Feed Container */}
        <div ref={messagesContainerRef} className="flex-1 p-4 space-y-3.5 overflow-y-auto">
          {channelMessages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 text-xs space-y-2">
              <MessageSquare className="w-8 h-8 opacity-40" />
              <div>No messages in #{activeChannel} yet. Be the first to start the discussion!</div>
            </div>
          ) : (
            channelMessages.map(msg => {
              const isFacultyMsg = msg.role === 'faculty' || msg.role === 'mentor' || (msg.sender && (msg.sender.startsWith('Dr.') || msg.sender.startsWith('Prof.') || msg.sender.startsWith('Er.')));
              const isSolverMsg = msg.role === 'solver';
              const isAdminMsg = msg.role === 'admin';

              return (
                <div 
                  key={msg.id} 
                  className={`p-3.5 rounded-2xl border transition-all text-xs space-y-1.5 ${
                    isFacultyMsg
                      ? 'bg-slate-50/90 dark:bg-slate-900/90 border-indigo-200/60 dark:border-indigo-800/50'
                      : (isSolverMsg 
                          ? 'bg-slate-50/90 dark:bg-slate-900/90 border-amber-200/60 dark:border-amber-800/50'
                          : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/60')
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-wrap">
                      
                      {/* Avatar with subtle ring for Faculty & Solvers */}
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold overflow-hidden shrink-0 ${
                        isFacultyMsg 
                          ? 'bg-indigo-600 text-white ring-1 ring-indigo-400/50' 
                          : (isSolverMsg ? 'bg-amber-500 text-white ring-1 ring-amber-400/50' : 'bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-200')
                      }`}>
                        {msg.photoUrl ? (
                          <img src={msg.photoUrl} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                          isFacultyMsg ? <Award className="w-3 h-3" /> : (isSolverMsg ? <Zap className="w-3 h-3" /> : (msg.sender?.[0] || 'U'))
                        )}
                      </div>

                      <span className={`font-bold ${
                        isFacultyMsg 
                          ? 'text-indigo-900 dark:text-indigo-200' 
                          : (isSolverMsg ? 'text-amber-900 dark:text-amber-200' : 'text-slate-900 dark:text-white')
                      }`}>
                        {msg.sender}
                      </span>

                      {/* Distinguished Badges */}
                      {isFacultyMsg && (
                        <span className="inline-flex items-center gap-0.5 text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                          <Award className="w-2.5 h-2.5" />
                          <span>{msg.role === 'mentor' ? 'Faculty Mentor' : 'Faculty'}</span>
                        </span>
                      )}

                      {isSolverMsg && (
                        <span className="inline-flex items-center gap-0.5 text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                          <Zap className="w-2.5 h-2.5" />
                          <span>Solver</span>
                        </span>
                      )}

                      {isAdminMsg && (
                        <span className="inline-flex items-center gap-0.5 text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800">
                          <span>Admin</span>
                        </span>
                      )}

                      {msg.department && (
                        <span className="text-[9px] font-mono text-slate-400">
                          [{msg.department.replace(/ \(.+\)/, '')}]
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400 font-mono">
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>

                      {/* Solver / Moderator Tools: Delete & Ban */}
                      {hasModPerks && (
                        <div className="flex items-center gap-1 opacity-60 hover:opacity-100 transition">
                          <button
                            onClick={() => handleDeleteMessage(msg.id)}
                            className="p-1 rounded-md hover:bg-rose-50 dark:hover:bg-rose-950 text-rose-500 transition"
                            title="Delete inappropriate message"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                          
                          {msg.role !== 'admin' && (
                            <button
                              onClick={() => handleBanUser(msg)}
                              className="p-1 rounded-md hover:bg-rose-50 dark:hover:bg-rose-950 text-rose-600 transition"
                              title="Ban / Block abusive sender"
                            >
                              <Ban className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Clean text styling */}
                  <div className="text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                    <MathRenderer content={msg.text} />
                  </div>

                  <div className="pt-1 flex items-center justify-end">
                    <button
                      onClick={() => handleUpvoteMsg(msg.id)}
                      className="flex items-center gap-1 text-[10px] font-bold text-slate-400 hover:text-emerald-500 transition cursor-pointer"
                    >
                      <ThumbsUp className="w-3 h-3" />
                      <span>{msg.upvotes > 0 ? msg.upvotes : ''}</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Input Form & Moderation Status */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 space-y-2">
          {isBanned ? (
            <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-bold flex items-center gap-2">
              <Ban className="w-4 h-4 text-rose-400 shrink-0" />
              <span>Your account is currently restricted from chatting due to administrative moderation.</span>
            </div>
          ) : (
            <>
              {moderationError && (
                <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 text-rose-600 text-xs font-bold flex items-center gap-2 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{moderationError}</span>
                </div>
              )}

              <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder={`Message #${activeChannel}... (LaTeX $E=mc^2$ supported)`}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white font-medium outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-extrabold text-xs transition flex items-center gap-1 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </form>
            </>
          )}
        </div>

      </div>

    </div>
  );
}
