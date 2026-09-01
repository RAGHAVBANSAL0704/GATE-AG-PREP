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
  Check
} from 'lucide-react';
import { 
  getAllRegisteredUsers, 
  updateUserRole, 
  banUser, 
  unbanUser, 
  getBannedUsers,
  USER_ROLES,
  CONTRIBUTOR_BADGES
} from '../services/userRoleService.js';

export default function AdminUserRoleManager({ currentStudent }) {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [feedbackMsg, setFeedbackMsg] = useState({ type: '', text: '' });
  const [bannedUsersList, setBannedUsersList] = useState([]);

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
              <span>Admin Role & Contributor Control HQ</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Manage Roles, Faculty & Solvers
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-2xl">
              Assign contributor permissions to registered Faculty and promote high-performing Students to <strong>Solvers</strong> (with perks to delete spam and ban abusive accounts).
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
            className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-bold text-slate-800 dark:text-slate-200 outline-none w-full sm:w-auto cursor-pointer"
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

                {/* Role Actions Control Bar */}
                <div className="flex flex-wrap items-center gap-2 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-slate-800 shrink-0">
                  
                  {/* Role Selector */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-bold text-slate-400">Role:</span>
                    <select
                      value={role}
                      onChange={(e) => handleRoleChange(user.id || user.username || user.email, e.target.value)}
                      className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white outline-none cursor-pointer"
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
                      className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white outline-none cursor-pointer"
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

    </div>
  );
}
