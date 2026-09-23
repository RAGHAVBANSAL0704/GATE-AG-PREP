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
  Copy,
  Check,
  Search,
  Smile,
  Code2,
  ChevronDown,
  Pin,
  BarChart2,
  Timer,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  BookOpen,
  HelpCircle
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

export const PINNED_BANNERS = {
  'general-lounge': {
    title: 'GATE AG Lounge Rules & Mission 2027',
    text: 'Welcome! Keep discussions focused on Agricultural Engineering. Be courteous, share step-by-step methods, and verify formulas before posting.'
  },
  'gate-ag-2027': {
    title: 'GATE AG 2027 Target Milestones',
    text: 'Target 75+ Marks: General Aptitude (15M) + Engg Maths (13M) + FMPE (24M) + SWCE (24M) + APFE (24M). Daily target: 20 PYQs.'
  },
  'doubts-and-maths': {
    title: 'Engineering Mathematics Core Identities',
    text: 'Trace: $\\text{Tr}(A) = \\sum \\lambda_i$ | Determinant: $\\det(A) = \\prod \\lambda_i$ | Rank-Nullity: $\\text{Rank}(A) + \\text{Nullity}(A) = n$'
  },
  'fmp-machinery': {
    title: 'Farm Machinery & Tractor Kinematics',
    text: 'Draft: $D = C_s \\cdot w \\cdot d$ (N) | Drawbar Power: $P_{db} = D \\cdot v$ (kW) | Field Capacity: $C = \\frac{w \\cdot v \\cdot \\eta}{10}$ (ha/h)'
  },
  'swce-hydrology': {
    title: 'Soil & Water Conservation Core Equations',
    text: 'SCS-CN: $S = \\frac{25400}{CN} - 254$ mm | Runoff: $Q = \\frac{(P - 0.2S)^2}{P + 0.8S}$ (for $P > 0.2S$) | Rational: $Q_p = \\frac{C I A}{360}$ ($m^3/s$)'
  },
  'apfe-processing': {
    title: 'Food Engineering & Thermodynamics Formulas',
    text: 'Humid Heat: $h = 1.006t + w(2501 + 1.88t)$ kJ/kg | Page Model: $\\frac{M-M_e}{M_0-M_e} = \\exp(-kt^n)$ | Stoke\'s Law: $v_t = \\frac{g D^2 (\\rho_p - \\rho_f)}{18 \\mu}$'
  }
};

// Native Web Audio Synthesizer for offline ambient focus sound
class AmbientFocusAudio {
  constructor() {
    this.ctx = null;
    this.osc1 = null;
    this.osc2 = null;
    this.gain = null;
    this.isPlaying = false;
  }
  start() {
    if (this.isPlaying) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();
      this.gain = this.ctx.createGain();
      this.gain.gain.setValueAtTime(0.03, this.ctx.currentTime); // gentle calm volume

      // 432 Hz Alpha wave harmonic drone
      this.osc1 = this.ctx.createOscillator();
      this.osc1.type = 'sine';
      this.osc1.frequency.setValueAtTime(432, this.ctx.currentTime);

      this.osc2 = this.ctx.createOscillator();
      this.osc2.type = 'triangle';
      this.osc2.frequency.setValueAtTime(216, this.ctx.currentTime);

      this.osc1.connect(this.gain);
      this.osc2.connect(this.gain);
      this.gain.connect(this.ctx.destination);

      this.osc1.start();
      this.osc2.start();
      this.isPlaying = true;
    } catch (e) {
      console.warn("Web Audio not supported", e);
    }
  }
  stop() {
    if (!this.isPlaying) return;
    try {
      if (this.osc1) this.osc1.stop();
      if (this.osc2) this.osc2.stop();
      if (this.ctx) this.ctx.close();
    } catch (e) {}
    this.isPlaying = false;
  }
}

const CHANNELS = [
  { id: 'general-lounge', name: 'general-lounge', label: 'General Lounge', icon: '💬', desc: 'Syllabus strategy, exam tips & peer lounge' },
  { id: 'gate-ag-2027', name: 'gate-ag-2027', label: 'GATE AG 2027 Target', icon: '🎯', desc: 'Milestones, daily study schedules & PYQ discussions' },
  { id: 'doubts-and-maths', name: 'doubts-and-maths', label: 'Engg Maths & Calculus', icon: '📐', desc: 'Linear algebra, calculus, matrices & differential equations' },
  { id: 'fmp-machinery', name: 'fmp-machinery', label: 'Farm Machinery (FMPE)', icon: '🚜', desc: 'Tractor kinematics, moldboard plows, draft & field capacity' },
  { id: 'swce-hydrology', name: 'swce-hydrology', label: 'Soil & Water (SWCE)', icon: '💧', desc: 'Curve number, runoff, hydraulics & drip irrigation' },
  { id: 'apfe-processing', name: 'apfe-processing', label: 'Food Processing (APFE)', icon: '🌾', desc: 'Psychrometry, drying rates, rheology & heat transfer' }
];

