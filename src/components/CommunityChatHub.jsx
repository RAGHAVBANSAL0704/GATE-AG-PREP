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
  Clock,
  Flag,
  Image as ImageIcon,
  Paperclip,
  X,
  CornerDownRight,
  ShieldAlert,
  CheckCircle2,
  FileText
} from 'lucide-react';
import MathRenderer from './MathRenderer';
import { validateCleanInput, sanitizeText } from '../utils/profanityFilter';
import { saveToIDB, getAllFromIDB } from '../utils/indexedDB';
import { 
  canModerate, 
  isUserBanned, 
  banUser, 
  muteUser, 
  isUserMuted, 
  flagMessage, 
  getFlaggedMessages, 
  resolveFlaggedMessage, 
  logModerationAction,
  getModerationAuditLog 
} from '../services/userRoleService';

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

export default function CommunityChatHub({ currentStudent, onRequireAuth }) {
  const [activeChannel, setActiveChannel] = useState('general-lounge');
  const [messages, setMessages] = useState(DEFAULT_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [moderationError, setModerationError] = useState('');
  const [actionNotice, setActionNotice] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [imageAttachment, setImageAttachment] = useState(null);
  const [isModQueueOpen, setIsModQueueOpen] = useState(false);
  const [flaggedQueue, setFlaggedQueue] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [cooldownSec, setCooldownSec] = useState(0);
  const [reportingMsgId, setReportingMsgId] = useState(null);
  const [reportReason, setReportReason] = useState('Inappropriate Language');

  const fileInputRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const hasModPerks = canModerate(currentStudent);
  const isBanned = isUserBanned(currentStudent);
  const muteStatus = isUserMuted(currentStudent);

  useEffect(() => {
    async function loadChat() {
      const saved = await getAllFromIDB('chat_messages');
      if (Array.isArray(saved) && saved.length > 0) {
        setMessages([...saved, ...DEFAULT_MESSAGES]);
      }
    }
    loadChat();
    refreshModQueue();
  }, []);

  const refreshModQueue = () => {
    setFlaggedQueue(getFlaggedMessages());
    setAuditLogs(getModerationAuditLog());
  };

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, activeChannel]);

  // Anti-spam cooldown timer countdown
  useEffect(() => {
    if (cooldownSec > 0) {
      const timer = setTimeout(() => setCooldownSec(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldownSec]);

  // Image Upload handler with canvas thumbnail compression
  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setModerationError('Please select a valid image file (PNG, JPG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const scaleSize = MAX_WIDTH / img.width;
        canvas.width = Math.min(img.width, MAX_WIDTH);
        canvas.height = img.width > MAX_WIDTH ? img.height * scaleSize : img.height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.75);
        setImageAttachment(compressedBase64);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    setModerationError('');
    setActionNotice('');

    if (isBanned) {
      setModerationError('Your account is restricted from posting due to community moderation.');
      return;
    }

    if (muteStatus.isMuted) {
      setModerationError(`Your account is temporarily muted for ${muteStatus.remainingMinutes} more minutes. Reason: ${muteStatus.reason}`);
      return;
    }

    if (cooldownSec > 0) {
      setModerationError(`Anti-spam: please wait ${cooldownSec}s before sending another message.`);
      return;
    }

    if (!inputText.trim() && !imageAttachment) return;

    // Strict Profanity & Abusive Language Validation
    if (inputText.trim()) {
      const val = validateCleanInput(inputText, 'Chat Message');
      if (!val.isValid) {
        setModerationError(val.message);
        return;
      }
    }

    const senderName = currentStudent?.display_name || currentStudent?.full_name || currentStudent?.username || 'GATE Aspirant';
    const userRole = (currentStudent?.role || (currentStudent?.is_faculty ? 'faculty' : 'student')).toLowerCase();

    const newMsgObj = {
      id: 'chat_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      channel: activeChannel,
      sender: senderName,
      senderId: currentStudent?.id || currentStudent?.username || currentStudent?.email || null,
      role: userRole,
      department: currentStudent?.department || null,
      contributorBadge: currentStudent?.contributor_badge || (userRole === 'solver' ? 'Verified Solver' : (userRole === 'faculty' ? 'Faculty Contributor' : null)),
      photoUrl: currentStudent?.profile_photo_url || null,
      verified: Boolean(currentStudent?.student_type === 'hau' || currentStudent?.admission_no || currentStudent?.is_faculty),
      text: sanitizeText(inputText.trim()),
      replyTo: replyingTo ? { id: replyingTo.id, sender: replyingTo.sender, text: replyingTo.text?.substring(0, 70) } : null,
      imageUrl: imageAttachment || null,
      timestamp: new Date().toISOString(),
      upvotes: 0
    };

    const updated = [...messages, newMsgObj];
    setMessages(updated);
    await saveToIDB('chat_messages', newMsgObj);
    setInputText('');
    setReplyingTo(null);
    setImageAttachment(null);
    setCooldownSec(3); // 3-second anti-spam rate limiter
  };

  const handleUpvoteMsg = (msgId) => {
    setMessages(messages.map(m => m.id === msgId ? { ...m, upvotes: m.upvotes + 1 } : m));
  };

  // Student: Report message
  const handleReportMessage = (msgId) => {
    const targetMsg = messages.find(m => m.id === msgId);
    if (!targetMsg) return;

    flagMessage({
      messageId: msgId,
      messageText: targetMsg.text,
      authorName: targetMsg.sender,
      flaggedBy: currentStudent?.full_name || currentStudent?.username || 'Student',
      reason: reportReason
    });

    setReportingMsgId(null);
    setActionNotice('Message flagged for moderator review. Thank you for keeping our study space clean!');
    setTimeout(() => setActionNotice(''), 3500);
    refreshModQueue();
  };

  // Moderation: Delete message
  const handleDeleteMessage = async (msgId, reason = 'Rule Violation / Inappropriate') => {
    const targetMsg = messages.find(m => m.id === msgId);
    const updated = messages.filter(m => m.id !== msgId);
    setMessages(updated);
    
    logModerationAction({
      actorName: currentStudent?.full_name || currentStudent?.username || 'Solver',
      actorRole: currentStudent?.role || 'Solver',
      action: 'DELETE_MESSAGE',
      targetUser: targetMsg?.sender || 'Unknown',
      targetMessage: targetMsg?.text || '',
      reason
    });

    resolveFlaggedMessage(msgId, 'RESOLVED_DELETED');
    setActionNotice("Message deleted and logged in audit trail.");
    setTimeout(() => setActionNotice(''), 3000);
    refreshModQueue();
  };

  // Moderation: Mute User 24h
  const handleMuteUser = (msg, hours = 24) => {
    muteUser({
      id: msg.senderId || null,
      username: msg.sender,
      full_name: msg.sender
    }, hours, 'Inappropriate or spam conduct in chat');

    logModerationAction({
      actorName: currentStudent?.full_name || currentStudent?.username || 'Solver',
      actorRole: currentStudent?.role || 'Solver',
      action: `MUTE_USER_${hours}H`,
      targetUser: msg.sender,
      targetMessage: msg.text,
      reason: `Timed timeout for ${hours} hours`
    });

    setActionNotice(`User "${msg.sender}" muted for ${hours} hours.`);
    setTimeout(() => setActionNotice(''), 3500);
    refreshModQueue();
  };

  // Moderation: Ban abusive sender
  const handleBanUser = (msg) => {
    if (!window.confirm(`Are you sure you want to block/ban "${msg.sender}" for inappropriate or abusive content?`)) return;
    banUser({
      id: msg.senderId || null,
      username: msg.sender,
      full_name: msg.sender
    }, 'Inappropriate or abusive language in chat');
    
    logModerationAction({
      actorName: currentStudent?.full_name || currentStudent?.username || 'Solver',
      actorRole: currentStudent?.role || 'Solver',
      action: 'BAN_USER',
      targetUser: msg.sender,
      targetMessage: msg.text,
      reason: 'Permanent ban for offensive conduct'
    });

    setActionNotice(`User "${msg.sender}" has been permanently banned.`);
    setTimeout(() => setActionNotice(''), 3500);
    refreshModQueue();
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

        {/* Solver / Mod Tools Strip */}
        {hasModPerks && (
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <button
              onClick={() => { refreshModQueue(); setIsModQueueOpen(true); }}
              className="w-full py-2 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/30 text-xs font-bold flex items-center justify-between cursor-pointer transition"
            >
              <div className="flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Mod Queue & Audit</span>
              </div>
              {flaggedQueue.length > 0 && (
                <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-mono flex items-center justify-center font-bold">
                  {flaggedQueue.length}
                </span>
              )}
            </button>
          </div>
        )}

        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-[11px] text-slate-500 dark:text-slate-400">
          <div className="font-bold uppercase tracking-wider text-[10px] text-slate-700 dark:text-slate-300">Community Rules</div>
          <div>✅ Respect fellow GATE AG aspirants</div>
          <div>🚫 Zero tolerance for abusive words</div>
          <div>📸 Share diagram & LaTeX formulas</div>
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
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center gap-1">
                <Zap className="w-3 h-3" />
                <span>Moderator Shield</span>
              </span>
            )}
            <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 font-bold">
              {channelMessages.length} Messages
            </span>
          </div>
        </div>

        {/* Action Notice (Deleted / Banned / Flagged feedback) */}
        {actionNotice && (
          <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/60 border-b border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
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
                  className={`p-3.5 rounded-2xl border transition-all text-xs space-y-2 ${
                    isFacultyMsg
                      ? 'bg-slate-50/90 dark:bg-slate-900/90 border-indigo-200/60 dark:border-indigo-800/50'
                      : (isSolverMsg 
                          ? 'bg-slate-50/90 dark:bg-slate-900/90 border-amber-200/60 dark:border-amber-800/50'
                          : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/60')
                  }`}
                >
                  {/* Threaded Quoted Message if present */}
                  {msg.replyTo && (
                    <div className="p-2 rounded-xl bg-black/5 dark:bg-white/5 border-l-2 border-emerald-500 text-[11px] text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                      <CornerDownRight className="w-3 h-3 text-emerald-500 shrink-0" />
                      <span className="font-bold text-slate-900 dark:text-slate-200">{msg.replyTo.sender}:</span>
                      <span className="truncate">{msg.replyTo.text}</span>
                    </div>
                  )}

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
                        <span className="inline-flex items-center gap-0.5 text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                          <Award className="w-2.5 h-2.5" />
                          <span>{msg.role === 'mentor' ? 'Faculty Mentor' : 'Faculty'}</span>
                        </span>
                      )}

                      {isSolverMsg && (
                        <span className="inline-flex items-center gap-0.5 text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                          <Zap className="w-2.5 h-2.5" />
                          <span>Solver</span>
                        </span>
                      )}

                      {isAdminMsg && (
                        <span className="inline-flex items-center gap-0.5 text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800">
                          <span>Admin</span>
                        </span>
                      )}

                      {msg.department && (
                        <span className="text-[9px] font-mono text-slate-500">
                          [{msg.department.replace(/ \(.+\)/, '')}]
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>

                      {/* Student: Report Flag */}
                      {!hasModPerks && msg.sender !== currentStudent?.full_name && (
                        <button
                          onClick={() => setReportingMsgId(reportingMsgId === msg.id ? null : msg.id)}
                          className="p-1 text-slate-400 hover:text-rose-500 transition cursor-pointer"
                          title="Report this message"
                        >
                          <Flag className="w-3 h-3" />
                        </button>
                      )}

                      {/* Solver / Moderator Tools: Delete, Mute 24h, Ban */}
                      {hasModPerks && (
                        <div className="flex items-center gap-1 opacity-70 hover:opacity-100 transition">
                          <button
                            onClick={() => handleDeleteMessage(msg.id)}
                            className="p-1 rounded hover:bg-rose-50 dark:hover:bg-rose-950 text-rose-500 transition cursor-pointer"
                            title="Delete inappropriate message"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>

                          {msg.role !== 'admin' && (
                            <>
                              <button
                                onClick={() => handleMuteUser(msg, 24)}
                                className="p-1 rounded hover:bg-amber-50 dark:hover:bg-amber-950 text-amber-600 transition cursor-pointer"
                                title="Mute user for 24 hours"
                              >
                                <Clock className="w-3 h-3" />
                              </button>
                              
                              <button
                                onClick={() => handleBanUser(msg)}
                                className="p-1 rounded hover:bg-rose-50 dark:hover:bg-rose-950 text-rose-600 transition cursor-pointer"
                                title="Permanent ban / block"
                              >
                                <Ban className="w-3 h-3" />
                              </button>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Inline Report Reason Box */}
                  {reportingMsgId === msg.id && (
                    <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 flex items-center justify-between gap-2 animate-in fade-in">
                      <div className="flex items-center gap-2 flex-1">
                        <span className="text-[10px] font-bold text-rose-700 dark:text-rose-300">Reason:</span>
                        <select
                          value={reportReason}
                          onChange={(e) => setReportReason(e.target.value)}
                          className="text-[11px] p-1 rounded bg-white dark:bg-slate-900 border border-rose-300 text-slate-800 dark:text-slate-200 outline-none"
                        >
                          <option value="Inappropriate Language">Inappropriate Language</option>
                          <option value="Spam / Promotion">Spam / Promotion</option>
                          <option value="Incorrect / Misleading">Incorrect / Misleading</option>
                          <option value="Harassment">Harassment</option>
                        </select>
                      </div>
                      <button
                        onClick={() => handleReportMessage(msg.id)}
                        className="px-2 py-0.5 bg-rose-600 hover:bg-rose-500 text-white rounded text-[10px] font-bold cursor-pointer"
                      >
                        Submit Flag
                      </button>
                    </div>
                  )}

                  {/* Attached Diagram / Image if present */}
                  {msg.imageUrl && (
                    <div className="my-1.5 max-w-sm rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-950/5">
                      <img src={msg.imageUrl} alt="Attached Diagram" className="max-h-60 w-auto object-contain rounded-lg" />
                    </div>
                  )}

                  {/* Clean text styling with LaTeX Math */}
                  <div className="text-slate-900 dark:text-slate-100 font-medium leading-relaxed">
                    <MathRenderer content={msg.text} />
                  </div>

                  <div className="pt-1 flex items-center justify-between text-[10px]">
                    <button
                      onClick={() => setReplyingTo(msg)}
                      className="flex items-center gap-1 text-slate-500 hover:text-emerald-600 font-bold transition cursor-pointer"
                    >
                      <CornerDownRight className="w-3 h-3" />
                      <span>Reply</span>
                    </button>

                    <button
                      onClick={() => handleUpvoteMsg(msg.id)}
                      className="flex items-center gap-1 font-bold text-slate-500 hover:text-emerald-600 transition cursor-pointer"
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

        {/* Input Form, Reply Preview & Moderation Status */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 space-y-2">
          {isBanned ? (
            <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold flex items-center gap-2">
              <Ban className="w-4 h-4 text-rose-500 shrink-0" />
              <span>Your account is permanently restricted from chatting due to administrative moderation.</span>
            </div>
          ) : muteStatus.isMuted ? (
            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-bold flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Account temporarily muted for {muteStatus.remainingMinutes}m. Reason: {muteStatus.reason}</span>
            </div>
          ) : (
            <>
              {/* Replying Banner */}
              {replyingTo && (
                <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-between text-xs animate-in fade-in">
                  <div className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300 min-w-0">
                    <CornerDownRight className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="font-bold">Replying to {replyingTo.sender}:</span>
                    <span className="truncate text-slate-600 dark:text-slate-400">{replyingTo.text}</span>
                  </div>
                  <button onClick={() => setReplyingTo(null)} className="text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Image Preview Banner */}
              {imageAttachment && (
                <div className="relative inline-block border border-slate-300 dark:border-slate-700 rounded-xl overflow-hidden p-1 bg-white dark:bg-slate-900">
                  <img src={imageAttachment} alt="Preview" className="h-16 w-auto rounded-lg object-contain" />
                  <button 
                    onClick={() => setImageAttachment(null)}
                    className="absolute top-1 right-1 p-0.5 rounded-full bg-black/60 text-white hover:bg-black cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}

              {moderationError && (
                <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 text-rose-700 dark:text-rose-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                  <span>{moderationError}</span>
                </div>
              )}

              {!currentStudent ? (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs">
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    👋 You are browsing this study channel in <strong>Guest Preview Mode</strong>.
                  </div>
                  <button
                    type="button"
                    onClick={() => onRequireAuth?.("Sign In or Register free to participate in live community chats and discuss with peers!")}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shrink-0 cursor-pointer shadow-xs transition"
                  >
                    Sign In to Chat
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageSelect}
                    accept="image/*"
                    className="hidden"
                  />
                  
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 transition cursor-pointer"
                    title="Attach Diagram / Working Photo"
                  >
                    <Paperclip className="w-4 h-4" />
                  </button>

                  <input
                    type="text"
                    placeholder={`Message #${activeChannel}... (LaTeX $E=mc^2$ supported)`}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white font-medium outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  
                  <button
                    type="submit"
                    disabled={(!inputText.trim() && !imageAttachment) || cooldownSec > 0}
                    className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-extrabold text-xs transition flex items-center gap-1 cursor-pointer shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{cooldownSec > 0 ? `${cooldownSec}s` : 'Send'}</span>
                  </button>
                </form>
              )}
            </>
          )}
        </div>

      </div>

      {/* Moderation Queue & Audit Log Modal for Solvers & Admins */}
      {isModQueueOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
          <div 
            className="w-full max-w-2xl max-h-[85vh] rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden p-6 space-y-4 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-500" />
                <div>
                  <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">Moderation Queue & Audit Log</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Review reported messages and inspect logged moderator actions</p>
                </div>
              </div>
              <button onClick={() => setIsModQueueOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-1">
              {/* Flagged Messages */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Pending Reported Messages ({flaggedQueue.length})
                </h4>
                {flaggedQueue.length === 0 ? (
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500">
                    🎉 All clean! No pending reported messages.
                  </div>
                ) : (
                  flaggedQueue.map(f => (
                    <div key={f.id} className="p-3.5 rounded-2xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-rose-900 dark:text-rose-200">Author: {f.authorName}</span>
                        <span className="text-[10px] font-mono text-rose-600">Flagged by {f.flaggedBy}</span>
                      </div>
                      <div className="p-2 rounded bg-white dark:bg-slate-900 border border-rose-100 text-slate-800 dark:text-slate-200">
                        "{f.messageText}"
                      </div>
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[10px] text-slate-500">Reason: {f.reasons?.join(', ')}</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => { resolveFlaggedMessage(f.messageId, 'DISMISSED'); refreshModQueue(); }}
                            className="px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-700 dark:text-slate-300 font-bold text-[11px] cursor-pointer"
                          >
                            Dismiss
                          </button>
                          <button
                            onClick={() => handleDeleteMessage(f.messageId, f.reasons?.join(', '))}
                            className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-[11px] cursor-pointer"
                          >
                            Delete Message
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Audit Trail */}
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Recent Moderation Actions (Audit Trail)
                </h4>
                {auditLogs.length === 0 ? (
                  <div className="p-3 text-center text-xs text-slate-400">No moderation actions recorded yet.</div>
                ) : (
                  <div className="space-y-1.5 max-h-48 overflow-y-auto">
                    {auditLogs.slice(0, 15).map(log => (
                      <div key={log.id} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[11px] flex items-center justify-between">
                        <div>
                          <span className="font-bold text-emerald-600 dark:text-emerald-400">{log.actorName}</span> ({log.actorRole}): <strong className="text-slate-900 dark:text-white">{log.action}</strong> on <em>{log.targetUser}</em>
                          <div className="text-[10px] text-slate-500">Reason: {log.reason}</div>
                        </div>
                        <span className="text-[9px] font-mono text-slate-400 shrink-0">
                          {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setIsModQueueOpen(false)}
                className="px-4 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-bold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
