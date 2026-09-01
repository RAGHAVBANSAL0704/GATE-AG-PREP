import React, { useState, useEffect, useRef } from 'react';
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
  ChevronUp, 
  Copy, 
  Check,
  Trophy,
  Paperclip,
  Image as ImageIcon,
  Flag,
  X,
  Star,
  CheckCircle
} from 'lucide-react';
import MathRenderer from './MathRenderer';
import { validateCleanInput, sanitizeText } from '../utils/profanityFilter';
import { saveToIDB, getAllFromIDB } from '../utils/indexedDB';
import { 
  canModerate, 
  isUserBanned, 
  banUser, 
  markVerifiedSolution, 
  getTopSolversLeaderboard,
  flagMessage 
} from '../services/userRoleService';
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
        isVerifiedSolution: true,
        date: '2026-08-20T16:00:00Z'
      },
      { 
        id: 'c2', 
        author: 'Rahul_AG', 
        authorRole: 'solver',
        text: 'Super helpful shortcut for GATE AG 2026 Q12!',
        isVerifiedSolution: false,
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
        isVerifiedSolution: true,
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
  const [postImageAttachment, setPostImageAttachment] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);
  const [expandedComments, setExpandedComments] = useState({});
  const [commentDrafts, setCommentDrafts] = useState({});
  const [commentImageAttachments, setCommentImageAttachments] = useState({});
  const [actionNotice, setActionNotice] = useState('');
  const [copiedCommentId, setCopiedCommentId] = useState(null);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [topSolvers, setTopSolvers] = useState([]);

  const postFileInputRef = useRef(null);
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

  const openLeaderboard = () => {
    setTopSolvers(getTopSolversLeaderboard());
    setIsLeaderboardOpen(true);
  };

  // Image upload with canvas compression for posts
  const handlePostImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const scale = MAX_WIDTH / img.width;
        canvas.width = Math.min(img.width, MAX_WIDTH);
        canvas.height = img.width > MAX_WIDTH ? img.height * scale : img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        setPostImageAttachment(canvas.toDataURL('image/jpeg', 0.75));
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

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
      imageUrl: postImageAttachment || null,
      upvotes: 1,
      date: new Date().toISOString(),
      comments: []
    };

    const updated = [newPostObj, ...posts];
    setPosts(updated);
    await saveToIDB('community_posts', newPostObj);

    setNewTitle('');
    setNewContent('');
    setPostImageAttachment(null);
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 3000);
  };

  const handleAddComment = (postId) => {
    const draft = commentDrafts[postId];
    const attachedImg = commentImageAttachments[postId];
    if ((!draft || !draft.trim()) && !attachedImg) return;

    if (isBanned) {
      setActionNotice('Account restricted from commenting.');
      return;
    }

    if (draft && draft.trim()) {
      const val = validateCleanInput(draft, 'Reply Comment');
      if (!val.isValid) {
        setActionNotice(val.message);
        return;
      }
    }

    const authorName = currentStudent?.display_name || currentStudent?.full_name || currentStudent?.username || 'GATE Aspirant';
    const userRole = (currentStudent?.role || (currentStudent?.is_faculty ? 'faculty' : 'student')).toLowerCase();

    const newComment = {
      id: 'c_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      author: authorName,
      authorId: currentStudent?.id || currentStudent?.username || null,
      authorRole: userRole,
      department: currentStudent?.department || null,
      photoUrl: currentStudent?.profile_photo_url || null,
      text: sanitizeText((draft || '').trim()),
      imageUrl: attachedImg || null,
      isVerifiedSolution: false,
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
        replySnippet: (draft || '').trim()
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
    setCommentImageAttachments({ ...commentImageAttachments, [postId]: null });
    setExpandedComments({ ...expandedComments, [postId]: true });
  };

  // Mark as Verified Solution (Author or Faculty/Mentor/Admin)
  const handleToggleVerifySolution = (postId, commentId) => {
    const targetPost = posts.find(p => p.id === postId);
    if (!targetPost) return;

    const targetComment = targetPost.comments?.find(c => c.id === commentId);
    if (!targetComment) return;

    const willBeVerified = !targetComment.isVerifiedSolution;

    if (willBeVerified) {
      markVerifiedSolution(
        targetComment.authorId || targetComment.author,
        targetComment.author,
        targetComment.authorRole
      );
      setActionNotice(`✅ Marked as Verified Solution! Awarded +25 Contributor XP to ${targetComment.author}.`);
    } else {
      setActionNotice("Verified solution mark removed.");
    }

    const updated = posts.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          comments: (p.comments || []).map(c => 
            c.id === commentId ? { ...c, isVerifiedSolution: willBeVerified } : c
          )
        };
      }
      return p;
    });

    setPosts(updated);
    setTimeout(() => setActionNotice(''), 3500);
  };

  const handleUpvote = (postId) => {
    setPosts(posts.map(p => p.id === postId ? { ...p, upvotes: p.upvotes + 1 } : p));
  };

  const toggleComments = (postId) => {
    setExpandedComments(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleCopyFormula = (e, text) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setActionNotice("Copied LaTeX to clipboard!");
    setTimeout(() => setActionNotice(''), 2500);
  };

  // Flag inappropriate discussion
  const handleReportPost = (postId, postTitle) => {
    flagMessage({
      messageId: postId,
      messageText: postTitle,
      authorName: 'Discussion Author',
      flaggedBy: currentStudent?.full_name || currentStudent?.username || 'Student',
      reason: 'Inappropriate discussion content'
    });
    setActionNotice("Discussion reported to moderators.");
    setTimeout(() => setActionNotice(''), 3000);
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
              Post numerical doubts, formula shortcuts, and mark verified solutions to earn solver badges.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={openLeaderboard}
              className="px-3.5 py-2 rounded-2xl bg-amber-50 dark:bg-amber-950/60 hover:bg-amber-100 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
            >
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>Top Solvers</span>
            </button>

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
      </div>

      {/* Action Notice */}
      {actionNotice && (
        <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
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

            {/* Attached Image Preview */}
            {postImageAttachment && (
              <div className="relative inline-block border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden p-1">
                <img src={postImageAttachment} alt="Attached Preview" className="h-24 w-auto rounded-lg object-contain" />
                <button 
                  type="button" 
                  onClick={() => setPostImageAttachment(null)}
                  className="absolute top-1 right-1 p-0.5 rounded-full bg-black/60 text-white hover:bg-black cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}

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

            <div className="flex items-center justify-between pt-1">
              <input
                type="file"
                ref={postFileInputRef}
                onChange={handlePostImageSelect}
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => postFileInputRef.current?.click()}
                className="px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-bold flex items-center gap-1.5 transition cursor-pointer"
              >
                <Paperclip className="w-3.5 h-3.5" />
                <span>Attach Diagram</span>
              </button>

              <button
                type="submit"
                className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-extrabold flex items-center gap-1.5 shadow-xs transition cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Publish Discussion</span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Discussion List Feed */}
      <div className="space-y-4">
        {filteredPosts.map(post => {
          const isFacultyPost = post.authorRole === 'faculty' || post.authorRole === 'mentor' || (post.author && (post.author.startsWith('Dr.') || post.author.startsWith('Prof.') || post.author.startsWith('Er.')));
          const isSolverPost = post.authorRole === 'solver';
          const isExpanded = Boolean(expandedComments[post.id]);
          const commentsCount = post.comments?.length || 0;
          const isPostAuthor = (currentStudent?.full_name === post.author) || (currentStudent?.username === post.author) || (currentStudent?.id === post.authorId);
          const canVerify = isPostAuthor || hasModPerks;

          return (
            <div key={post.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-xs">
              
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    isFacultyPost ? 'bg-emerald-600 text-white ring-2 ring-emerald-400/50' : (isSolverPost ? 'bg-amber-500 text-white ring-2 ring-amber-400/50' : 'bg-purple-600 text-white')
                  }`}>
                    {post.photoUrl ? (
                      <img src={post.photoUrl} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      isFacultyPost ? <Award className="w-3.5 h-3.5" /> : (isSolverPost ? <Zap className="w-3.5 h-3.5" /> : (post.author?.[0] || 'U'))
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-bold text-xs text-slate-900 dark:text-white">{post.author}</span>
                      
                      {isFacultyPost && (
                        <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-0.5">
                          <Award className="w-2.5 h-2.5" />
                          <span>{post.authorRole === 'mentor' ? 'Faculty Mentor' : 'Faculty'}</span>
                        </span>
                      )}

                      {isSolverPost && (
                        <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 flex items-center gap-0.5">
                          <Zap className="w-2.5 h-2.5" />
                          <span>Solver</span>
                        </span>
                      )}

                      {post.department && (
                        <span className="text-[9px] font-mono text-slate-500">
                          [{post.department.replace(/ \(.+\)/, '')}]
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                      {new Date(post.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-700 dark:text-slate-300">
                    #{post.topic}
                  </span>

                  {/* Student Flag */}
                  {!hasModPerks && !isPostAuthor && (
                    <button
                      onClick={() => handleReportPost(post.id, post.questionTitle)}
                      className="p-1 text-slate-400 hover:text-rose-500 transition cursor-pointer"
                      title="Report discussion"
                    >
                      <Flag className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {/* Moderator Controls */}
                  {hasModPerks && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="p-1 text-rose-500 hover:text-rose-600 rounded hover:bg-rose-50 dark:hover:bg-rose-950 transition cursor-pointer"
                        title="Delete discussion"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleBanAuthor(post.author, post.authorId)}
                        className="p-1 text-rose-600 hover:text-rose-700 rounded hover:bg-rose-50 dark:hover:bg-rose-950 transition cursor-pointer"
                        title="Ban user"
                      >
                        <Ban className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Title & Body */}
              <div className="space-y-2">
                <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                  {post.questionTitle}
                </h4>
                <div className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed font-medium">
                  <MathRenderer content={post.content} />
                </div>
              </div>

              {/* Attached Diagram / Working Figure */}
              {post.imageUrl && (
                <div className="my-2 max-w-md rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950/5">
                  <img src={post.imageUrl} alt="Attached Discussion Figure" className="max-h-72 w-auto object-contain rounded-xl" />
                </div>
              )}

              {/* Actions Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleUpvote(post.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-bold text-slate-700 dark:text-slate-300 transition cursor-pointer"
                  >
                    <ThumbsUp className="w-3.5 h-3.5 text-purple-600" />
                    <span>{post.upvotes}</span>
                  </button>

                  <button
                    onClick={() => toggleComments(post.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-bold text-slate-700 dark:text-slate-300 transition cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-blue-600" />
                    <span>{commentsCount} Replies</span>
                    {isExpanded ? <ChevronUp className="w-3 h-3 ml-0.5" /> : <ChevronDown className="w-3 h-3 ml-0.5" />}
                  </button>
                </div>

                <span className="text-[10px] font-mono text-slate-500">GATE AG Hub</span>
              </div>

              {/* Comments Section */}
              {isExpanded && (
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3 animate-in fade-in">
                  {commentsCount > 0 && (
                    <div className="space-y-2.5">
                      {post.comments.map(comment => {
                        const isFacultyReply = comment.authorRole === 'faculty' || comment.authorRole === 'mentor' || (comment.author && (comment.author.startsWith('Dr.') || comment.author.startsWith('Prof.') || comment.author.startsWith('Er.')));
                        const isSolverReply = comment.authorRole === 'solver';
                        const isVerified = Boolean(comment.isVerifiedSolution);

                        return (
                          <div 
                            key={comment.id} 
                            className={`p-3.5 rounded-2xl border text-xs space-y-2 transition ${
                              isVerified
                                ? 'bg-gradient-to-r from-emerald-50/60 via-slate-50 to-transparent dark:from-emerald-950/30 dark:via-slate-900/80 dark:to-slate-900/40 border-emerald-500/40 shadow-xs ring-1 ring-emerald-500/20'
                                : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800'
                            }`}
                          >
                            {/* Verified Solution Header */}
                            {isVerified && (
                              <div className="flex items-center justify-between pb-1.5 border-b border-emerald-500/20 text-[10px] font-extrabold text-emerald-700 dark:text-emerald-400">
                                <span className="flex items-center gap-1">
                                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                                  <span>Verified Solution (+25 XP Awarded)</span>
                                </span>
                                <span className="font-mono text-[9px] text-emerald-600 dark:text-emerald-400 font-bold">Accepted Answer</span>
                              </div>
                            )}

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className={`font-bold text-xs ${
                                  isFacultyReply 
                                    ? 'text-emerald-900 dark:text-emerald-200' 
                                    : (isSolverReply ? 'text-amber-900 dark:text-amber-200' : 'text-slate-900 dark:text-white')
                                }`}>
                                  {comment.author}
                                </span>

                                {isFacultyReply && (
                                  <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-0.5">
                                    <Award className="w-2.5 h-2.5" />
                                    <span>{comment.authorRole === 'mentor' ? 'Faculty Mentor' : 'Faculty'}</span>
                                  </span>
                                )}

                                {isSolverReply && (
                                  <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 flex items-center gap-0.5">
                                    <Zap className="w-2.5 h-2.5" />
                                    <span>Solver</span>
                                  </span>
                                )}

                                {comment.department && (
                                  <span className="text-[9px] font-mono text-slate-500">
                                    [{comment.department.replace(/ \(.+\)/, '')}]
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center gap-2">
                                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                                  {comment.date ? new Date(comment.date).toLocaleDateString() : ''}
                                </span>

                                {hasModPerks && (
                                  <div className="flex items-center gap-1">
                                    <button
                                      onClick={() => handleDeleteComment(post.id, comment.id)}
                                      className="p-0.5 text-rose-500 hover:text-rose-600 cursor-pointer"
                                      title="Delete reply"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </button>
                                    <button
                                      onClick={() => handleBanAuthor(comment.author, comment.authorId)}
                                      className="p-0.5 text-rose-600 hover:text-rose-700 cursor-pointer"
                                      title="Ban user"
                                    >
                                      <Ban className="w-3 h-3" />
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="text-slate-900 dark:text-slate-100 font-medium leading-relaxed pt-0.5">
                              <MathRenderer content={comment.text} />
                            </div>

                            {/* Reply Action Tools: Mark Verified & Copy Formula */}
                            <div className="flex items-center justify-between pt-1 text-[10px]">
                              {canVerify && (
                                <button
                                  onClick={() => handleToggleVerifySolution(post.id, comment.id)}
                                  className={`font-bold flex items-center gap-1 transition cursor-pointer px-2 py-0.5 rounded-md ${
                                    isVerified 
                                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300' 
                                      : 'text-slate-500 hover:text-emerald-600'
                                  }`}
                                >
                                  <CheckCircle className="w-3 h-3" />
                                  <span>{isVerified ? 'Verified Solution ✅' : 'Mark Verified'}</span>
                                </button>
                              )}

                              <button
                                onClick={(e) => handleCopyFormula(e, comment.text)}
                                className="font-mono font-semibold text-slate-500 hover:text-emerald-600 flex items-center gap-1 transition cursor-pointer ml-auto"
                                title="Copy response content / formulas"
                              >
                                <Copy className="w-3 h-3" />
                                <span>Copy LaTeX</span>
                              </button>
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

      {/* Top Solvers Leaderboard Modal */}
      {isLeaderboardOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
          <div 
            className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
                  Top Peer Solvers & Mentors
                </h3>
              </div>
              <button onClick={() => setIsLeaderboardOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1 text-xs">
              {topSolvers.length === 0 ? (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 text-center text-slate-500">
                  Be the first to solve a student doubt and earn the Verified Solver badge! (+25 Contributor XP)
                </div>
              ) : (
                topSolvers.map((s, idx) => (
                  <div key={s.id} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold flex items-center justify-center font-mono text-xs">
                        #{idx + 1}
                      </span>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
                          <span>{s.name}</span>
                          <Zap className="w-3 h-3 text-amber-500" />
                        </div>
                        <span className="text-[10px] text-slate-500">{s.solvedCount} Verified Doubts Solved</span>
                      </div>
                    </div>

                    <span className="px-2 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold font-mono text-xs">
                      +{s.contributorXP} XP
                    </span>
                  </div>
                ))
              )}
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setIsLeaderboardOpen(false)}
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
