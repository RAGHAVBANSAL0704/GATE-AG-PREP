import { test, describe, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

// Mock Browser LocalStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, val) => { store[key] = String(val); },
    removeItem: (key) => { delete store[key]; },
    clear: () => { store = {}; }
  };
})();

globalThis.localStorage = localStorageMock;

import { awardStudentXP, getLocalAcademicXP } from '../src/services/leaderboardService.js';

describe('Community & Chat Enhancement Subsystem', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('Phase 3: Solver XP Bounty Awarding', () => {
    test('awards 25 XP bounty when a student solution is verified', async () => {
      const initialXP = getLocalAcademicXP();
      const res = await awardStudentXP(25);

      assert.strictEqual(res.success, true);
      assert.strictEqual(res.xpAwarded, 25);
      assert.strictEqual(getLocalAcademicXP(), initialXP + 25);
    });

    test('accumulates multiple bounty rewards consecutively', async () => {
      await awardStudentXP(25);
      const res2 = await awardStudentXP(25);

      assert.strictEqual(res2.success, true);
      assert.strictEqual(getLocalAcademicXP(), 50);
    });
  });

  describe('Phase 2: Live In-Chat Polls Percentage Computation', () => {
    const calculatePollPercentages = (options = []) => {
      const totalVotes = options.reduce((sum, opt) => sum + (opt.votes || 0), 0);
      return options.map(opt => ({
        ...opt,
        percentage: totalVotes > 0 ? Math.round(((opt.votes || 0) / totalVotes) * 100) : 0,
        totalVotes
      }));
    };

    test('calculates correct percentages for poll options', () => {
      const pollOptions = [
        { id: 'opt_1', text: 'Option A: 4.85 kN', votes: 15 },
        { id: 'opt_2', text: 'Option B: 5.20 kN', votes: 35 },
        { id: 'opt_3', text: 'Option C: 6.10 kN', votes: 50 },
      ];

      const evaluated = calculatePollPercentages(pollOptions);
      assert.strictEqual(evaluated[0].percentage, 15);
      assert.strictEqual(evaluated[1].percentage, 35);
      assert.strictEqual(evaluated[2].percentage, 50);
      assert.strictEqual(evaluated[0].totalVotes, 100);
    });

    test('handles zero votes gracefully without NaN or division by zero', () => {
      const zeroVotesOptions = [
        { id: 'opt_1', text: 'A', votes: 0 },
        { id: 'opt_2', text: 'B', votes: 0 }
      ];

      const evaluated = calculatePollPercentages(zeroVotesOptions);
      assert.strictEqual(evaluated[0].percentage, 0);
      assert.strictEqual(evaluated[1].percentage, 0);
      assert.strictEqual(evaluated[0].totalVotes, 0);
    });

    test('simulates recording a new vote on a poll option', () => {
      let poll = {
        id: 'poll_1',
        question: 'What is the specific draft of 3-bottom MB Plough in Sandy Loam?',
        options: [
          { id: 'opt_1', text: '0.4 - 0.6 kg/cm²', votes: 4 },
          { id: 'opt_2', text: '0.7 - 0.9 kg/cm²', votes: 1 }
        ],
        votedUserIds: []
      };

      const recordVote = (currentPoll, optionId, userId) => {
        if (currentPoll.votedUserIds.includes(userId)) return currentPoll;
        return {
          ...currentPoll,
          options: currentPoll.options.map(opt => 
            opt.id === optionId ? { ...opt, votes: (opt.votes || 0) + 1 } : opt
          ),
          votedUserIds: [...currentPoll.votedUserIds, userId]
        };
      };

      const updated = recordVote(poll, 'opt_1', 'user_gate_101');
      assert.strictEqual(updated.options[0].votes, 5);
      assert.strictEqual(updated.votedUserIds.includes('user_gate_101'), true);

      // Prevents duplicate voting from same user
      const duplicateVote = recordVote(updated, 'opt_2', 'user_gate_101');
      assert.strictEqual(duplicateVote.options[1].votes, 1);
    });
  });

  describe('Phase 2: 2-Level Nested Threaded Comments', () => {
    test('appends a 2nd-level nested reply to an existing discussion comment', () => {
      const discussion = {
        id: 'disc_1',
        title: 'Tractor Hitch Hydraulics doubt',
        comments: [
          {
            id: 'c_1',
            author: 'Rohan Sharma',
            text: 'Remember that virtual hitch point is intersection of lower and upper links in vertical plane.',
            replies: []
          }
        ]
      };

      const addNestedReply = (currentDiscussion, commentId, replyData) => {
        return {
          ...currentDiscussion,
          comments: currentDiscussion.comments.map(c => {
            if (c.id === commentId) {
              return {
                ...c,
                replies: [...(c.replies || []), replyData]
              };
            }
            return c;
          })
        };
      };

      const newReply = {
        id: 'r_1',
        author: 'Ananya Verma',
        avatar: '👩‍🎓',
        text: 'Does this apply for Category-II 3-point linkages with draft control?',
        createdAt: new Date().toISOString()
      };

      const updated = addNestedReply(discussion, 'c_1', newReply);
      assert.strictEqual(updated.comments[0].replies.length, 1);
      assert.strictEqual(updated.comments[0].replies[0].author, 'Ananya Verma');
      assert.strictEqual(updated.comments[0].replies[0].text, newReply.text);
    });
  });

  describe('Phase 1: Granular Tag & Subject Filtering', () => {
    const samplePosts = [
      { id: '1', title: 'Hydraulic jump in trapezoidal channel', subject: 'SWCE', tags: ['#Hydraulics', '#OpenChannel', '#SWCE'] },
      { id: '2', title: 'Tractor dynamic weight transfer on rear axle', subject: 'FMP', tags: ['#TractorDraft', '#Mechanics', '#FMP'] },
      { id: '3', title: 'Thin layer drying constants Page equation', subject: 'APFE', tags: ['#DryingRates', '#APFE', '#Moisture'] },
      { id: '4', title: 'SCS Curve Number runoff calculation', subject: 'SWCE', tags: ['#RunoffCN', '#Hydrology', '#SWCE'] }
    ];

    const filterPosts = (posts, selectedSubject, selectedTag, searchQuery) => {
      return posts.filter(post => {
        const matchesSubject = selectedSubject === 'All' || post.subject === selectedSubject;
        const matchesTag = !selectedTag || post.tags.includes(selectedTag);
        const matchesSearch = !searchQuery || 
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesSubject && matchesTag && matchesSearch;
      });
    };

    test('filters posts accurately by granular tag chip', () => {
      const results = filterPosts(samplePosts, 'All', '#Hydraulics', '');
      assert.strictEqual(results.length, 1);
      assert.strictEqual(results[0].id, '1');
    });

    test('filters posts accurately by subject and tag combined', () => {
      const results = filterPosts(samplePosts, 'SWCE', '#RunoffCN', '');
      assert.strictEqual(results.length, 1);
      assert.strictEqual(results[0].id, '4');
    });

    test('returns empty when subject and tag do not match', () => {
      const results = filterPosts(samplePosts, 'FMP', '#DryingRates', '');
      assert.strictEqual(results.length, 0);
    });
  });
});
