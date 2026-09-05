import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  Brain, 
  HelpCircle, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  BookOpen, 
  Key, 
  ChevronRight, 
  RefreshCw,
  AlertTriangle
} from 'lucide-react';
import MathRenderer from './MathRenderer';
import { 
  explainQuestionWithGemini, 
  askDoubtChat, 
  hasApiKey, 
  getStoredApiKey, 
  setStoredApiKey 
} from '../services/geminiService';

export default function AITutorModal({ 
  isOpen, 
  onClose, 
  question, 
  studentAnswer = null, 
  isCorrect = null 
}) {
  const [activeTab, setActiveTab] = useState('solution'); // 'solution' | 'chat'
  
  // Solution State
  const [solutionText, setSolutionText] = useState('');
  const [isSolutionLoading, setIsSolutionLoading] = useState(false);
  const [solutionError, setSolutionError] = useState('');

  // Chat State
  const [chatMessages, setChatMessages] = useState([]);
  const [inputDoubt, setInputDoubt] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatEndRef = useRef(null);

  // API Key Config State
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [tempApiKey, setTempApiKey] = useState('');
  const [hasKey, setHasKey] = useState(false);

  useEffect(() => {
    if (isOpen && question) {
      setHasKey(hasApiKey());
      setTempApiKey(getStoredApiKey());
      setSolutionText('');
      setChatMessages([
        {
          id: 'welcome',
          sender: 'ai',
          text: `Hi! I'm your **GATE AG AI Tutor**. How can I help you with this **${question.section || 'GATE AG'}** question? You can ask for derivations, alternate methods, or unit clarifications!`
        }
      ]);
      loadSolution();
    }
  }, [isOpen, question]);

  useEffect(() => {
    if (activeTab === 'chat') {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, activeTab]);

  if (!isOpen || !question) return null;

  const loadSolution = async () => {
    setIsSolutionLoading(true);
    setSolutionError('');
    try {
      const res = await explainQuestionWithGemini(question, studentAnswer, isCorrect);
      setSolutionText(res.text);
      if (!res.success && res.error) {
        setSolutionError(res.error);
      }
    } catch (e) {
      setSolutionError(e.message || 'Failed to load AI explanation.');
    } finally {
      setIsSolutionLoading(false);
    }
  };

  const handleFetchHint = async (level) => {
    setHintLevel(level);
    if (hints[level]) return;

    setIsHintLoading(true);
    try {
      const res = await getProgressiveHint(question, level);
      setHints(prev => ({ ...prev, [level]: res.text }));
    } catch (e) {
      setHints(prev => ({ ...prev, [level]: 'Unable to fetch hint.' }));
    } finally {
      setIsHintLoading(false);
    }
  };

  const handleSendDoubt = async (e) => {
    e.preventDefault();
    if (!inputDoubt.trim() || isChatLoading) return;

    const userText = inputDoubt.trim();
    setInputDoubt('');

    const newHistory = [
      ...chatMessages,
      { id: 'user_' + Date.now(), sender: 'user', text: userText }
    ];
    setChatMessages(newHistory);
    setIsChatLoading(true);

    try {
      const res = await askDoubtChat(newHistory, question, userText);
      setChatMessages(prev => [
        ...prev,
        { id: 'ai_' + Date.now(), sender: 'ai', text: res.text }
      ]);
    } catch (e) {
      setChatMessages(prev => [
        ...prev,
        { id: 'ai_' + Date.now(), sender: 'ai', text: 'Sorry, I could not process your query right now.' }
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleSaveApiKey = () => {
    setStoredApiKey(tempApiKey);
    setHasKey(Boolean(tempApiKey.trim()));
    setShowKeyInput(false);
    loadSolution();
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-hidden animate-in fade-in duration-150">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Modal Top Header */}
        <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-950/40">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-emerald-500 text-white flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                  GATE AG AI Study Assistant
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/40">
                  Gemini 2.0
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {question.section} • {question.topic || 'Engineering Problem'} ({question.marks || 1}M)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowKeyInput(!showKeyInput)}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs flex items-center gap-1 cursor-pointer"
              title="Configure Gemini API Key"
            >
              <Key className="w-4 h-4" />
              <span className="hidden sm:inline text-[11px] font-medium">{hasKey ? 'Key Set' : 'Set Key'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notice: Under Active Testing & Review */}
        <div className="px-5 py-2.5 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-indigo-500/10 border-b border-amber-300/80 dark:border-amber-800/60 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-amber-900 dark:text-amber-300">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
            <span className="font-extrabold text-[11px] uppercase tracking-wider">
              Notice: Under Active Testing & Review
            </span>
          </div>
          <span className="text-[10px] text-slate-600 dark:text-slate-400 hidden sm:inline font-medium">
            Derivations and step-by-step proofs are continuously audited for accuracy.
          </span>
        </div>

        {/* Optional Gemini API Key Drawer */}
        {showKeyInput && (
          <div className="px-5 py-3 bg-amber-500/10 border-b border-amber-500/20 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 animate-in fade-in">
            <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="font-bold text-amber-800 dark:text-amber-300 shrink-0">Custom Gemini API Key:</span>
              <input
                type="password"
                placeholder="AIzaSy..."
                value={tempApiKey}
                onChange={(e) => setTempApiKey(e.target.value)}
                className="w-full sm:w-64 h-8.5 px-3 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 placeholder:opacity-100 outline-none focus:border-amber-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleSaveApiKey}
                className="h-8.5 px-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-lg text-xs cursor-pointer inline-flex items-center justify-center transition"
              >
                Save
              </button>
              <button
                onClick={() => setShowKeyInput(false)}
                className="h-8.5 px-2.5 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer inline-flex items-center justify-center transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Sub-Navigation Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 px-5 pt-2 gap-2 bg-slate-50/40 dark:bg-slate-950/20">
          <button
            onClick={() => setActiveTab('solution')}
            className={`pb-2 px-3 text-xs font-bold border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'solution'
                ? 'border-purple-600 text-purple-600 dark:text-purple-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Step-by-Step Derivation</span>
          </button>

          <button
            onClick={() => setActiveTab('chat')}
            className={`pb-2 px-3 text-xs font-bold border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'chat'
                ? 'border-purple-600 text-purple-600 dark:text-purple-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            <Brain className="w-3.5 h-3.5" />
            <span>Ask Follow-up Doubt</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 p-5 overflow-y-auto min-h-[300px]">
          
          {/* TAB 1: STEP-BY-STEP SOLUTION */}
          {activeTab === 'solution' && (
            <div className="space-y-4">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-2xl">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Question Statement:
                </span>
                <MathRenderer text={question.question} className="text-xs font-medium text-slate-800 dark:text-slate-200" />
              </div>

              {isSolutionLoading ? (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                  <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
                  <div className="text-xs text-slate-500">
                    <p className="font-semibold text-slate-800 dark:text-slate-200">Analyzing question mechanics with Gemini AI...</p>
                    <p className="text-[11px] text-slate-400">Extracting formulas, unit conversions, and computing verification steps.</p>
                  </div>
                </div>
              ) : solutionText ? (
                <div className="prose prose-sm dark:prose-invert max-w-none space-y-3">
                  <MathRenderer text={solutionText} className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed" />
                  <div className="pt-3 flex justify-end">
                    <button
                      onClick={loadSolution}
                      className="px-3 py-1.5 text-xs text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/50 rounded-xl flex items-center gap-1.5 transition cursor-pointer font-semibold"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Regenerate AI Solution
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-xs text-slate-500">No explanation loaded yet.</p>
                  <button
                    onClick={loadSolution}
                    className="mt-3 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Generate AI Explanation
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: DOUBT CHAT */}
          {activeTab === 'chat' && (
            <div className="flex flex-col h-full space-y-3">
              <div className="flex-1 space-y-3 max-h-[350px] overflow-y-auto pr-1">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-purple-600 text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/60'
                      }`}
                    >
                      <MathRenderer text={msg.text} />
                    </div>
                  </div>
                ))}
                {isChatLoading && (
                  <div className="flex justify-start">
                    <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-2xl flex items-center gap-2 text-xs text-slate-400">
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-purple-600" />
                      <span>Gemini is thinking...</span>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Chat Input Bar */}
              <form onSubmit={handleSendDoubt} className="flex items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                <input
                  type="text"
                  placeholder="Ask a doubt e.g., 'Why did we use this formula?'..."
                  value={inputDoubt}
                  onChange={(e) => setInputDoubt(e.target.value)}
                  className="flex-1 h-10.5 px-3.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 placeholder:opacity-100 focus:outline-none focus:border-purple-500"
                />
                <button
                  type="submit"
                  disabled={!inputDoubt.trim() || isChatLoading}
                  className="h-10.5 px-4 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition inline-flex items-center justify-center gap-1 disabled:opacity-50 cursor-pointer shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