const QUICK_REACTIONS = [
  { emoji: '👍', label: 'Helpful' },
  { emoji: '💡', label: 'Smart Trick' },
  { emoji: '🎯', label: 'Spot-on' },
  { emoji: '❓', label: 'Doubt' },
  { emoji: '🔥', label: 'Awesome' }
];

const MATH_SNIPPETS = [
  { label: '√x', latex: '\\sqrt{}' },
  { label: 'x²', latex: '^2' },
  { label: 'a/b', latex: '\\frac{}{}' },
  { label: 'λ', latex: '\\lambda' },
  { label: 'η', latex: '\\eta' },
  { label: 'Δ', latex: '\\Delta' },
  { label: 'Σ', latex: '\\sum' },
  { label: '∫', latex: '\\int' },
  { label: 'π', latex: '\\pi' },
  { label: '±', latex: '\\pm' },
  { label: 'θ', latex: '\\theta' },
  { label: 'ρ', latex: '\\rho' }
];

const DEFAULT_MESSAGES = [
  {
    id: 'chat_1',
    channel: 'general-lounge',
    sender: 'Raghav Bansal',
    role: 'admin',
    contributorBadge: 'Creator & Lead Developer',
    verified: true,
    text: 'Welcome to the official GATE AG Prep Community Lounge! Ask numerical doubts, share shortcuts, and study together.',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    upvotes: 8,
    reactions: { '👍': 8, '💡': 5 }
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
    upvotes: 14,
    reactions: { '💡': 14, '🎯': 9, '🔥': 6 }
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
    upvotes: 6,
    reactions: { '👍': 6, '🎯': 4 }
  },
  {
    id: 'chat_4',
    channel: 'swce-hydrology',
    sender: 'Er. Sunil Sharma',
    role: 'mentor',
    department: 'SWCE',
    verified: true,
    text: 'In SCS-CN method, maximum potential retention is $S = \\frac{25400}{CN} - 254$ when precipitation $P$ and $S$ are in millimeters. Always convert before squaring in $Q = \\frac{(P - 0.2S)^2}{P + 0.8S}$.',
    timestamp: new Date(Date.now() - 1200000).toISOString(),
    upvotes: 11,
    reactions: { '💡': 11, '🎯': 7 }
  }
];

