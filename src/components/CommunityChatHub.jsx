import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, Hash, ThumbsUp, AlertCircle, Sparkles, User, ShieldCheck } from 'lucide-react';
import MathRenderer from './MathRenderer';
import { validateCleanInput, sanitizeText } from '../utils/profanityFilter';
import { saveToIDB, getAllFromIDB } from '../utils/indexedDB';

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
    verified: true,
    text: 'Welcome to the official GATE AG Prep Community Chat! Ask questions, share shortcuts, and study together.',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    upvotes: 8
  },
  {
    id: 'chat_2',
    channel: 'doubts-and-maths',
    sender: 'Ankit_HAU',
    verified: false,
    text: 'Can someone explain how to calculate matrix eigenvalues quickly for 3x3 matrices in GATE Maths?',
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    upvotes: 4
  }
];

export default function CommunityChatHub({ currentStudent }) {
  const [activeChannel, setActiveChannel] = useState('general-lounge');
  const [messages, setMessages] = useState(DEFAULT_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [moderationError, setModerationError] = useState('');
  const chatEndRef = useRef(null);

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
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeChannel]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    setModerationError('');
    if (!inputText.trim()) return;

    // Strict Profanity & Abusive Language Validation
    const val = validateCleanInput(inputText, 'Chat Message');
    if (!val.isValid) {
      setModerationError(val.message);
      return;
    }

    const senderName = currentStudent?.full_name || currentStudent?.username || 'GATE Aspirant';

    const newMsgObj = {
      id: 'chat_' + Date.now(),
      channel: activeChannel,
      sender: senderName,
      verified: Boolean(currentStudent?.student_type === 'hau' || currentStudent?.admission_no),
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
              className={`text-left px-3.5 py-2.5 rounded-2xl text-xs font-bold transition flex items-center justify-between shrink-0 ${
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
          <div className="font-bold uppercase tracking-wider text-[10px]">Community Rules</div>
          <div>✅ Respect fellow GATE AG aspirants</div>
          <div>🚫 Zero tolerance for abusive words</div>
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
          <span className="text-[11px] font-mono text-slate-400 font-bold">
            {channelMessages.length} Messages
          </span>
        </div>

        {/* Message Feed Container */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {channelMessages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 text-xs space-y-2">
              <MessageSquare className="w-8 h-8 opacity-40" />
              <div>No messages in #{activeChannel} yet. Be the first to start the discussion!</div>
            </div>
          ) : (
            channelMessages.map(msg => (
              <div key={msg.id} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-white">{msg.sender}</span>
                    {msg.verified && (
                      <span className="inline-flex items-center gap-0.5 text-[10px] font-extrabold text-emerald-500">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Verified</span>
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <div className="text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                  <MathRenderer content={msg.text} />
                </div>

                <div className="pt-1 flex items-center justify-end">
                  <button
                    onClick={() => handleUpvoteMsg(msg.id)}
                    className="flex items-center gap-1 text-[10px] font-bold text-slate-400 hover:text-emerald-500 transition"
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span>{msg.upvotes > 0 ? msg.upvotes : ''}</span>
                  </button>
                </div>
              </div>
            ))
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Form & Profanity Error Display */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 space-y-2">
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
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-extrabold text-xs transition flex items-center gap-1"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send</span>
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
