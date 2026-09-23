import React, { useState, useEffect } from 'react';
import { 
  Users, 
  ShieldCheck, 
  Award, 
  Search, 
  Filter, 
  UserCheck, 
  GraduationCap, 
  Building2, 
  Trash2, 
  Ban, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  Zap,
  Lock,
  Unlock,
  RefreshCw,
  Mail,
  Phone,
  Check,
  Edit3,
  Save,
  X,
  KeyRound,
  Sliders,
  Flame,
  User
} from 'lucide-react';
import { 
  getAllRegisteredUsers, 
  updateUserRole, 
  adminUpdateUserInfo,
  adminResetUserPassword,
  banUser, 
  unbanUser, 
  getBannedUsers,
  USER_ROLES,
  CONTRIBUTOR_BADGES
} from '../services/userRoleService.js';
import { AGRI_ENGG_DEPARTMENTS } from '../services/authService.js';

export default function AdminUserRoleManager({ currentStudent }) {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [feedbackMsg, setFeedbackMsg] = useState({ type: '', text: '' });
  const [bannedUsersList, setBannedUsersList] = useState([]);

  const [editingUser, setEditingUser] = useState(null);
  const [isSavingUser, setIsSavingUser] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [editPasswordInput, setEditPasswordInput] = useState('');
  const [showEditPassword, setShowEditPassword] = useState(false);
  const [editModalError, setEditModalError] = useState('');

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await getAllRegisteredUsers();
      setUsers(data);
      setBannedUsersList(getBannedUsers());
    } catch (err) {
      console.error("Error loading users:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    const defaultBadge = newRole === 'solver' ? 'Verified Solver' : (newRole === 'mentor' ? 'Academic Mentor' : (newRole === 'faculty' ? 'Faculty Contributor' : null));
    const res = await updateUserRole(userId, newRole, defaultBadge);
    if (res.success) {
      setFeedbackMsg({ type: 'success', text: `Role updated to ${newRole.toUpperCase()} successfully!` });
      await loadData();
      setTimeout(() => setFeedbackMsg({ type: '', text: '' }), 3000);
    }
  };

  const handleBadgeChange = async (userId, userCurrentRole, newBadge) => {
    const badgeVal = newBadge === 'None' ? null : newBadge;
    const res = await updateUserRole(userId, userCurrentRole, badgeVal);
    if (res.success) {
      setFeedbackMsg({ type: 'success', text: 'Contributor badge assigned successfully!' });
      await loadData();
      setTimeout(() => setFeedbackMsg({ type: '', text: '' }), 3000);
    }
  };

  const handleToggleBan = (user) => {
    const identifier = user.id || user.username || user.email;
    const isCurrentlyBanned = bannedUsersList.some(b => b.identifier === identifier || b.id === user.id || b.email === user.email);

    if (isCurrentlyBanned) {
      unbanUser(identifier);
      setFeedbackMsg({ type: 'success', text: `Unbanned user ${user.display_name || user.full_name}.` });
    } else {
      banUser(user, 'Administrative restriction by Admin');
      setFeedbackMsg({ type: 'warning', text: `Banned user ${user.display_name || user.full_name} from community actions.` });
    }
    setBannedUsersList(getBannedUsers());
    loadData();
    setTimeout(() => setFeedbackMsg({ type: '', text: '' }), 3000);
  };

  const handleOpenEditModal = (user) => {
    setEditingUser(user);
    const userRole = (user.role || (user.is_faculty ? 'faculty' : 'student')).toLowerCase();
    const isUserBanned = bannedUsersList.some(b => b.id === user.id || b.email === user.email || b.username === user.username) || Boolean(user.is_banned);
    
    setEditFormData({
      full_name: user.full_name || user.display_name || '',
      email: user.email || '',
      mobile_number: user.mobile_number || '',
      college_name: user.college_name || user.institute || '',
      department: user.department || '',
      gate_target_year: user.gate_target_year || 'GATE 2027',
      xp_points: user.xp_points !== undefined ? user.xp_points : (user.xp || 0),
      break_xp: user.break_xp !== undefined ? user.break_xp : 0,
      role: userRole,
      contributor_badge: user.contributor_badge || 'None',
      is_faculty: user.is_faculty || userRole === 'faculty' || userRole === 'mentor',
      title_prefix: user.title_prefix || (userRole === 'faculty' || userRole === 'mentor' ? 'Dr.' : ''),
      designation: user.designation || '',
      bio: user.bio || '',
      is_banned: isUserBanned,
      ban_reason: 'Administrative restriction by Admin'
    });
    setEditPasswordInput('');
    setShowEditPassword(false);
    setEditModalError('');
  };

  const handleSaveUserModal = async (e) => {
    if (e) e.preventDefault();
    if (!editingUser) return;
    setIsSavingUser(true);
    setEditModalError('');

    try {
      const targetUserId = editingUser.id || editingUser.username || editingUser.email;
      const res = await adminUpdateUserInfo(targetUserId, editFormData, {
        name: currentStudent?.full_name || 'Admin Lead',
        role: currentStudent?.role || 'admin'
      });

      if (!res.success) {
        setEditModalError(res.message || 'Failed to update user profile.');
        setIsSavingUser(false);
        return;
      }

      // Handle optional password reset if filled
      if (editPasswordInput.trim().length > 0) {
        if (editPasswordInput.trim().length < 6) {
          setEditModalError('Password must be at least 6 characters long.');
          setIsSavingUser(false);
          return;
        }
        const pwdRes = await adminResetUserPassword(targetUserId, editPasswordInput.trim(), {
          name: currentStudent?.full_name || 'Admin Lead',
          role: currentStudent?.role || 'admin'
        });
        if (!pwdRes.success) {
          setEditModalError(pwdRes.message || 'Failed to reset password.');
          setIsSavingUser(false);
          return;
        }
      }

      setFeedbackMsg({
        type: 'success',
        text: `Successfully updated & live synced profile for ${editFormData.full_name || editingUser.full_name}!`
      });
      setEditingUser(null);
      await loadData();
      setTimeout(() => setFeedbackMsg({ type: '', text: '' }), 4000);
    } catch (err) {
      console.error("Save user error:", err);
      setEditModalError(err.message || 'An unexpected error occurred while saving.');
    } finally {
      setIsSavingUser(false);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      (user.full_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.display_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.username || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.mobile_number || '').includes(searchQuery) ||
      (user.department || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.college_name || '').toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (roleFilter === 'all') return true;
    if (roleFilter === 'banned') return user.is_banned;
    return (user.role || 'student').toLowerCase() === roleFilter;
  });

  const facultyCount = users.filter(u => u.is_faculty || u.role === 'faculty').length;
  const solverCount = users.filter(u => u.is_solver || u.role === 'solver').length;
  const mentorCount = users.filter(u => u.is_mentor || u.role === 'mentor').length;
  const studentCount = users.filter(u => !u.is_faculty && !u.is_solver && !u.is_mentor && u.role !== 'admin').length;
  const bannedCount = bannedUsersList.length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header Info */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-xs font-bold border border-indigo-200 dark:border-indigo-800">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin User Info HQ & Live Sync</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Manage User Profiles, Roles & Live Sync
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-2xl">
              Edit user details, modify department/college info, adjust XP points, grant Solvers or Faculty roles, and reset passwords directly. All edits sync live across sessions and devices.
            </p>
          </div>

          <button
            onClick={loadData}
            className="self-start sm:self-auto px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl flex items-center gap-2 transition cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh List</span>
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-6 border-t border-slate-100 dark:border-slate-800 mt-6">
          <div className="bg-slate-50 dark:bg-slate-950/60 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Total Users</span>
            <span className="text-xl font-extrabold text-slate-900 dark:text-white">{users.length}</span>
          </div>
          <div className="bg-indigo-50/50 dark:bg-indigo-950/40 p-3.5 rounded-2xl border border-indigo-200/60 dark:border-indigo-800/40">
            <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">Faculty</span>
            <span className="text-xl font-extrabold text-indigo-700 dark:text-indigo-300">{facultyCount}</span>
          </div>
          <div className="bg-amber-50/50 dark:bg-amber-950/40 p-3.5 rounded-2xl border border-amber-200/60 dark:border-amber-800/40">
            <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block">Solvers</span>
            <span className="text-xl font-extrabold text-amber-700 dark:text-amber-300">{solverCount}</span>
          </div>
          <div className="bg-emerald-50/50 dark:bg-emerald-950/40 p-3.5 rounded-2xl border border-emerald-200/60 dark:border-emerald-800/40">
            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">Students</span>
            <span className="text-xl font-extrabold text-emerald-700 dark:text-emerald-300">{studentCount}</span>
          </div>
          <div className="bg-rose-50/50 dark:bg-rose-950/40 p-3.5 rounded-2xl border border-rose-200/60 dark:border-rose-800/40">
            <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider block">Banned</span>
            <span className="text-xl font-extrabold text-rose-700 dark:text-rose-300">{bannedCount}</span>
          </div>
        </div>
      </div>

      {/* Feedback Banner */}
      {feedbackMsg.text && (
        <div className={`p-4 rounded-2xl border text-xs font-bold flex items-center gap-2 animate-in fade-in ${
          feedbackMsg.type === 'success' 
            ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 text-emerald-700 dark:text-emerald-300' 
            : 'bg-amber-50 dark:bg-amber-950/50 border-amber-200 text-amber-700 dark:text-amber-300'
        }`}>
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{feedbackMsg.text}</span>
        </div>
      )}

      {/* Search & Filter Controls */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-3 shadow-xs">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by Name, Department, Email, Mobile, or @username..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-bold text-slate-800 dark:text-slate-200 outline-none w-full sm:w-auto cursor-pointer"
          >
            <option value="all">All Roles</option>
            <option value="faculty">Faculty Only</option>
            <option value="solver">Solvers Only</option>
            <option value="mentor">Faculty Mentors</option>
            <option value="student">Students Only</option>
            <option value="banned">Banned Accounts</option>
          </select>
        </div>
      </div>

      {/* User Directory List */}
      <div className="space-y-3">
        {filteredUsers.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-3 text-slate-400 text-xs">
            <Users className="w-10 h-10 mx-auto opacity-30" />
            <div>No users matched your search criteria.</div>
          </div>
        ) : (
          filteredUsers.map((user) => {
            const role = (user.role || (user.is_faculty ? 'faculty' : 'student')).toLowerCase();
            const isFaculty = user.is_faculty || role === 'faculty' || role === 'mentor';
            const isSolver = user.is_solver || role === 'solver';
            const isMentor = user.is_mentor || role === 'mentor';
            const isBanned = user.is_banned;
            const userXP = user.xp_points !== undefined ? user.xp_points : (user.xp || 0);

            return (
              <div 
                key={user.id || user.email || user.username}
                className={`bg-white dark:bg-slate-900 border rounded-3xl p-5 transition-all shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4 ${
                  isBanned 
                    ? 'border-rose-300 dark:border-rose-900/60 bg-rose-50/20 dark:bg-rose-950/10' 
                    : (isFaculty 
                        ? 'border-indigo-200/80 dark:border-indigo-800/60' 
                        : (isSolver ? 'border-amber-200/80 dark:border-amber-800/60' : 'border-slate-200 dark:border-slate-800'))
                }`}
              >
                {/* User Info Column */}
                <div className="flex items-start sm:items-center gap-3.5">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 font-extrabold text-sm border overflow-hidden ${
                    isFaculty 
                      ? 'bg-gradient-to-tr from-indigo-600 to-purple-600 text-white border-indigo-400/40 shadow-sm'
                      : (isSolver 
                          ? 'bg-gradient-to-tr from-amber-500 to-orange-600 text-white border-amber-400/40 shadow-sm'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700')
                  }`}>
                    {user.profile_photo_url ? (
                      <img src={user.profile_photo_url} alt="User" className="w-full h-full object-cover" />
                    ) : (
                      isFaculty ? <Award className="w-6 h-6" /> : (isSolver ? <Zap className="w-6 h-6" /> : <UserCheck className="w-6 h-6" />)
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-extrabold text-slate-900 dark:text-white text-sm">
                        {user.display_name || (user.title_prefix ? `${user.title_prefix} ${user.full_name}` : user.full_name)}
                      </span>

                      {user.username && (
                        <span className="text-xs font-mono text-slate-400 font-medium">
                          @{user.username.replace(/^@/, '')}
                        </span>
                      )}

                      {/* Status Badges */}
                      {isBanned ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-600 border border-rose-300 dark:border-rose-800">
                          🚫 Banned
                        </span>
                      ) : (
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                          isFaculty 
                            ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800'
                            : (isSolver 
                                ? 'bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                                : 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800')
                        }`}>
                          {isMentor ? '🏛️ Faculty Mentor' : (isFaculty ? '🏛️ Faculty' : (isSolver ? '⚡ Solver Moderator' : '🎓 Student'))}
                        </span>
                      )}

                      {user.contributor_badge && user.contributor_badge !== 'None' && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300 border border-purple-200 dark:border-purple-800 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-purple-500" />
                          <span>{user.contributor_badge}</span>
                        </span>
                      )}

                      {/* XP & Target Year Badges */}
                      {user.gate_target_year && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 flex items-center gap-1">
                          <GraduationCap className="w-3 h-3 text-indigo-500" />
                          <span>{user.gate_target_year}</span>
                        </span>
                      )}

                      {userXP > 0 && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 flex items-center gap-1">
                          <Flame className="w-3 h-3 text-amber-500" />
                          <span>{userXP} XP</span>
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {user.department && (
                        <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
                          <Building2 className="w-3 h-3 text-indigo-500" />
                          <span>{user.department}</span>
                        </span>
                      )}
                      {user.college_name && (
                        <span>• {user.college_name}</span>
                      )}
                      {user.email && (
                        <span className="flex items-center gap-1 font-mono text-[11px]">
                          <Mail className="w-3 h-3 text-slate-400" />
                          <span>{user.email}</span>
                        </span>
                      )}
                      {user.mobile_number && (
                        <span className="flex items-center gap-1 font-mono text-[11px]">
                          <Phone className="w-3 h-3 text-slate-400" />
                          <span>{user.mobile_number}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Role Actions & Edit Control Bar */}
                <div className="flex flex-wrap items-center gap-2 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-slate-800 shrink-0">
                  
                  {/* Edit Full Profile Button */}
                  <button
                    onClick={() => handleOpenEditModal(user)}
                    className="px-3.5 py-1.5 bg-indigo-50 dark:bg-indigo-950/80 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 font-bold text-xs rounded-xl flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                    title="Edit user profile details, college, department, XP, or reset password"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Profile</span>
                  </button>

                  {/* Quick Role Selector */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-bold text-slate-400">Role:</span>
                    <select
                      value={role}
                      onChange={(e) => handleRoleChange(user.id || user.username || user.email, e.target.value)}
                      className="px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white outline-none cursor-pointer"
                    >
                      <option value="student">Student</option>
                      <option value="solver">⚡ Solver (Moderator)</option>
                      <option value="mentor">🏛️ Faculty Mentor</option>
                      <option value="faculty">🏛️ Verified Faculty</option>
                      <option value="admin">🛡️ Admin / Creator</option>
                    </select>
                  </div>

                  {/* Contributor Badge Selector */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-bold text-slate-400">Badge:</span>
                    <select
                      value={user.contributor_badge || 'None'}
                      onChange={(e) => handleBadgeChange(user.id || user.username || user.email, role, e.target.value)}
                      className="px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white outline-none cursor-pointer"
                    >
                      {CONTRIBUTOR_BADGES.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>

                  {/* Ban / Unban Button */}
                  <button
                    onClick={() => handleToggleBan(user)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                      isBanned
                        ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-xs'
                        : 'bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800'
                    }`}
                    title={isBanned ? "Unban user from community" : "Ban user from community discussions and chat"}
                  >
                    {isBanned ? (
                      <>
                        <Unlock className="w-3.5 h-3.5" />
                        <span>Unban</span>
                      </>
                    ) : (
                      <>
                        <Ban className="w-3.5 h-3.5" />
                        <span>Ban</span>
                      </>
                    )}
                  </button>

                </div>

              </div>
            );
          })
        )}
      </div>

      {/* ========================================================================= */}
      {/* ADMIN EDIT USER DETAILS MODAL (Direct In-Panel Editing + Live Sync)      */}
      {/* ========================================================================= */}
      {editingUser && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-[11px] font-bold border border-indigo-200 dark:border-indigo-800">
                  <Sliders className="w-3 h-3" />
                  <span>Admin Direct Profile Editor</span>
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  Edit User: {editingUser.full_name || editingUser.display_name || 'Student'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  ID: <span className="font-mono text-[11px]">{editingUser.id || editingUser.username || editingUser.email}</span>
                </p>
              </div>

              <button
                onClick={() => setEditingUser(null)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Error Message */}
            {editModalError && (
              <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{editModalError}</span>
              </div>
            )}

            {/* Form Content */}
            <form onSubmit={handleSaveUserModal} className="space-y-5">
              
              {/* Section 1: User Identity & Contact */}
              <div className="space-y-3">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-indigo-500" />
                  <span>1. Identity & Contact Information</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={editFormData.full_name || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, full_name: e.target.value })}
                      className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={editFormData.email || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                      className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      value={editFormData.mobile_number || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, mobile_number: e.target.value })}
                      placeholder="e.g. 9876543210"
                      className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                      Title Prefix (Faculty / Dr. / Er.)
                    </label>
                    <select
                      value={editFormData.title_prefix || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, title_prefix: e.target.value })}
                      className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white outline-none focus:border-indigo-500"
                    >
                      <option value="">None (Student)</option>
                      <option value="Dr.">Dr.</option>
                      <option value="Er.">Er.</option>
                      <option value="Prof.">Prof.</option>
                      <option value="Dr. (Prof.)">Dr. (Prof.)</option>
                      <option value="Mr.">Mr.</option>
                      <option value="Ms.">Ms.</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 2: Academic & GATE Preparation */}
              <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-indigo-500" />
                  <span>2. Academic & GATE Details</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                      College / University / Institute
                    </label>
                    <input
                      type="text"
                      value={editFormData.college_name || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, college_name: e.target.value })}
                      placeholder="e.g. IIT Kharagpur / PAU / GBPUAT"
                      className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                      Department / Specialization
                    </label>
                    <select
                      value={editFormData.department || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, department: e.target.value })}
                      className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white outline-none focus:border-indigo-500"
                    >
                      <option value="">Select Department</option>
                      {AGRI_ENGG_DEPARTMENTS.map((dept) => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                      Target GATE Year
                    </label>
                    <select
                      value={editFormData.gate_target_year || 'GATE 2027'}
                      onChange={(e) => setEditFormData({ ...editFormData, gate_target_year: e.target.value })}
                      className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white outline-none focus:border-indigo-500"
                    >
                      <option value="GATE 2026">GATE 2026</option>
                      <option value="GATE 2027">GATE 2027</option>
                      <option value="GATE 2028">GATE 2028</option>
                      <option value="GATE 2029">GATE 2029</option>
                      <option value="Faculty / Mentor">Faculty / Mentor</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                      Academic XP Points
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={editFormData.xp_points ?? 0}
                      onChange={(e) => setEditFormData({ ...editFormData, xp_points: Number(e.target.value) })}
                      className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white outline-none focus:border-indigo-500 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Role & Contributor Badge */}
              <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
                  <span>3. Platform Role & Permissions</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                      Platform Role
                    </label>
                    <select
                      value={editFormData.role || 'student'}
                      onChange={(e) => {
                        const newR = e.target.value;
                        const autoBadge = newR === 'solver' ? 'Verified Solver' : (newR === 'mentor' ? 'Academic Mentor' : (newR === 'faculty' ? 'Faculty Contributor' : editFormData.contributor_badge));
                        setEditFormData({ 
                          ...editFormData, 
                          role: newR, 
                          contributor_badge: autoBadge,
                          is_faculty: newR === 'faculty' || newR === 'mentor'
                        });
                      }}
                      className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold text-slate-900 dark:text-white outline-none focus:border-indigo-500"
                    >
                      <option value="student">Student</option>
                      <option value="solver">⚡ Solver (Moderator)</option>
                      <option value="mentor">🏛️ Faculty Mentor</option>
                      <option value="faculty">🏛️ Verified Faculty</option>
                      <option value="admin">🛡️ Admin / Creator</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                      Contributor Badge
                    </label>
                    <select
                      value={editFormData.contributor_badge || 'None'}
                      onChange={(e) => setEditFormData({ ...editFormData, contributor_badge: e.target.value })}
                      className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white outline-none focus:border-indigo-500"
                    >
                      {CONTRIBUTOR_BADGES.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 4: Moderation & Password Reset */}
              <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-indigo-500" />
                  <span>4. Security & Moderation Actions</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                      Admin Password Reset (Optional)
                    </label>
                    <div className="relative">
                      <input
                        type={showEditPassword ? "text" : "password"}
                        value={editPasswordInput}
                        onChange={(e) => setEditPasswordInput(e.target.value)}
                        placeholder="Leave blank to keep unchanged"
                        className="w-full px-3.5 py-2 pr-10 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white outline-none focus:border-indigo-500 font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => setShowEditPassword(!showEditPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                      >
                        {showEditPassword ? 'Hide' : 'Show'}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                      Account Status
                    </label>
                    <div className="flex items-center gap-3 pt-1">
                      <label className="inline-flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={Boolean(editFormData.is_banned)}
                          onChange={(e) => setEditFormData({ ...editFormData, is_banned: e.target.checked })}
                          className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500 border-slate-300 dark:border-slate-700"
                        />
                        <span className="text-xs font-bold text-rose-600 dark:text-rose-400">
                          Ban Account from community actions
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer Controls */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingUser}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSavingUser ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving & Broadcasting...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" />
                      <span>Save & Sync Live</span>
                    </>
                  )}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