export default function CommunityChatHub({ currentStudent, onRequireAuth }) {
  const [activeChannel, setActiveChannel] = useState('general-lounge');
  const [messages, setMessages] = useState(DEFAULT_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [moderationError, setModerationError] = useState('');
  const [actionNotice, setActionNotice] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [imageAttachment, setImageAttachment] = useState(null);
  const [showMathRibbon, setShowMathRibbon] = useState(false);
  const [copiedMsgId, setCopiedMsgId] = useState(null);
  const [activeReactionPickerMsgId, setActiveReactionPickerMsgId] = useState(null);
  const [isPinnedBannerExpanded, setIsPinnedBannerExpanded] = useState(true);

  // Live Poll State
  const [isPollModalOpen, setIsPollModalOpen] = useState(false);
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState(['', '']);

  // Pomodoro & Lofi Focus Lounge State
  const [pomodoroSeconds, setPomodoroSeconds] = useState(25 * 60);
  const [isPomodoroActive, setIsPomodoroActive] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioSynthRef = useRef(null);
  
  const [isModQueueOpen, setIsModQueueOpen] = useState(false);
  const [flaggedQueue, setFlaggedQueue] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [cooldownSec, setCooldownSec] = useState(0);
  const [reportingMsgId, setReportingMsgId] = useState(null);
  const [reportReason, setReportReason] = useState('Inappropriate Language');

  const fileInputRef = useRef(null);
  const inputFieldRef = useRef(null);
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

  // Pomodoro Countdown Timer
  useEffect(() => {
    let interval = null;
    if (isPomodoroActive && pomodoroSeconds > 0) {
      interval = setInterval(() => {
        setPomodoroSeconds(prev => prev - 1);
      }, 1000);
    } else if (pomodoroSeconds === 0) {
      setIsPomodoroActive(false);
      setActionNotice("🔔 Pomodoro Focus Session Complete! Great job. Take a 5-minute break.");
      setTimeout(() => setActionNotice(''), 5000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPomodoroActive, pomodoroSeconds]);

  const togglePomodoro = () => {
    setIsPomodoroActive(prev => !prev);
  };

  const resetPomodoro = () => {
    setIsPomodoroActive(false);
    setPomodoroSeconds(25 * 60);
  };

  // Toggle Ambient Audio Drone
  const toggleAmbientAudio = () => {
    if (!audioSynthRef.current) {
      audioSynthRef.current = new AmbientFocusAudio();
    }
    if (isAudioPlaying) {
      audioSynthRef.current.stop();
      setIsAudioPlaying(false);
    } else {
      audioSynthRef.current.start();
      setIsAudioPlaying(true);
    }
  };

  // Insert Math Symbol at cursor position
  const handleInsertMath = (snippet) => {
    const input = inputFieldRef.current;
    if (!input) {
      setInputText(prev => prev + ` $${snippet}$ `);
      return;
    }
    const start = input.selectionStart || 0;
    const end = input.selectionEnd || 0;
    const text = inputText;
    const mathStr = ` $${snippet}$ `;
    const updated = text.substring(0, start) + mathStr + text.substring(end);
    setInputText(updated);
    setTimeout(() => {
      input.focus();
      const nextPos = start + mathStr.length;
      input.setSelectionRange(nextPos, nextPos);
    }, 50);
  };

  // Image Upload handler with canvas WebP thumbnail compression (< 120KB)
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
        const compressedBase64 = canvas.toDataURL('image/webp', 0.75);
        setImageAttachment(compressedBase64);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
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
      upvotes: 0,
      reactions: {}
    };

    const updated = [...messages, newMsgObj];
    setMessages(updated);
    await saveToIDB('chat_messages', newMsgObj);
    setInputText('');
    setReplyingTo(null);
    setImageAttachment(null);
    setCooldownSec(3);
  };

  // Launch Poll
  const handleCreatePollSubmit = async (e) => {
    e.preventDefault();
    if (!currentStudent && onRequireAuth) {
      onRequireAuth("Sign In or Register free to create live study polls!");
      return;
    }
    const cleanQ = pollQuestion.trim();
    const cleanOpts = pollOptions.map(o => o.trim()).filter(Boolean);
    if (!cleanQ || cleanOpts.length < 2) {
      setModerationError("Please provide a poll question and at least 2 valid options.");
      return;
    }

    const senderName = currentStudent?.display_name || currentStudent?.full_name || currentStudent?.username || 'GATE Aspirant';
    const userRole = (currentStudent?.role || (currentStudent?.is_faculty ? 'faculty' : 'student')).toLowerCase();

    const pollMsgObj = {
      id: 'poll_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      channel: activeChannel,
      sender: senderName,
      senderId: currentStudent?.id || currentStudent?.username || null,
      role: userRole,
      type: 'poll',
      pollData: {
        question: cleanQ,
        options: cleanOpts.map(text => ({ text, votes: 0 })),
        voters: {}
      },
      timestamp: new Date().toISOString(),
      reactions: {}
    };

    const updated = [...messages, pollMsgObj];
    setMessages(updated);
    await saveToIDB('chat_messages', pollMsgObj);
    setPollQuestion('');
    setPollOptions(['', '']);
    setIsPollModalOpen(false);
    setActionNotice("📊 Study Poll published in lounge!");
    setTimeout(() => setActionNotice(''), 3000);
  };

  // Vote on Poll Option
  const handleVotePoll = async (msgId, optIdx) => {
    if (!currentStudent && onRequireAuth) {
      onRequireAuth("Sign In or Register free to cast your vote!");
      return;
    }
    const voterKey = currentStudent?.id || currentStudent?.username || 'me';

    const updated = messages.map(m => {
      if (m.id !== msgId || m.type !== 'poll') return m;
      const voters = { ...(m.pollData?.voters || {}) };
      voters[voterKey] = optIdx;

      const options = (m.pollData?.options || []).map((opt, i) => {
        const count = Object.values(voters).filter(val => val === i).length;
        return { ...opt, votes: count };
      });

      return {
        ...m,
        pollData: {
          ...m.pollData,
          options,
          voters
        }
      };
    });

    setMessages(updated);
  };

  // Interactive Emoji Reactions
  const handleToggleReaction = (msgId, emoji) => {
    if (!currentStudent && onRequireAuth) {
      onRequireAuth("Sign In or Register free to react to chat messages!");
      return;
    }
    setMessages(prev => prev.map(m => {
      if (m.id !== msgId) return m;
      const currentReactions = { ...(m.reactions || {}) };
      const currentCount = currentReactions[emoji] || 0;
      currentReactions[emoji] = currentCount + 1;
      return { 
        ...m, 
        reactions: currentReactions,
        upvotes: (m.upvotes || 0) + 1 
      };
    }));
    setActiveReactionPickerMsgId(null);
  };

  // Copy message text to clipboard
  const handleCopyMessage = (msgId, text) => {
    navigator.clipboard.writeText(text);
    setCopiedMsgId(msgId);
    setTimeout(() => setCopiedMsgId(null), 2000);
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

  // Filtering messages by active channel and search
  const activeChannelObj = CHANNELS.find(c => c.id === activeChannel) || CHANNELS[0];
  const channelMessages = messages.filter(m => {
    if (m.channel !== activeChannel) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      m.text?.toLowerCase().includes(q) ||
      m.sender?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-6xl mx-auto space-y-4 animate-in fade-in duration-200">
      
      {/* 2-Column Split: Channel Navigation Rail + Main Interactive Chat Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Left Rail: Channels & Mod Tools */}
        <div className="lg:col-span-4 space-y-3">
          
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
              <div className="flex items-center gap-2">
                <Hash className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <h2 className="font-extrabold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
                  Study Lounges
                </h2>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                {CHANNELS.length} Channels
              </span>
            </div>

            {/* Channels Pill List */}
            <div className="flex flex-row overflow-x-auto lg:flex-col gap-1.5 pb-1 lg:pb-0 scrollbar-none">
              {CHANNELS.map(ch => {
                const isActive = activeChannel === ch.id;
                const count = messages.filter(m => m.channel === ch.id).length;
                return (
                  <button
                    key={ch.id}
                    onClick={() => { 
                      setActiveChannel(ch.id); 
                      setModerationError(''); 
                      setSearchQuery('');
                    }}
                    className={`text-left p-2.5 rounded-2xl text-xs font-bold transition flex items-center justify-between shrink-0 cursor-pointer w-auto min-w-[150px] lg:w-full group ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-base">{ch.icon}</span>
                      <div className="truncate min-w-0">
                        <div className="truncate leading-tight">{ch.label}</div>
                        <div className={`text-[10px] font-normal truncate ${isActive ? 'text-emerald-100' : 'text-slate-400'}`}>
                          {ch.desc}
                        </div>
                      </div>
                    </div>
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full shrink-0 ml-1.5 ${
                      isActive ? 'bg-emerald-700 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Virtual Pomodoro Study Room & Lofi Audio Lounge */}
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-4 shadow-sm space-y-3 border border-indigo-800/40">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-extrabold text-xs tracking-wider uppercase">
                <Timer className="w-4 h-4 text-emerald-400" />
                <span>Pomodoro Focus Lounge</span>
              </div>
              <button
                type="button"
                onClick={toggleAmbientAudio}
                className={`px-2 py-1 rounded-xl text-xs transition cursor-pointer flex items-center gap-1 font-bold ${
                  isAudioPlaying ? 'bg-emerald-500 text-white shadow-xs' : 'bg-white/10 hover:bg-white/20 text-slate-300'
                }`}
                title={isAudioPlaying ? 'Mute 432Hz Focus Drone' : 'Play 432Hz Offline Focus Drone'}
              >
                {isAudioPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                <span className="text-[10px]">{isAudioPlaying ? '432Hz On' : 'Lofi Drone'}</span>
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="font-mono text-2xl font-black text-emerald-400 tracking-wider">
                {String(Math.floor(pomodoroSeconds / 60)).padStart(2, '0')}:{String(pomodoroSeconds % 60).padStart(2, '0')}
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={togglePomodoro}
                  className={`px-3 py-1.5 rounded-xl font-extrabold text-xs flex items-center gap-1 cursor-pointer transition ${
                    isPomodoroActive ? 'bg-amber-500 text-white hover:bg-amber-600' : 'bg-emerald-500 text-white hover:bg-emerald-600'
                  }`}
                >
                  {isPomodoroActive ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                  <span>{isPomodoroActive ? 'Pause' : 'Focus'}</span>
                </button>
                <button
                  type="button"
                  onClick={resetPomodoro}
                  className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 cursor-pointer transition"
                  title="Reset 25-min timer"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              </div>
            </div>
            <p className="text-[10px] text-slate-300/80">
              25-min sprint for GATE AG PYQ numerical solving with offline harmonic drone.
            </p>
          </div>

          {/* Quick Guidance Card */}
          <div className="hidden lg:block bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 text-[11px] text-slate-600 dark:text-slate-400 space-y-2">
            <div className="font-bold uppercase tracking-wider text-[10px] text-slate-900 dark:text-white flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              <span>Study Tips & Guidelines</span>
            </div>
            <div>💡 Use <strong>$E=mc^2$</strong> syntax for instant live LaTeX preview.</div>
            <div>📸 Click the paperclip to attach working diagrams & schematics (WebP).</div>
            <div>📊 Click poll icon to run doubt consensus with live percentage bars.</div>
            <div>⚡ Verified solvers & faculty mentors earn badges for step-by-step help.</div>
          </div>

        </div>

        {/* Right Main Feed: Discord-like Interactive Stream */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl flex flex-col h-[70vh] sm:h-[640px] shadow-xs overflow-hidden min-w-0">
          
          {/* Channel Header with Search Bar */}
          <div className="p-3.5 sm:p-4 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="text-xl">{activeChannelObj.icon}</span>
              <div className="truncate">
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white truncate">
                    #{activeChannelObj.label}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-900/40 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Online
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  {activeChannelObj.desc}
                </p>
              </div>
            </div>

            {/* Quick Search in Channel */}
            <div className="flex items-center gap-2 self-stretch sm:self-auto shrink-0">
              <div className="relative flex-1 sm:w-48">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search in lounge..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:ring-1 focus:ring-emerald-500"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Pinned Channel Formula Sheet & Rules Banner */}
          {PINNED_BANNERS[activeChannel] && (
            <div className="bg-gradient-to-r from-indigo-50/90 via-emerald-50/70 to-indigo-50/90 dark:from-indigo-950/40 dark:via-slate-900 dark:to-indigo-950/40 border-b border-indigo-100 dark:border-indigo-900/40 px-3.5 py-2 flex items-center justify-between gap-2 text-xs shrink-0">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <Pin className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <div className="min-w-0 flex-1 overflow-x-auto scrollbar-none">
                  <span className="font-extrabold text-slate-900 dark:text-white mr-2">
                    {PINNED_BANNERS[activeChannel].title}:
                  </span>
                  {isPinnedBannerExpanded ? (
                    <span className="text-slate-700 dark:text-slate-300 font-medium">
                      <MathRenderer content={PINNED_BANNERS[activeChannel].text} />
                    </span>
                  ) : (
                    <span className="text-slate-400 italic">Click to expand formula cheat-sheet</span>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsPinnedBannerExpanded(!isPinnedBannerExpanded)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer shrink-0"
                title={isPinnedBannerExpanded ? 'Collapse pin' : 'Expand pin'}
              >
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isPinnedBannerExpanded ? 'rotate-180' : ''}`} />
              </button>
            </div>
          )}

          {/* Action Notice (Deleted / Banned / Flagged feedback) */}
          {actionNotice && (
            <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/60 border-b border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
              <span>{actionNotice}</span>
            </div>
          )}

          {/* Interactive Messages Stream */}
          <div ref={messagesContainerRef} className="flex-1 p-3 sm:p-4 space-y-3 overflow-y-auto min-w-0">
            {channelMessages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 text-xs space-y-2">
                <MessageSquare className="w-8 h-8 opacity-40" />
                <div>
                  {searchQuery ? `No messages found matching "${searchQuery}".` : `No messages in #${activeChannelObj.label} yet. Be the first to start!`}
                </div>
              </div>
            ) : (
              channelMessages.map(msg => {
                const isFaculty = msg.role === 'faculty' || msg.role === 'mentor' || (msg.sender && (msg.sender.startsWith('Dr.') || msg.sender.startsWith('Prof.') || msg.sender.startsWith('Er.')));
                const isSolver = msg.role === 'solver';
                const isAdmin = msg.role === 'admin';
                const isPoll = msg.type === 'poll';

                return (
                  <div 
                    key={msg.id} 
                    className={`group relative p-3 rounded-2xl border transition-all text-xs space-y-2 min-w-0 overflow-hidden break-words ${
                      isFaculty
                        ? 'bg-indigo-50/40 dark:bg-indigo-950/20 border-indigo-200/60 dark:border-indigo-800/40'
                        : (isSolver 
                            ? 'bg-amber-50/40 dark:bg-amber-950/20 border-amber-200/60 dark:border-amber-800/40'
                            : 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-700/50 hover:border-slate-300 dark:hover:border-slate-600')
                    }`}
                  >
                    {/* Hover Floating Action Bar */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all flex items-center gap-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-1 shadow-sm z-10">
                      
                      {/* React Picker Button */}
                      <button
                        onClick={() => setActiveReactionPickerMsgId(activeReactionPickerMsgId === msg.id ? null : msg.id)}
                        className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 hover:text-emerald-600 transition cursor-pointer"
                        title="React with emoji"
                      >
                        <Smile className="w-3.5 h-3.5" />
                      </button>

                      {/* Reply Button */}
                      {!isPoll && (
                        <button
                          onClick={() => setReplyingTo(msg)}
                          className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 hover:text-emerald-600 transition cursor-pointer"
                          title="Reply in thread"
                        >
                          <CornerDownRight className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {/* Copy Message / LaTeX */}
                      {!isPoll && (
                        <button
                          onClick={() => handleCopyMessage(msg.id, msg.text)}
                          className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 hover:text-emerald-600 transition cursor-pointer"
                          title="Copy text / LaTeX"
                        >
                          {copiedMsgId === msg.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      )}

                      {/* Student: Report */}
                      {!hasModPerks && msg.sender !== currentStudent?.full_name && (
                        <button
                          onClick={() => setReportingMsgId(reportingMsgId === msg.id ? null : msg.id)}
                          className="p-1 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950 text-slate-400 hover:text-rose-500 transition cursor-pointer"
                          title="Report message"
                        >
                          <Flag className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {/* Mod Actions */}
                      {hasModPerks && (
                        <>
                          <button
                            onClick={() => handleDeleteMessage(msg.id)}
                            className="p-1 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950 text-rose-500 transition cursor-pointer"
                            title="Delete message"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          {msg.role !== 'admin' && (
                            <button
                              onClick={() => handleMuteUser(msg, 24)}
                              className="p-1 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-950 text-amber-600 transition cursor-pointer"
                              title="Mute user 24h"
                            >
                              <Clock className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </>
                      )}
                    </div>

                    {/* Popover Reaction Bar when picker active */}
                    {activeReactionPickerMsgId === msg.id && (
                      <div className="absolute top-10 right-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-1.5 shadow-lg z-20 flex items-center gap-1.5 animate-in fade-in zoom-in-95">
                        {QUICK_REACTIONS.map(qr => (
                          <button
                            key={qr.emoji}
                            onClick={() => handleToggleReaction(msg.id, qr.emoji)}
                            className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl text-sm transition cursor-pointer"
                            title={qr.label}
                          >
                            {qr.emoji}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Quoted Message snippet if reply */}
                    {msg.replyTo && (
                      <div className="p-2 rounded-xl bg-slate-100/70 dark:bg-slate-900/60 border-l-2 border-emerald-500 text-[11px] text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                        <CornerDownRight className="w-3 h-3 text-emerald-500 shrink-0" />
                        <span className="font-bold text-slate-800 dark:text-slate-200">{msg.replyTo.sender}:</span>
                        <span className="truncate">{msg.replyTo.text}</span>
                      </div>
                    )}

                    {/* Message Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 flex-wrap">
                        
                        {/* Avatar */}
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold overflow-hidden shrink-0 ${
                          isFaculty 
                            ? 'bg-indigo-600 text-white' 
                            : (isSolver ? 'bg-amber-500 text-white' : 'bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-200')
                        }`}>
                          {msg.photoUrl ? (
                            <img src={msg.photoUrl} alt="Avatar" className="w-full h-full object-cover" />
                          ) : (
                            isFaculty ? <Award className="w-3.5 h-3.5" /> : (isSolver ? <Zap className="w-3.5 h-3.5" /> : (msg.sender?.[0] || 'U'))
                          )}
                        </div>

                        {/* Author Name */}
                        <span className={`font-bold ${
                          isFaculty 
                            ? 'text-indigo-900 dark:text-indigo-200' 
                            : (isSolver ? 'text-amber-900 dark:text-amber-200' : 'text-slate-900 dark:text-white')
                        }`}>
                          {msg.sender}
                        </span>

                        {/* Role Badges */}
                        {isFaculty && (
                          <span className="inline-flex items-center gap-1 text-[9px] font-black px-1.5 py-0.2 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                            <Award className="w-2.5 h-2.5" />
                            <span>{msg.role === 'mentor' ? 'Faculty Mentor' : 'Faculty'}</span>
                          </span>
                        )}

                        {isSolver && (
                          <span className="inline-flex items-center gap-1 text-[9px] font-black px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                            <Zap className="w-2.5 h-2.5" />
                            <span>Solver</span>
                          </span>
                        )}

                        {isAdmin && (
                          <span className="inline-flex items-center gap-1 text-[9px] font-black px-1.5 py-0.2 rounded bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800">
                            <span>Admin</span>
                          </span>
                        )}

                        {msg.department && (
                          <span className="text-[9px] font-mono text-slate-400">
                            [{msg.department.replace(/ \(.+\)/, '')}]
                          </span>
                        )}

                        {/* Timestamp */}
                        <span className="text-[10px] text-slate-400 font-mono ml-1">
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
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
                          className="px-2.5 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-[10px] font-bold cursor-pointer"
                        >
                          Submit Flag
                        </button>
                      </div>
                    )}

                    {/* Attached Diagram / Image */}
                    {msg.imageUrl && (
                      <div className="my-1.5 max-w-sm rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-950/5">
                        <img src={msg.imageUrl} alt="Attached Diagram" className="max-h-60 w-auto object-contain rounded-lg" />
                      </div>
                    )}

                    {/* Poll Content OR Message Text */}
                    {isPoll && msg.pollData ? (
                      <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3 my-1">
                        <div className="flex items-center gap-2 font-extrabold text-xs text-slate-900 dark:text-white">
                          <BarChart2 className="w-4 h-4 text-emerald-500" />
                          <span>{msg.pollData.question}</span>
                        </div>
                        <div className="space-y-2">
                          {msg.pollData.options?.map((opt, optIdx) => {
                            const totalVotes = msg.pollData.options.reduce((acc, o) => acc + (o.votes || 0), 0);
                            const pct = totalVotes > 0 ? Math.round(((opt.votes || 0) / totalVotes) * 100) : 0;
                            const voterKey = currentStudent?.id || currentStudent?.username || 'me';
                            const userVotedThis = msg.pollData.voters?.[voterKey] === optIdx;

                            return (
                              <button
                                key={optIdx}
                                type="button"
                                onClick={() => handleVotePoll(msg.id, optIdx)}
                                className={`w-full relative overflow-hidden text-left p-2.5 rounded-xl border text-xs font-semibold transition cursor-pointer flex items-center justify-between ${
                                  userVotedThis 
                                    ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200' 
                                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 hover:border-emerald-300 text-slate-800 dark:text-slate-200'
                                }`}
                              >
                                <div 
                                  className="absolute left-0 top-0 bottom-0 bg-emerald-500/15 dark:bg-emerald-500/20 transition-all duration-500 pointer-events-none"
                                  style={{ width: `${pct}%` }}
                                />
                                <span className="relative z-10">{opt.text}</span>
                                <div className="relative z-10 flex items-center gap-2 font-mono text-[11px]">
                                  {userVotedThis && <span className="text-emerald-600 font-bold">✓</span>}
                                  <span>{pct}% ({opt.votes || 0})</span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800">
                          <span>{msg.pollData.options?.reduce((a, o) => a + (o.votes || 0), 0)} Total Votes</span>
                          <span>Click option to cast vote</span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-slate-900 dark:text-slate-100 font-medium leading-relaxed break-words overflow-x-auto max-w-full scrollbar-none">
                        <MathRenderer content={msg.text} />
                      </div>
                    )}

                    {/* Interactive Reaction Pills */}
                    <div className="pt-1 flex items-center gap-1.5 flex-wrap">
                      {msg.reactions && Object.entries(msg.reactions).map(([emoji, count]) => {
                        if (!count) return null;
                        return (
                          <button
                            key={emoji}
                            onClick={() => handleToggleReaction(msg.id, emoji)}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800/80 hover:bg-emerald-50 dark:hover:bg-emerald-950 border border-slate-200 dark:border-slate-700/60 text-[11px] text-slate-700 dark:text-slate-300 transition cursor-pointer"
                          >
                            <span>{emoji}</span>
                            <span className="font-mono text-[10px] font-bold">{count}</span>
                          </button>
                        );
                      })}

                      {/* Quick Add Reaction Button */}
                      <button
                        onClick={() => setActiveReactionPickerMsgId(activeReactionPickerMsgId === msg.id ? null : msg.id)}
                        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-slate-100/60 dark:bg-slate-800/40 hover:bg-slate-200 dark:hover:bg-slate-700 text-[10px] text-slate-400 hover:text-slate-600 transition cursor-pointer"
                        title="Add reaction"
                      >
                        <Smile className="w-3 h-3" />
                        <span>+</span>
                      </button>
                    </div>

                  </div>
                );
              })
            )}
          </div>

          {/* Bottom Dock: Math Ribbon, Attachment, Input & Send */}
          <div className="p-3 sm:p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 space-y-2 shrink-0">
            
            {isBanned ? (
              <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-bold flex items-center gap-2">
                <Ban className="w-4 h-4 shrink-0" />
                <span>Your account is permanently restricted from chatting due to administrative moderation.</span>
              </div>
            ) : muteStatus.isMuted ? (
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-bold flex items-center gap-2">
                <Clock className="w-4 h-4 shrink-0" />
                <span>Account temporarily muted for {muteStatus.remainingMinutes}m. Reason: {muteStatus.reason}</span>
              </div>
            ) : !currentStudent ? (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs">
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  👋 You are previewing <strong>#{activeChannelObj.label}</strong> in Guest Mode.
                </div>
                <button
                  type="button"
                  onClick={() => onRequireAuth?.("Sign In or Register free to participate in live study chats!")}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shrink-0 cursor-pointer shadow-xs transition"
                >
                  Sign In to Chat
                </button>
              </div>
            ) : (
              <>
                {/* Replying Banner */}
                {replyingTo && (
                  <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between text-xs animate-in fade-in">
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

                {/* Attached Image Preview */}
                {imageAttachment && (
                  <div className="relative inline-block border border-slate-300 dark:border-slate-700 rounded-xl overflow-hidden p-1 bg-white dark:bg-slate-900">
                    <img src={imageAttachment} alt="Preview" className="h-14 w-auto rounded-lg object-contain" />
                    <button 
                      onClick={() => setImageAttachment(null)}
                      className="absolute top-1 right-1 p-0.5 rounded-full bg-black/60 text-white hover:bg-black cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}

                {/* Real-time Live Math Preview Bubble */}
                {inputText.includes('$') && (
                  <div className="p-2 rounded-xl bg-indigo-50/90 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/80 flex items-center gap-2 text-xs text-indigo-900 dark:text-indigo-200 animate-in fade-in">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 shrink-0">
                      Live KaTeX:
                    </span>
                    <div className="truncate font-medium">
                      <MathRenderer content={inputText} />
                    </div>
                  </div>
                )}

                {/* Error Banner */}
                {moderationError && (
                  <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 text-rose-700 dark:text-rose-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                    <span>{moderationError}</span>
                  </div>
                )}

                {/* Quick Math Ribbon Toolbar (Collapsible) */}
                {showMathRibbon && (
                  <div className="p-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto scrollbar-none animate-in fade-in">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-1 shrink-0">
                      Quick Math:
                    </span>
                    {MATH_SNIPPETS.map(snip => (
                      <button
                        key={snip.label}
                        type="button"
                        onClick={() => handleInsertMath(snip.latex)}
                        className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950 text-slate-800 dark:text-slate-200 text-xs font-mono font-bold border border-slate-200/80 dark:border-slate-700 transition cursor-pointer shrink-0"
                      >
                        {snip.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Composer Form */}
                <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageSelect}
                    accept="image/*"
                    className="hidden"
                  />
                  
                  {/* Attach Image Button */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 transition cursor-pointer shrink-0"
                    title="Attach Diagram / Working Photo (WebP)"
                  >
                    <Paperclip className="w-4 h-4" />
                  </button>

                  {/* Launch Poll Button */}
                  <button
                    type="button"
                    onClick={() => setIsPollModalOpen(true)}
                    className="p-2.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 transition cursor-pointer shrink-0"
                    title="Create a study poll / doubt survey"
                  >
                    <BarChart2 className="w-4 h-4" />
                  </button>

                  {/* Toggle Math Ribbon Button */}
                  <button
                    type="button"
                    onClick={() => setShowMathRibbon(!showMathRibbon)}
                    className={`p-2.5 rounded-xl border transition cursor-pointer shrink-0 ${
                      showMathRibbon
                        ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800'
                        : 'bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                    title="Insert Mathematical LaTeX Symbols"
                  >
                    <Code2 className="w-4 h-4" />
                  </button>

                  {/* Input Box */}
                  <input
                    ref={inputFieldRef}
                    type="text"
                    placeholder={`Message #${activeChannelObj.label}... (LaTeX $x^2$ supported)`}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white font-medium outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  
                  {/* Send Button */}
                  <button
                    type="submit"
                    disabled={(!inputText.trim() && !imageAttachment) || cooldownSec > 0}
                    className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-extrabold text-xs transition flex items-center gap-1 cursor-pointer shrink-0 shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{cooldownSec > 0 ? `${cooldownSec}s` : 'Send'}</span>
                  </button>
                </form>
              </>
            )}

          </div>

        </div>

      </div>

      {/* Poll Creation Modal */}
      {isPollModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
          <div 
            className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-emerald-500" />
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
                  Launch Study Doubt Poll
                </h3>
              </div>
              <button onClick={() => setIsPollModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePollSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Poll Question / Doubt
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Which method gives higher accuracy for infiltration?"
                  value={pollQuestion}
                  onChange={(e) => setPollQuestion(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block font-bold text-slate-700 dark:text-slate-300">
                  Options
                </label>
                {pollOptions.map((opt, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="font-mono text-xs text-slate-400 w-4">{idx + 1}.</span>
                    <input
                      type="text"
                      required={idx < 2}
                      placeholder={`Option ${idx + 1}`}
                      value={opt}
                      onChange={(e) => {
                        const next = [...pollOptions];
                        next[idx] = e.target.value;
                        setPollOptions(next);
                      }}
                      className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-1.5 text-slate-900 dark:text-white outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                    {pollOptions.length > 2 && (
                      <button
                        type="button"
                        onClick={() => setPollOptions(pollOptions.filter((_, i) => i !== idx))}
                        className="text-slate-400 hover:text-rose-500 p-1 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}

                {pollOptions.length < 4 && (
                  <button
                    type="button"
                    onClick={() => setPollOptions([...pollOptions, ''])}
                    className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                  >
                    + Add Option
                  </button>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsPollModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold cursor-pointer shadow-xs"
                >
                  Publish Poll
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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

