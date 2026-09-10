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
  CheckCircle,
  Search,
  Plus,
  ArrowUpDown,
  Code2
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

const TOPIC_CATEGORIES = [
  { id: 'All', label: 'All Topics' },
  { id: 'FMP', label: 'Farm Machinery (FMP)' },
  { id: 'SWCE', label: 'Soil & Water (SWCE)' },
  { id: 'APFE', label: 'Food Processing (APFE)' },
  { id: 'Maths', label: 'Engineering Maths' },
  { id: 'General', label: 'Strategy & General' }
];

const MATH_CHIPS = [
  { label: '√x', latex: '\\sqrt{}' },
  { label: 'x²', latex: '^2' },
  { label: 'a/b', latex: '\\frac{}{}' },
  { label: 'λ', latex: '\\lambda' },
  { label: 'η', latex: '\\eta' },
  { label: 'Δ', latex: '\\Delta' },
  { label: 'Σ', latex: '\\sum' },
  { label: '∫', latex: '\\int' },
  { label: 'π', latex: '\\pi' },
  { label: '±', latex: '\\pm' }
];

const INITIAL_POSTS = [
  {
    id: 'post_1',
    author: 'AIR_1_Aspirant',
    authorRole: 'student',
    topic: 'FMP',
    questionTitle: 'Short Shortcut Trick for Tractor Drawbar Pull Questions',
    content: 'When calculating draft force in moldboard plows, use $D = C_s \\cdot w \\cdot d$. Remember to convert speed to m/s before multiplying by draft force for power ($P = D \\times v$)!',
    upvotes: 24,
    date: '2026-08-20T14:30:00Z',
    comments: [
      { 
        id: 'c1', 
        author: 'Dr. Rajesh Kumar', 
        authorRole: 'faculty',
        department: 'FMPE',
        text: 'Correct. Also note that for dynamic traction ratio calculation, always check if weight transfer from the implement is included.',
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
    content: 'Watch out for potential maximum retention $S = \\frac{25400}{CN} - 254$. In GATE NAT questions, $S$ and precipitation $P$ must be in millimeters! For runoff $Q = \\frac{(P - 0.2S)^2}{P + 0.8S}$, remember $P > 0.2S$.',
    upvotes: 19,
    date: '2026-08-22T09:15:00Z',
    comments: [
      {
        id: 'c3',
        author: 'Er. Sunil Sharma',
        authorRole: 'mentor',
        department: 'SWCE',
        text: 'Good point. If the CN formula uses inches, then $S = \\frac{1000}{CN} - 10$ and $Q$ is computed with rainfall in inches.',
        isVerifiedSolution: true,
        date: '2026-08-22T11:30:00Z'
      }
    ]
  },
  {
    id: 'post_3',
    author: 'Deepak_HAU',
    authorRole: 'student',
    topic: 'APFE',
    questionTitle: 'Psychrometric Chart vs Formula for Enthalpy of Moist Air',
    content: 'Is it faster to use the formula $h = 1.006 t + w(2501 + 1.88 t)$ for humid heat enthalpy or estimate from psychrometric chart? In NAT questions, does the key tolerate rounding to 1 decimal place?',
    upvotes: 12,
    date: '2026-08-25T11:00:00Z',
    comments: [
      {
        id: 'c4',
        author: 'Ankit_HAU',
        authorRole: 'solver',
        text: 'Always use the formula $h = 1.006t + w(2501 + 1.88t)$! In GATE AG NAT, official keys use the analytical equation with ±0.5 tolerance.',
        isVerifiedSolution: true,
        date: '2026-08-25T12:20:00Z'
      }
    ]
  }
];

export default function CommunityDiscussions({ currentStudent, onRequireAuth }) {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'solved', 'unsolved'
  const [sortBy, setSortBy] = useState('upvotes'); // 'upvotes', 'latest'
  const [searchQuery, setSearchQuery] = useState('');
  
  // New Post Modal State
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newTopic, setNewTopic] = useState('FMP');
  const [postImageAttachment, setPostImageAttachment] = useState(null);
  const [showMathRibbon, setShowMathRibbon] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);

  // Comments / Answers State
  const [expandedComments, setExpandedComments] = useState({});
  const [commentDrafts, setCommentDrafts] = useState({});
  const [commentImageAttachments, setCommentImageAttachments] = useState({});
  const [actionNotice, setActionNotice] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [topSolvers, setTopSolvers] = useState([]);

  const postFileInputRef = useRef(null);
  const postContentRef = useRef(null);
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

  // Insert Math Symbol at cursor position in new post
  const handleInsertMathInPost = (snippet) => {
    const input = postContentRef.current;
    if (!input) {
      setNewContent(prev => prev + ` $${snippet}$ `);
      return;
    }
    const start = input.selectionStart || 0;
    const end = input.selectionEnd || 0;
    const text = newContent;
    const mathStr = ` $${snippet}$ `;
    const updated = text.substring(0, start) + mathStr + text.substring(end);
    setNewContent(updated);
    setTimeout(() => {
      input.focus();
      const nextPos = start + mathStr.length;
      input.setSelectionRange(nextPos, nextPos);
    }, 50);
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
    if (!currentStudent && onRequireAuth) {
      onRequireAuth("Sign In or Register free to ask questions & post discussions in the community!");
      return;
    }
    setErrorMsg('');
    setActionNotice('');

    if (isBanned) {
      setErrorMsg('Your account is restricted from posting due to community moderation.');
      return;
    }

    if (!newTitle.trim() || !newContent.trim()) {
      setErrorMsg('Please enter both a title and details.');
      return;
    }

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
      topic: newTopic || 'General',
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
    setIsPostModalOpen(false);
    setActionNotice('🎉 Question successfully posted to discussion board!');
    setTimeout(() => setActionNotice(''), 3500);
  };

  const handleAddComment = (postId) => {
    if (!currentStudent && onRequireAuth) {
      onRequireAuth("Sign In or Register free to reply to community discussions!");
      return;
    }
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
    if (!currentStudent && onRequireAuth) {
      onRequireAuth("Sign In or Register free to upvote community discussions!");
      return;
    }
    setPosts(posts.map(p => p.id === postId ? { ...p, upvotes: p.upvotes + 1 } : p));
  };

  const toggleComments = (postId) => {
    setExpandedComments(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleCopyText = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
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

  // Filter & Sort Discussions
  const filteredAndSortedPosts = posts
    .filter(p => {
      if (selectedTopic !== 'All' && p.topic !== selectedTopic) return false;
      const hasVerified = p.comments?.some(c => c.isVerifiedSolution);
      if (statusFilter === 'solved' && !hasVerified) return false;
      if (statusFilter === 'unsolved' && hasVerified) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        p.questionTitle?.toLowerCase().includes(q) ||
        p.content?.toLowerCase().includes(q) ||
        p.author?.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      if (sortBy === 'latest') {
        return new Date(b.date || 0) - new Date(a.date || 0);
      }
      return (b.upvotes || 0) - (a.upvotes || 0);
    });

  const totalQuestions = posts.length;
  const verifiedQuestions = posts.filter(p => p.comments?.some(c => c.isVerifiedSolution)).length;

  return (
    <div className="max-w-5xl mx-auto space-y-4 sm:space-y-5 animate-in fade-in duration-200">
      
      {/* Top Interactive Q&A Control Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xs space-y-4">
        
        {/* Main Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-bold border border-indigo-200 dark:border-indigo-800">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Crowdsourced Q&A Forum</span>
              </span>
              <span className="text-xs text-slate-500 font-mono font-medium">
                {verifiedQuestions}/{totalQuestions} Solved
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
              GATE AG Questions, Shortcuts & Solutions
            </h2>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            {/* Top Solvers Trigger */}
            <button
              onClick={openLeaderboard}
              className="px-3.5 py-2 rounded-2xl bg-amber-50 dark:bg-amber-950/60 hover:bg-amber-100 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
            >
              <Trophy className="w-4 h-4 text-amber-500" />
              <span className="hidden sm:inline">Top Solvers</span>
            </button>

            {/* Ask Question Primary Button */}
            <button
              onClick={() => {
                if (!currentStudent && onRequireAuth) {
                  onRequireAuth("Sign In or Register free to ask questions & share shortcuts!");
                  return;
                }
                setIsPostModalOpen(true);
              }}
              className="px-4 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black flex items-center gap-1.5 shadow-xs transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Ask Question / Trick</span>
            </button>
          </div>
        </div>

        {/* Search & Topic Filters Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          
          {/* Instant Search Bar */}
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search doubts, formula shortcuts, derivations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-8 py-2 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Status & Sort Controls */}
          <div className="flex items-center gap-2 overflow-x-auto shrink-0 scrollbar-none">
            {/* Status Pills */}
            <div className="inline-flex p-0.5 bg-slate-100 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-[11px] font-bold">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                  statusFilter === 'all' ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setStatusFilter('solved')}
                className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                  statusFilter === 'solved' ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-xs' : 'text-slate-500'
                }`}
              >
                ✓ Solved
              </button>
              <button
                onClick={() => setStatusFilter('unsolved')}
                className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                  statusFilter === 'unsolved' ? 'bg-white dark:bg-slate-800 text-amber-600 dark:text-amber-400 shadow-xs' : 'text-slate-500'
                }`}
              >
                Unanswered
              </button>
            </div>

            {/* Sort Toggle */}
            <button
              onClick={() => setSortBy(sortBy === 'upvotes' ? 'latest' : 'upvotes')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition cursor-pointer shrink-0"
              title="Change sort order"
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>{sortBy === 'upvotes' ? 'Trending' : 'Latest'}</span>
            </button>
          </div>

        </div>

        {/* Topic Pill Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {TOPIC_CATEGORIES.map(tc => {
            const isSelected = selectedTopic === tc.id;
            return (
              <button
                key={tc.id}
                onClick={() => setSelectedTopic(tc.id)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {tc.label}
              </button>
            );
          })}
        </div>

      </div>

      {/* Action Notice */}
      {actionNotice && (
        <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Discussion Question Cards Stream */}
      <div className="space-y-3.5">
        {filteredAndSortedPosts.length === 0 ? (
          <div className="p-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl text-center space-y-3">
            <MessageSquare className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-600" />
            <div className="text-sm font-bold text-slate-700 dark:text-slate-300">
              No questions found matching your criteria.
            </div>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search terms or be the first to ask a numerical question in this section!
            </p>
          </div>
        ) : (
          filteredAndSortedPosts.map(post => {
            const isFacultyPost = post.authorRole === 'faculty' || post.authorRole === 'mentor' || (post.author && (post.author.startsWith('Dr.') || post.author.startsWith('Prof.') || post.author.startsWith('Er.')));
            const isSolverPost = post.authorRole === 'solver';
            const isExpanded = Boolean(expandedComments[post.id]);
            const commentsCount = post.comments?.length || 0;
            const verifiedComment = post.comments?.find(c => c.isVerifiedSolution);
            const isSolved = Boolean(verifiedComment);
            const isPostAuthor = (currentStudent?.full_name === post.author) || (currentStudent?.username === post.author) || (currentStudent?.id === post.authorId);
            const canVerify = isPostAuthor || hasModPerks;

            return (
              <div 
                key={post.id} 
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xs space-y-3 transition-all hover:border-slate-300 dark:hover:border-slate-700"
              >
                
                {/* Question Top Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    
                    {/* Author Avatar */}
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                      isFacultyPost ? 'bg-indigo-600 text-white' : (isSolverPost ? 'bg-amber-500 text-white' : 'bg-emerald-600 text-white')
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
                          <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 flex items-center gap-0.5">
                            <Award className="w-2.5 h-2.5" />
                            <span>{post.authorRole === 'mentor' ? 'Faculty Mentor' : 'Faculty'}</span>
                          </span>
                        )}

                        {isSolverPost && (
                          <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 flex items-center gap-0.5">
                            <Zap className="w-2.5 h-2.5" />
                            <span>Solver</span>
                          </span>
                        )}

                        {post.department && (
                          <span className="text-[9px] font-mono text-slate-400">
                            [{post.department.replace(/ \(.+\)/, '')}]
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {new Date(post.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-300">
                      #{post.topic}
                    </span>

                    {/* Copy LaTeX / Content */}
                    <button
                      onClick={() => handleCopyText(post.id, post.content)}
                      className="p-1 text-slate-400 hover:text-emerald-600 transition cursor-pointer"
                      title="Copy content / LaTeX"
                    >
                      {copiedId === post.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>

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

                {/* Title & Content */}
                <div className="space-y-1.5">
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white leading-snug">
                    {post.questionTitle}
                  </h3>
                  <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                    <MathRenderer content={post.content} />
                  </div>
                </div>

                {/* Attached Diagram / Image */}
                {post.imageUrl && (
                  <div className="my-2 max-w-md rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950/5">
                    <img src={post.imageUrl} alt="Attached Discussion Figure" className="max-h-72 w-auto object-contain rounded-xl" />
                  </div>
                )}

                {/* Pinned Verified Solution (Highlight Ribbon) */}
                {isSolved && verifiedComment && !isExpanded && (
                  <div className="p-3 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-bold text-emerald-800 dark:text-emerald-300">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        <span>Accepted Verified Solution by {verifiedComment.author}</span>
                      </div>
                      <span className="font-mono text-[10px] text-emerald-600 bg-emerald-100 dark:bg-emerald-900/60 px-2 py-0.5 rounded-full">
                        +25 Solver XP
                      </span>
                    </div>
                    <div className="text-xs text-slate-800 dark:text-slate-200 line-clamp-2">
                      <MathRenderer content={verifiedComment.text} />
                    </div>
                  </div>
                )}

                {/* Bottom Action Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <div className="flex items-center gap-2">
                    {/* Upvote Button */}
                    <button
                      onClick={() => handleUpvote(post.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950 hover:text-emerald-600 text-slate-700 dark:text-slate-300 font-bold transition cursor-pointer"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{post.upvotes}</span>
                    </button>

                    {/* Replies / Comments Expand Button */}
                    <button
                      onClick={() => toggleComments(post.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition cursor-pointer ${
                        isSolved
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>{commentsCount} {commentsCount === 1 ? 'Answer' : 'Answers'}</span>
                      {isSolved && <CheckCircle className="w-3 h-3 text-emerald-600" />}
                      {isExpanded ? <ChevronUp className="w-3 h-3 ml-0.5" /> : <ChevronDown className="w-3 h-3 ml-0.5" />}
                    </button>
                  </div>

                  <span className="text-[10px] font-mono text-slate-400">
                    GATE AG Peer Forum
                  </span>
                </div>

                {/* Expanded Answers & Comments Section */}
                {isExpanded && (
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3 animate-in fade-in">
                    
                    {/* Answers List */}
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
                                  ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/80 shadow-xs'
                                  : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800'
                              }`}
                            >
                              {/* Verified Ribbon */}
                              {isVerified && (
                                <div className="flex items-center justify-between pb-1.5 border-b border-emerald-200 dark:border-emerald-800/40 text-[10px] font-extrabold text-emerald-700 dark:text-emerald-400">
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
                                      ? 'text-indigo-900 dark:text-indigo-200' 
                                      : (isSolverReply ? 'text-amber-900 dark:text-amber-200' : 'text-slate-900 dark:text-white')
                                  }`}>
                                    {comment.author}
                                  </span>

                                  {isFacultyReply && (
                                    <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 flex items-center gap-0.5">
                                      <Award className="w-2.5 h-2.5" />
                                      <span>Faculty</span>
                                    </span>
                                  )}

                                  {isSolverReply && (
                                    <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 flex items-center gap-0.5">
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

                              <div className="text-slate-800 dark:text-slate-200 font-medium leading-relaxed pt-0.5">
                                <MathRenderer content={comment.text} />
                              </div>

                              {/* Verified Solution Button & Copy Action */}
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
                                    <span>{isVerified ? 'Verified Solution ✅' : 'Mark Verified Solution'}</span>
                                  </button>
                                )}

                                <button
                                  onClick={() => handleCopyText(comment.id, comment.text)}
                                  className="font-mono font-semibold text-slate-400 hover:text-emerald-600 flex items-center gap-1 transition cursor-pointer ml-auto"
                                  title="Copy response LaTeX"
                                >
                                  {copiedId === comment.id ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                                  <span>Copy LaTeX</span>
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Write Reply / Answer Input */}
                    {!isBanned && (
                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="text"
                          placeholder="Write your explanation or derivation step (LaTeX supported)..."
                          value={commentDrafts[post.id] || ''}
                          onChange={(e) => setCommentDrafts({ ...commentDrafts, [post.id]: e.target.value })}
                          onKeyDown={(e) => { if (e.key === 'Enter') handleAddComment(post.id); }}
                          className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                        <button
                          onClick={() => handleAddComment(post.id)}
                          disabled={!commentDrafts[post.id]?.trim()}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1 shrink-0"
                        >
                          <Send className="w-3 h-3" />
                          <span>Answer</span>
                        </button>
                      </div>
                    )}

                  </div>
                )}

              </div>
            );
          })
        )}
      </div>

      {/* Modal Composer: "Ask Question / Share Trick" */}
      {isPostModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
          <div 
            className="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
                  Ask Question / Share Shortcut
                </h3>
              </div>
              <button 
                onClick={() => setIsPostModalOpen(false)} 
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-3.5 text-xs">
              
              {/* Topic Selector */}
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Subject Section
                </label>
                <select
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white font-medium outline-none cursor-pointer"
                >
                  <option value="FMP">🚜 Farm Machinery & Power (FMP)</option>
                  <option value="SWCE">💧 Soil & Water Conservation (SWCE)</option>
                  <option value="APFE">🌾 Food & Agricultural Processing (APFE)</option>
                  <option value="Maths">📐 Engineering Mathematics</option>
                  <option value="General">🎯 Exam Strategy & General</option>
                </select>
              </div>

              {/* Title Input */}
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Question Title / Concept
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Short trick for Tractor Drawbar Draft calculation"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-slate-900 dark:text-white font-medium outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Description / Numerical content */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block font-bold text-slate-700 dark:text-slate-300">
                    Numerical Problem / Explanation (LaTeX supported)
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowMathRibbon(!showMathRibbon)}
                    className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-0.5 cursor-pointer"
                  >
                    <Code2 className="w-3 h-3" />
                    <span>{showMathRibbon ? 'Hide Math Chips' : 'Show Math Chips'}</span>
                  </button>
                </div>

                {/* Math Ribbon in Modal */}
                {showMathRibbon && (
                  <div className="p-2 mb-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center gap-1 overflow-x-auto scrollbar-none">
                    {MATH_CHIPS.map(chip => (
                      <button
                        key={chip.label}
                        type="button"
                        onClick={() => handleInsertMathInPost(chip.latex)}
                        className="px-2 py-0.5 rounded bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-mono font-bold border border-slate-200 dark:border-slate-700 cursor-pointer shrink-0"
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>
                )}

                <textarea
                  ref={postContentRef}
                  rows={4}
                  required
                  placeholder="Type your question or formula breakdown here. Example: Calculate draft force $D = C_s \cdot w \cdot d$..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-slate-900 dark:text-white font-medium outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                />
              </div>

              {/* Image Preview */}
              {postImageAttachment && (
                <div className="relative inline-block border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden p-1">
                  <img src={postImageAttachment} alt="Preview" className="h-20 w-auto rounded-lg object-contain" />
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
                <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 text-rose-700 dark:text-rose-300 font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
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

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsPostModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-extrabold flex items-center gap-1.5 shadow-xs transition cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Publish</span>
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>
      )}

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

