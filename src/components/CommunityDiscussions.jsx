import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  ThumbsUp, 
  Send, 
  User, 
  Sparkles, 
  Filter, 
  AlertCircle, 
  CheckCircle2,
  Award,
  Zap,
  Trash2,
  Ban,
  MessageCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import MathRenderer from './MathRenderer';
import { validateCleanInput, sanitizeText } from '../utils/profanityFilter';
import { saveToIDB, getAllFromIDB } from '../utils/indexedDB';
import { canModerate, isUserBanned, banUser } from '../services/userRoleService';
import { addPriorityNotification } from '../services/notificationService';

const INITIAL_POSTS = [
  {
    id: 'post_1',
    author: 'AIR_1_Aspirant',
    authorRole: 'student',
    topic: 'FMP',
    questionTitle: 'Short Shortcut Trick for Tractor Drawbar Pull Questions',
    content: 'When calculating draft force in moldboard plows, use $D = C_s \\cdot w \\cdot d$. Remember to convert speed to m/s before multiplying by draft force for power!',
    upvotes: 24,
    date: '2026-08-20T14:30:00Z',
    comments: [
      { 
        id: 'c1', 
        author: 'Dr. Rajesh Kumar', 
        authorRole: 'faculty',
        department: 'FMPE',
        text: 'Correct. Also note that for dynamic traction ratio calculation, always check if weight transfer is included.',
        date: '2026-08-20T16:00:00Z'
      },
      { 
        id: 'c2', 
        author: 'Rahul_AG', 
        authorRole: 'solver',
        text: 'Super helpful shortcut for GATE AG 2026 Q12!',
        date: '2026-08-20T17:15:00Z'
      }
    ]
  },
  {
    id: 'post_2',
    author: 'Priya_IITKGP',
    authorRole: 'student',
    topic: 'SWCE',
    questionTitle: 'Hydrology Curve Number (CN) Method - Common Trap',
    content: 'Watch out for potential maximum retention $S = \\frac{25400}{CN} - 254$. In GATE NAT questions, $S$ is in mm!',
    upvotes: 19,
    date: '2026-08-22T09:15:00Z',
    comments: [
      {
        id: 'c3',
        author: 'Er. Sunil Sharma',
        authorRole: 'mentor',
        department: 'SWCE',
        text: 'Good point. If CN is in inches formula, $S = \\frac{1000}{CN} - 10$ and $Q = \\frac{(P - 0.2S)^2}{P + 0.8S}$.',
        date: '2026-08-22T11:30:00Z'
      }
    ]
  }
];

