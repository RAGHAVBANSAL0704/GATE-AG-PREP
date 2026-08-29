import React, { useState, useEffect } from 'react';
import { MessageSquare, ThumbsUp, Send, User, Sparkles, Filter, AlertCircle, CheckCircle2 } from 'lucide-react';
import MathRenderer from './MathRenderer';
import { validateCleanInput } from '../utils/profanityFilter';
import { saveToIDB, getAllFromIDB } from '../utils/indexedDB';

const INITIAL_POSTS = [
  {
    id: 'post_1',
    author: 'AIR_1_Aspirant',
    verifiedTopper: true,
    topic: 'FMP',
    questionTitle: 'Short Shortcut Trick for Tractor Drawbar Pull Questions',
    content: 'When calculating draft force in moldboard plows, use $D = C_s \\cdot w \\cdot d$. Remember to convert speed to m/s before multiplying by draft force for power!',
    upvotes: 24,
    date: '2026-08-20T14:30:00Z',
    comments: [
      { id: 'c1', author: 'Rahul_AG', text: 'Super helpful shortcut for GATE AG 2026 Q12!' }
    ]
  },
  {
    id: 'post_2',
    author: 'Priya_IITKGP',
    verifiedTopper: true,
    topic: 'SWCE',
    questionTitle: 'Hydrology Curve Number (CN) Method - Common Trap',
    content: 'Watch out for potential maximum retention $S = \\frac{25400}{CN} - 254$. In GATE NAT questions, $S$ is in mm!',
    upvotes: 19,
    date: '2026-08-22T09:15:00Z',
    comments: []
  }
];

export default function CommunityDiscussions({ currentStudent }) {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);

  useEffect(() => {
    async function loadPosts() {
      const saved = await getAllFromIDB('community_posts');
      if (Array.isArray(saved) && saved.length > 0) {
        setPosts([...saved, ...INITIAL_POSTS]);
      }
    }
    loadPosts();
  }, []);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!newTitle.trim() || !newContent.trim()) return;

    const titleCheck = validateCleanInput(newTitle, 'Question Title');
    if (!titleCheck.isValid) {
      setErrorMsg(titleCheck.message);
      return;
    }

    const contentCheck = validateCleanInput(newContent, 'Discussion Post');
    if (!contentCheck.isValid) {
      setErrorMsg(contentCheck.message);
      return;
    }

    const authorName = currentStudent?.full_name || currentStudent?.username || 'GATE Aspirant';

    const newPostObj = {
      id: 'post_' + Date.now(),
      author: authorName,
      verifiedTopper: false,
      topic: selectedTopic === 'All' ? 'General' : selectedTopic,
      questionTitle: newTitle.trim(),
      content: newContent.trim(),
      upvotes: 1,
      date: new Date().toISOString(),
      comments: []
    };

    const updated = [newPostObj, ...posts];
    setPosts(updated);
    await saveToIDB('community_posts', newPostObj);

    setNewTitle('');
    setNewContent('');
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 3000);
  };

  const handleUpvote = (postId) => {
    setPosts(posts.map(p => p.id === postId ? { ...p, upvotes: p.upvotes + 1 } : p));
  };

  const filteredPosts = posts.filter(p => selectedTopic === 'All' || p.topic === selectedTopic);

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
      
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xs">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 text-xs font-bold">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>GATE Overflow for AG — Peer Discussions</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              Crowdsourced Q&A & Peer Solutions
            </h1>
            <p className="text-xs text-slate-500 max-w-xl">
              Post doubt questions, shortcut solutions, and tricks. Moderate automatically with zero abusive content.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl text-xs font-bold">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="bg-transparent outline-none text-slate-800 dark:text-slate-200 font-bold"
            >
              <option value="All">All Topics</option>
              <option value="FMP">Farm Machinery (FMP)</option>
              <option value="SWCE">Soil & Water (SWCE)</option>
              <option value="APFE">Food Processing (APFE)</option>
              <option value="Maths">Engineering Maths</option>
            </select>
          </div>
        </div>
      </div>

      {/* Post New Doubt / Solution */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-xs">
        <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-500" />
          <span>Ask a Question or Post a Shortcut Solution</span>
        </h3>

        <form onSubmit={handleCreatePost} className="space-y-3 text-xs">
          <input
            type="text"
            required
            placeholder="Title / Concept (e.g., Short trick for Psychrometric Enthalpy calculation)"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white font-medium outline-none focus:ring-2 focus:ring-purple-500"
          />

          <textarea
            rows={3}
            required
            placeholder="Explain your doubt or solution in detail using standard text or LaTeX (e.g. $E = m C_p \\Delta T$)..."
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3.5 text-slate-900 dark:text-white font-medium outline-none focus:ring-2 focus:ring-purple-500 resize-none"
          />

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 text-rose-600 font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 text-emerald-600 font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Post published to community discussion board!</span>
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs transition shadow-md flex items-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publish Post</span>
            </button>
          </div>
        </form>
      </div>

      {/* Discussion List */}
      <div className="space-y-4">
        {filteredPosts.map(post => (
          <div key={post.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs text-slate-900 dark:text-white">{post.author}</span>
                {post.verifiedTopper && (
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-600 border border-amber-300 dark:border-amber-800">
                    🏆 AIR Topper Verified
                  </span>
                )}
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500">
                  {post.topic}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">{new Date(post.date).toLocaleDateString()}</span>
            </div>

            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
              {post.questionTitle}
            </h3>

            <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              <MathRenderer content={post.content} />
            </div>

            <div className="pt-2 flex items-center justify-between text-xs">
              <button
                onClick={() => handleUpvote(post.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-purple-100 dark:hover:bg-purple-950 hover:text-purple-600 text-slate-600 dark:text-slate-400 font-bold transition"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>Upvote ({post.upvotes})</span>
              </button>

              <span className="text-[11px] text-slate-400">
                {post.comments.length} Comments
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
