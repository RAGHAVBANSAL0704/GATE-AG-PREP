import React, { useState, useEffect, useRef } from 'react';
import { 
  Bell, 
  Check, 
  Trash2, 
  Award, 
  Zap, 
  MessageSquare, 
  ExternalLink,
  CheckCheck,
  Sparkles
} from 'lucide-react';
import { 
  getNotifications, 
  getUnreadNotificationsCount, 
  markNotificationAsRead, 
  markAllNotificationsAsRead, 
  clearAllNotifications 
} from '../services/notificationService';

export default function NotificationDropdown({ currentStudent, onNavigateTab }) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef(null);

  const refreshNotifs = () => {
    if (!currentStudent) {
      setNotifications([]);
      setUnreadCount(0);
      return;
    }
    const list = getNotifications(currentStudent);
    setNotifications(list);
    setUnreadCount(getUnreadNotificationsCount(currentStudent));
  };

  useEffect(() => {
    refreshNotifs();

    const handleUpdate = () => refreshNotifs();
    if (typeof window !== 'undefined') {
      window.addEventListener('gate-ag-notification-updated', handleUpdate);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('gate-ag-notification-updated', handleUpdate);
      }
    };
  }, [currentStudent]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleNotificationClick = (notif) => {
    markNotificationAsRead(notif.id);
    refreshNotifs();
    setIsOpen(false);

    if (onNavigateTab) {
      onNavigateTab('community');
    }
  };

  const handleMarkAllRead = () => {
    markAllNotificationsAsRead(currentStudent);
    refreshNotifs();
  };

  const handleClearAll = () => {
    clearAllNotifications(currentStudent);
    refreshNotifs();
  };

  if (!currentStudent) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      
      {/* Bell Trigger Button */}
      <button
        onClick={handleToggle}
        className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
        title="Notifications"
        aria-label="Notifications"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 rounded-full bg-indigo-600 text-white text-[9px] font-extrabold flex items-center justify-center animate-pulse shadow-sm">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Card */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95">
          
          {/* Header */}
          <div className="p-3.5 bg-slate-50 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span className="font-extrabold text-xs text-slate-900 dark:text-white">
                Priority Doubt Alerts
              </span>
              {unreadCount > 0 && (
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                  {unreadCount} new
                </span>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <CheckCheck className="w-3 h-3" />
                <span>Mark all read</span>
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/80">
            {notifications.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-xs space-y-2">
                <Bell className="w-8 h-8 mx-auto opacity-30" />
                <div>No notifications yet.</div>
                <p className="text-[10px] text-slate-500 max-w-xs mx-auto">
                  You'll be alerted here whenever a verified Faculty member or Solver replies to your doubts.
                </p>
              </div>
            ) : (
              notifications.map((notif) => {
                const isFaculty = notif.senderRole === 'faculty';
                const isSolver = notif.senderRole === 'solver';

                return (
                  <div
                    key={notif.id}
                    onClick={() => handleNotificationClick(notif)}
                    className={`p-3.5 transition flex items-start gap-3 cursor-pointer ${
                      notif.isRead 
                        ? 'hover:bg-slate-50 dark:hover:bg-slate-800/50 opacity-75' 
                        : 'bg-indigo-50/40 dark:bg-indigo-950/20 hover:bg-indigo-50/70 dark:hover:bg-indigo-950/40'
                    }`}
                  >
                    {/* Badge Icon */}
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-extrabold ${
                      isFaculty 
                        ? 'bg-indigo-600 text-white ring-1 ring-indigo-400/50 shadow-xs' 
                        : 'bg-amber-500 text-white ring-1 ring-amber-400/50 shadow-xs'
                    }`}>
                      {isFaculty ? <Award className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 space-y-1 text-xs">
                      <div className="flex items-center justify-between gap-1">
                        <div className="flex items-center gap-1.5 truncate">
                          <span className={`font-bold truncate ${
                            isFaculty ? 'text-indigo-950 dark:text-indigo-200' : 'text-amber-950 dark:text-amber-200'
                          }`}>
                            {notif.senderName}
                          </span>
                          <span className={`text-[9px] font-extrabold px-1 rounded ${
                            isFaculty ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300' : 'bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300'
                          }`}>
                            {isFaculty ? 'Faculty' : 'Solver'}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono shrink-0">
                          {new Date(notif.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      <p className="text-[11px] font-semibold text-slate-800 dark:text-slate-200 truncate">
                        Replied to: "{notif.postTitle}"
                      </p>

                      {notif.replySnippet && (
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                          {notif.replySnippet}
                        </p>
                      )}
                    </div>

                    {!notif.isRead && (
                      <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0 mt-1.5"></span>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-2.5 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
              <span className="text-slate-400 font-medium">
                {notifications.length} Total Alerts
              </span>
              <button
                onClick={handleClearAll}
                className="text-rose-500 hover:text-rose-600 font-bold flex items-center gap-1 transition cursor-pointer"
              >
                <Trash2 className="w-3 h-3" />
                <span>Clear all</span>
              </button>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