export default function CommunityDiscussions({ currentStudent }) {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);
  const [expandedComments, setExpandedComments] = useState({});
  const [commentDrafts, setCommentDrafts] = useState({});
  const [actionNotice, setActionNotice] = useState('');

  const hasModPerks = canModerate(currentStudent);
  const isBanned = isUserBanned(currentStudent);

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
    setActionNotice('');

    if (isBanned) {
      setErrorMsg('Your account is restricted from posting due to community moderation.');
      return;
    }

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

    const authorName = currentStudent?.display_name || currentStudent?.full_name || currentStudent?.username || 'GATE Aspirant';
    const userRole = (currentStudent?.role || (currentStudent?.is_faculty ? 'faculty' : 'student')).toLowerCase();

    const newPostObj = {
      id: 'post_' + Date.now(),
      author: authorName,
      authorId: currentStudent?.id || currentStudent?.username || null,
      authorRole: userRole,
      department: currentStudent?.department || null,
      photoUrl: currentStudent?.profile_photo_url || null,
      topic: selectedTopic === 'All' ? 'General' : selectedTopic,
      questionTitle: sanitizeText(newTitle.trim()),
      content: sanitizeText(newContent.trim()),
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

  const handleAddComment = (postId) => {
    const draft = commentDrafts[postId];
    if (!draft || !draft.trim()) return;

    if (isBanned) {
      setActionNotice('Account restricted from commenting.');
      return;
    }

    const val = validateCleanInput(draft, 'Reply Comment');
    if (!val.isValid) {
      setActionNotice(val.message);
      return;
    }

    const authorName = currentStudent?.display_name || currentStudent?.full_name || currentStudent?.username || 'GATE Aspirant';
    const userRole = (currentStudent?.role || (currentStudent?.is_faculty ? 'faculty' : 'student')).toLowerCase();

    const newComment = {
      id: 'c_' + Date.now(),
      author: authorName,
      authorId: currentStudent?.id || currentStudent?.username || null,
      authorRole: userRole,
      department: currentStudent?.department || null,
      photoUrl: currentStudent?.profile_photo_url || null,
      text: sanitizeText(draft.trim()),
      date: new Date().toISOString()
    };

    const targetPost = posts.find(p => p.id === postId);

    // If replier is Faculty, Mentor, or Solver, notify the question author!
    const isFaculty = userRole === 'faculty' || userRole === 'mentor' || (authorName && (authorName.startsWith('Dr.') || authorName.startsWith('Prof.') || authorName.startsWith('Er.')));
    const isSolver = userRole === 'solver';

    if (targetPost && (isFaculty || isSolver)) {
      addPriorityNotification({
        recipientId: targetPost.authorId || null,
        recipientName: targetPost.author,
        senderName: authorName,
        senderRole: isFaculty ? 'faculty' : 'solver',
        senderDepartment: currentStudent?.department || null,
        senderPhoto: currentStudent?.profile_photo_url || null,
        postId: targetPost.id,
        postTitle: targetPost.questionTitle,
        replySnippet: draft.trim()
      });
    }

    const updated = posts.map(p => {
      if (p.id === postId) {
        return { ...p, comments: [...(p.comments || []), newComment] };
      }
      return p;
    });

    setPosts(updated);
    setCommentDrafts({ ...commentDrafts, [postId]: '' });
    setExpandedComments({ ...expandedComments, [postId]: true });
  };

  const handleUpvote = (postId) => {
    setPosts(posts.map(p => p.id === postId ? { ...p, upvotes: p.upvotes + 1 } : p));
  };

  const toggleComments = (postId) => {
    setExpandedComments(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  // Moderator Delete Post
  const handleDeletePost = (postId) => {
    if (!window.confirm("Are you sure you want to delete this discussion post?")) return;
    setPosts(posts.filter(p => p.id !== postId));
    setActionNotice("Discussion post deleted by Moderator.");
    setTimeout(() => setActionNotice(''), 3000);
  };

  // Moderator Delete Comment
  const handleDeleteComment = (postId, commentId) => {
    if (!window.confirm("Delete this reply?")) return;
    setPosts(posts.map(p => {
      if (p.id === postId) {
        return { ...p, comments: (p.comments || []).filter(c => c.id !== commentId) };
      }
      return p;
    }));
    setActionNotice("Reply deleted by Moderator.");
    setTimeout(() => setActionNotice(''), 3000);
  };

  // Moderator Ban User
  const handleBanAuthor = (authorName, authorId) => {
    if (!window.confirm(`Are you sure you want to block/ban "${authorName}" for inappropriate content?`)) return;
    banUser({
      id: authorId || null,
      username: authorName,
      full_name: authorName
    }, 'Inappropriate discussion post / comment');
    setActionNotice(`User "${authorName}" has been banned from community.`);
    setTimeout(() => setActionNotice(''), 3500);
  };

  const filteredPosts = posts.filter(p => selectedTopic === 'All' || p.topic === selectedTopic);

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
      
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xs">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 text-xs font-bold border border-purple-200 dark:border-purple-800">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>GATE AG Peer & Faculty Discussions</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              Crowdsourced Q&A & Expert Solutions
            </h1>
            <p className="text-xs text-slate-500 max-w-xl">
              Post doubt questions, shortcut solutions, and get verified answers from Faculty Mentors and Solvers.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl text-xs font-bold">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="bg-transparent outline-none text-slate-800 dark:text-slate-200 font-bold cursor-pointer"
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

      {/* Action Notice */}
      {actionNotice && (
        <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Post New Doubt / Solution */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-xs">
        <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-500" />
          <span>Ask a Question or Post a Shortcut Solution</span>
        </h3>

        {isBanned ? (
          <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-bold flex items-center gap-2">
            <Ban className="w-4 h-4 text-rose-400 shrink-0" />
            <span>Your account is restricted from posting due to community moderation.</span>
          </div>
        ) : (
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
                className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs transition shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Publish Post</span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Discussion List */}
      <div className="space-y-4">
        {filteredPosts.map(post => {
          const isPostFaculty = post.authorRole === 'faculty' || post.authorRole === 'mentor' || (post.author && (post.author.startsWith('Dr.') || post.author.startsWith('Prof.') || post.author.startsWith('Er.')));
          const isPostSolver = post.authorRole === 'solver';
          const isExpanded = expandedComments[post.id] !== false; // Default expanded

          return (
            <div 
              key={post.id} 
              className={`bg-white dark:bg-slate-900 border rounded-3xl p-6 space-y-4 shadow-xs transition-all ${
                isPostFaculty 
                  ? 'border-indigo-200/70 dark:border-indigo-800/60' 
                  : (isPostSolver ? 'border-amber-200/70 dark:border-amber-800/60' : 'border-slate-200 dark:border-slate-800')
              }`}
            >
              {/* Post Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 flex-wrap">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold overflow-hidden shrink-0 ${
                    isPostFaculty 
                      ? 'bg-indigo-600 text-white ring-1 ring-indigo-400/50' 
                      : (isPostSolver ? 'bg-amber-500 text-white ring-1 ring-amber-400/50' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200')
                  }`}>
                    {post.photoUrl ? (
                      <img src={post.photoUrl} alt="Author" className="w-full h-full object-cover" />
                    ) : (
                      isPostFaculty ? <Award className="w-3.5 h-3.5" /> : (isPostSolver ? <Zap className="w-3.5 h-3.5" /> : (post.author?.[0] || 'U'))
                    )}
                  </div>

                  <span className={`font-bold text-xs ${
                    isPostFaculty 
                      ? 'text-indigo-950 dark:text-indigo-200' 
                      : (isPostSolver ? 'text-amber-950 dark:text-amber-200' : 'text-slate-900 dark:text-white')
                  }`}>
                    {post.author}
                  </span>

                  {isPostFaculty && (
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 flex items-center gap-1">
                      <Award className="w-2.5 h-2.5" />
                      <span>{post.authorRole === 'mentor' ? 'Faculty Mentor' : 'Faculty'}</span>
                    </span>
                  )}

                  {isPostSolver && (
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 flex items-center gap-1">
                      <Zap className="w-2.5 h-2.5" />
                      <span>Solver</span>
                    </span>
                  )}

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500">
                    {post.topic}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-400 font-mono">{new Date(post.date).toLocaleDateString()}</span>
                  
                  {hasModPerks && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="p-1 rounded-md hover:bg-rose-50 dark:hover:bg-rose-950 text-rose-500 transition cursor-pointer"
                        title="Delete question post"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleBanAuthor(post.author, post.authorId)}
                        className="p-1 rounded-md hover:bg-rose-50 dark:hover:bg-rose-950 text-rose-600 transition cursor-pointer"
                        title="Ban abusive poster"
                      >
                        <Ban className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Title & Body */}
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                {post.questionTitle}
              </h3>

              <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                <MathRenderer content={post.content} />
              </div>

              {/* Post Footer & Controls */}
              <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => handleUpvote(post.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-purple-100 dark:hover:bg-purple-950 hover:text-purple-600 text-slate-600 dark:text-slate-400 font-bold transition cursor-pointer"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Upvote ({post.upvotes})</span>
                </button>

                <button
                  onClick={() => toggleComments(post.id)}
                  className="flex items-center gap-1 text-[11px] font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{(post.comments || []).length} Replies</span>
                  {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>
              </div>

              {/* Replies Section */}
              {isExpanded && (
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
                  
                  {/* List of Replies */}
                  {(post.comments || []).length > 0 && (
                    <div className="space-y-2 pl-2 sm:pl-4 border-l-2 border-slate-200 dark:border-slate-800">
                      {post.comments.map(comment => {
                        const isFacultyReply = comment.authorRole === 'faculty' || comment.authorRole === 'mentor' || (comment.author && (comment.author.startsWith('Dr.') || comment.author.startsWith('Prof.') || comment.author.startsWith('Er.')));
                        const isSolverReply = comment.authorRole === 'solver';

                        return (
                          <div 
                            key={comment.id} 
                            className={`p-3 rounded-2xl border text-xs space-y-1 ${
                              isFacultyReply
                                ? 'bg-slate-50/80 dark:bg-slate-900/80 border-indigo-200/60 dark:border-indigo-800/40'
                                : (isSolverReply 
                                    ? 'bg-slate-50/80 dark:bg-slate-900/80 border-amber-200/60 dark:border-amber-800/40' 
                                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800')
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className={`font-bold text-xs ${
                                  isFacultyReply 
                                    ? 'text-indigo-900 dark:text-indigo-200' 
                                    : (isSolverReply ? 'text-amber-900 dark:text-amber-200' : 'text-slate-900 dark:text-white')
                                }`}>
                                  {comment.author}
                                </span>

                                {isFacultyReply && (
                                  <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 flex items-center gap-0.5">
                                    <Award className="w-2.5 h-2.5" />
                                    <span>{comment.authorRole === 'mentor' ? 'Faculty Mentor' : 'Faculty'}</span>
                                  </span>
                                )}

                                {isSolverReply && (
                                  <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 flex items-center gap-0.5">
                                    <Zap className="w-2.5 h-2.5" />
                                    <span>Solver</span>
                                  </span>
                                )}

                                {comment.department && (
                                  <span className="text-[9px] font-mono text-slate-400">
                                    [{comment.department.replace(/ \(.+\)/, '')}]
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center gap-2">
                                <span className="text-[10px] text-slate-400 font-mono">
                                  {comment.date ? new Date(comment.date).toLocaleDateString() : ''}
                                </span>

                                {hasModPerks && (
                                  <div className="flex items-center gap-1">
                                    <button
                                      onClick={() => handleDeleteComment(post.id, comment.id)}
                                      className="p-0.5 text-rose-500 hover:text-rose-600"
                                      title="Delete reply"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </button>
                                    <button
                                      onClick={() => handleBanAuthor(comment.author, comment.authorId)}
                                      className="p-0.5 text-rose-600 hover:text-rose-700"
                                      title="Ban user"
                                    >
                                      <Ban className="w-3 h-3" />
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="text-slate-800 dark:text-slate-200 font-medium leading-relaxed pt-0.5">
                              <MathRenderer content={comment.text} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Reply Input Box */}
                  {!isBanned && (
                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="text"
                        placeholder="Write a helpful reply or derivation step..."
                        value={commentDrafts[post.id] || ''}
                        onChange={(e) => setCommentDrafts({ ...commentDrafts, [post.id]: e.target.value })}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleAddComment(post.id); }}
                        className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-purple-500"
                      />
                      <button
                        onClick={() => handleAddComment(post.id)}
                        disabled={!commentDrafts[post.id]?.trim()}
                        className="px-3.5 py-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1"
                      >
                        <Send className="w-3 h-3" />
                        <span>Reply</span>
                      </button>
                    </div>
                  )}

                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
}
