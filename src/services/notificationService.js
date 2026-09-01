const NOTIFICATIONS_STORAGE_KEY = 'gate_ag_notifications_v1';

/**
 * Get all notifications from localStorage
 */
function getRawNotifications() {
  try {
    const raw = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

/**
 * Save raw notifications array to localStorage and emit change event
 */
function saveRawNotifications(notifs) {
  try {
    localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(notifs));
    if (typeof window !== 'undefined' && window.dispatchEvent) {
      window.dispatchEvent(new CustomEvent('gate-ag-notification-updated'));
    }
  } catch (e) {
    console.warn("Error saving notifications:", e);
  }
}

/**
 * Check if the student should receive the notification
 */
function matchesRecipient(notif, student) {
  if (!notif || !student) return false;
  const recipient = notif.recipientName || notif.recipientId;
  const sId = student.id;
  const sUsername = student.username ? student.username.replace(/^@/, '').toLowerCase() : '';
  const sName = student.full_name ? student.full_name.toLowerCase() : '';
  const sEmail = student.email ? student.email.toLowerCase() : '';

  if (notif.recipientId && sId && notif.recipientId === sId) return true;
  if (!recipient) return false;

  const target = recipient.toLowerCase().replace(/^@/, '');
  return target === sUsername || target === sName || target === sEmail;
}

/**
 * Retrieve notifications for a specific logged-in student
 */
export function getNotifications(student) {
  if (!student) return [];
  const all = getRawNotifications();
  return all
    .filter(n => matchesRecipient(n, student))
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

/**
 * Get count of unread notifications for a student
 */
export function getUnreadNotificationsCount(student) {
  if (!student) return 0;
  const userNotifs = getNotifications(student);
  return userNotifs.filter(n => !n.isRead).length;
}

/**
 * Add a priority notification when a Faculty member or Solver replies to a student's doubt
 */
export function addPriorityNotification({
  recipientId,
  recipientName,
  senderName,
  senderRole,
  senderDepartment = null,
  senderPhoto = null,
  postId,
  postTitle,
  replySnippet
}) {
  if (!recipientName && !recipientId) return null;

  // Only trigger for verified Faculty or Solver responses
  const role = (senderRole || '').toLowerCase();
  const isFaculty = role === 'faculty' || role === 'mentor' || (senderName && (senderName.startsWith('Dr.') || senderName.startsWith('Prof.') || senderName.startsWith('Er.')));
  const isSolver = role === 'solver';

  if (!isFaculty && !isSolver) {
    return null; // Not a priority alert
  }

  const newNotif = {
    id: 'notif_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    recipientId: recipientId || null,
    recipientName: recipientName || null,
    senderName: senderName || (isFaculty ? 'Verified Faculty' : 'Verified Solver'),
    senderRole: isFaculty ? 'faculty' : 'solver',
    senderDepartment: senderDepartment || null,
    senderPhoto: senderPhoto || null,
    postId: postId || null,
    postTitle: postTitle || 'Doubt Question',
    replySnippet: replySnippet ? (replySnippet.length > 90 ? replySnippet.substring(0, 90) + '...' : replySnippet) : '',
    timestamp: new Date().toISOString(),
    isRead: false
  };

  const all = getRawNotifications();
  // Keep last 100 notifications
  const updated = [newNotif, ...all].slice(0, 100);
  saveRawNotifications(updated);

  return newNotif;
}

/**
 * Mark a single notification as read
 */
export function markNotificationAsRead(notifId) {
  if (!notifId) return;
  const all = getRawNotifications();
  const updated = all.map(n => n.id === notifId ? { ...n, isRead: true } : n);
  saveRawNotifications(updated);
}

/**
 * Mark all notifications as read for a specific student
 */
export function markAllNotificationsAsRead(student) {
  if (!student) return;
  const all = getRawNotifications();
  const updated = all.map(n => {
    if (matchesRecipient(n, student)) {
      return { ...n, isRead: true };
    }
    return n;
  });
  saveRawNotifications(updated);
}

/**
 * Clear all notifications for a specific student
 */
export function clearAllNotifications(student) {
  if (!student) return;
  const all = getRawNotifications();
  const filtered = all.filter(n => !matchesRecipient(n, student));
  saveRawNotifications(filtered);
}
