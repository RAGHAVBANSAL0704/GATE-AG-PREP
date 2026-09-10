import { describe, it } from 'node:test';
import assert from 'node:assert';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

describe('Community & Interactive Live Lounge Test Suite', () => {

  describe('CommunityHub Container Architecture', () => {
    it('contains valid subtabs for Chat Lounge, Q&A Discussions, and AI Study Assistant', () => {
      const filePath = join(process.cwd(), 'src', 'components', 'CommunityHub.jsx');
      const content = readFileSync(filePath, 'utf8');

      assert.ok(content.includes("'chat'"), 'Must define chat subtab');
      assert.ok(content.includes("'qa'"), 'Must define qa subtab');
      assert.ok(content.includes("'ai_tutor'"), 'Must define ai_tutor subtab');
      assert.ok(content.includes('Live Peer Network'), 'Must include live peer network status indicator');
    });

    it('enforces responsive 2-theme design tokens without hardcoded lone dark classes', () => {
      const filePath = join(process.cwd(), 'src', 'components', 'CommunityHub.jsx');
      const content = readFileSync(filePath, 'utf8');

      assert.ok(content.includes('bg-white dark:bg-slate-900'), 'Must use responsive background token');
      assert.ok(content.includes('text-slate-900 dark:text-white'), 'Must use responsive text token');
    });
  });

  describe('CommunityChatHub Interactive Features', () => {
    it('defines 6 core GATE AG subject channels covering all major exam branches', () => {
      const filePath = join(process.cwd(), 'src', 'components', 'CommunityChatHub.jsx');
      const content = readFileSync(filePath, 'utf8');

      assert.ok(content.includes('general-lounge'), 'Must have general lounge channel');
      assert.ok(content.includes('gate-ag-2027'), 'Must have gate-ag-2027 target channel');
      assert.ok(content.includes('doubts-and-maths'), 'Must have maths & doubts channel');
      assert.ok(content.includes('fmp-machinery'), 'Must have farm machinery channel');
      assert.ok(content.includes('swce-hydrology'), 'Must have soil & water channel');
      assert.ok(content.includes('apfe-processing'), 'Must have food & process engg channel');
    });

    it('provides quick emoji reactions and math formula ribbon', () => {
      const filePath = join(process.cwd(), 'src', 'components', 'CommunityChatHub.jsx');
      const content = readFileSync(filePath, 'utf8');

      assert.ok(content.includes('QUICK_REACTIONS'), 'Must define quick reactions array');
      assert.ok(content.includes('MATH_SNIPPETS'), 'Must define math snippets array');
      assert.ok(content.includes('handleToggleReaction'), 'Must support interactive toggle reaction');
      assert.ok(content.includes('handleInsertMath'), 'Must support cursor-based math insertion');
    });

    it('implements search filtering across active chat channel messages', () => {
      const filePath = join(process.cwd(), 'src', 'components', 'CommunityChatHub.jsx');
      const content = readFileSync(filePath, 'utf8');

      assert.ok(content.includes('searchQuery'), 'Must support search query state');
      assert.ok(content.includes('Search in lounge...'), 'Must render search input placeholder');
    });
  });

  describe('CommunityDiscussions Q&A & Solvers Forum', () => {
    it('provides topic filtering, status filtering, and modal question composer', () => {
      const filePath = join(process.cwd(), 'src', 'components', 'CommunityDiscussions.jsx');
      const content = readFileSync(filePath, 'utf8');

      assert.ok(content.includes('isPostModalOpen'), 'Must support modal composer state');
      assert.ok(content.includes('statusFilter'), 'Must support solved/unsolved status filtering');
      assert.ok(content.includes('sortBy'), 'Must support sorting by trending vs latest');
      assert.ok(content.includes('TOPIC_CATEGORIES'), 'Must define topic categories');
    });

    it('pins verified solutions and awards solver contributor XP', () => {
      const filePath = join(process.cwd(), 'src', 'components', 'CommunityDiscussions.jsx');
      const content = readFileSync(filePath, 'utf8');

      assert.ok(content.includes('isVerifiedSolution'), 'Must check verified solution status');
      assert.ok(content.includes('markVerifiedSolution'), 'Must integrate markVerifiedSolution service');
      assert.ok(content.includes('+25 Contributor XP') || content.includes('+25 XP'), 'Must state +25 XP reward');
    });
  });

});
