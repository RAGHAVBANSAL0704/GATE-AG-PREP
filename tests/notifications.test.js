import { test, describe, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

// Mock localStorage for Node test environment
const mockStorage = new Map();
globalThis.localStorage = {
  getItem: (key) => mockStorage.get(key) || null,
  setItem: (key, val) => mockStorage.set(key, String(val)),
  removeItem: (key) => mockStorage.delete(key),
  clear: () => mockStorage.clear()
};

import {
  getNotifications,
  getUnreadNotificationsCount,
  addPriorityNotification,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  clearAllNotifications
} from '../src/services/notificationService.js';

describe('Priority Faculty & Solver Notifications Unit Tests', () => {

  beforeEach(() => {
    localStorage.clear();
  });

  const studentA = {
    id: 'stud_A',
    full_name: 'Ananya Sharma',
    username: 'ananya_hau',
    email: 'ananya@hau.ac.in'
  };

  const studentB = {
    id: 'stud_B',
    full_name: 'Rohan Verma',
    username: 'rohan_gate',
    email: 'rohan@example.com'
  };

  test('creates priority notification when Faculty replies to student doubt', () => {
    const notif = addPriorityNotification({
      recipientId: 'stud_A',
      recipientName: 'Ananya Sharma',
      senderName: 'Dr. Rajesh Kumar',
      senderRole: 'faculty',
      senderDepartment: 'FMPE',
      postId: 'post_101',
      postTitle: 'Tractor Power Delivery NAT Question',
      replySnippet: 'For dynamic traction ratio, divide pull by dynamic axle load.'
    });

    assert.ok(notif);
    assert.equal(notif.recipientId, 'stud_A');
    assert.equal(notif.senderRole, 'faculty');
    assert.equal(notif.isRead, false);

    const userNotifs = getNotifications(studentA);
    assert.equal(userNotifs.length, 1);
    assert.equal(userNotifs[0].senderName, 'Dr. Rajesh Kumar');
    assert.equal(getUnreadNotificationsCount(studentA), 1);

    // Student B should have 0 notifications
    assert.equal(getNotifications(studentB).length, 0);
  });

  test('creates priority notification when Solver replies to student doubt', () => {
    const notif = addPriorityNotification({
      recipientId: 'stud_A',
      recipientName: 'ananya_hau',
      senderName: 'Vikas_Solver',
      senderRole: 'solver',
      postId: 'post_102',
      postTitle: 'Curve Number Formula doubt',
      replySnippet: 'Remember S is in mm for metric calculation!'
    });

    assert.ok(notif);
    assert.equal(notif.senderRole, 'solver');

    const userNotifs = getNotifications(studentA);
    assert.equal(userNotifs.length, 1);
    assert.equal(userNotifs[0].senderRole, 'solver');
  });

  test('strictly ignores regular student replies (no priority alert)', () => {
    const notif = addPriorityNotification({
      recipientId: 'stud_A',
      recipientName: 'Ananya Sharma',
      senderName: 'OrdinaryStudent123',
      senderRole: 'student',
      postId: 'post_103',
      postTitle: 'Psychrometric chart question',
      replySnippet: 'I think answer is B.'
    });

    assert.equal(notif, null);
    assert.equal(getNotifications(studentA).length, 0);
  });

  test('marks single notification and all notifications as read', () => {
    const notif1 = addPriorityNotification({
      recipientId: 'stud_A',
      recipientName: 'Ananya Sharma',
      senderName: 'Prof. Sunil Sharma',
      senderRole: 'faculty',
      postTitle: 'Hydrology peak discharge',
      replySnippet: 'Rational formula Q = C I A / 360'
    });

    const notif2 = addPriorityNotification({
      recipientId: 'stud_A',
      recipientName: 'Ananya Sharma',
      senderName: 'Solver_Aman',
      senderRole: 'solver',
      postTitle: 'Matrix eigenvalues',
      replySnippet: 'Trace equals sum of eigenvalues.'
    });

    assert.equal(getUnreadNotificationsCount(studentA), 2);

    // Mark single notification as read
    markNotificationAsRead(notif1.id);
    assert.equal(getUnreadNotificationsCount(studentA), 1);

    // Mark all as read
    markAllNotificationsAsRead(studentA);
    assert.equal(getUnreadNotificationsCount(studentA), 0);
  });

  test('clears notifications for specific student without affecting others', () => {
    addPriorityNotification({
      recipientId: 'stud_A',
      recipientName: 'Ananya Sharma',
      senderName: 'Dr. Rajesh Kumar',
      senderRole: 'faculty',
      postTitle: 'Tractor Drawbar',
      replySnippet: 'Step 1...'
    });

    addPriorityNotification({
      recipientId: 'stud_B',
      recipientName: 'Rohan Verma',
      senderName: 'Dr. Rajesh Kumar',
      senderRole: 'faculty',
      postTitle: 'Harvesting Index',
      replySnippet: 'HI = Economic yield / Biological yield'
    });

    assert.equal(getNotifications(studentA).length, 1);
    assert.equal(getNotifications(studentB).length, 1);

    clearAllNotifications(studentA);
    assert.equal(getNotifications(studentA).length, 0);
    assert.equal(getNotifications(studentB).length, 1);
  });

});
