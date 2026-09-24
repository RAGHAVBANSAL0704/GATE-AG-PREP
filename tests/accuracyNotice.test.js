import { test, describe, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

describe('Portal Accuracy & Issue Reporting Advisory Notice Tests', () => {

  test('PortalAccuracyNoticeModal exists and contains required messaging and reporting actions', () => {
    const filePath = path.resolve('src/components/PortalAccuracyNoticeModal.jsx');
    assert.ok(fs.existsSync(filePath), 'PortalAccuracyNoticeModal.jsx must exist');
    const content = fs.readFileSync(filePath, 'utf-8');

    // 1. Made with 100% care to be accurate
    assert.match(content, /100%\s*care/i, 'Must mention 100% care');
    assert.match(content, /accurate/i, 'Must mention accuracy');

    // 2. Some questions or parts of portal may be found incorrect
    assert.match(content, /incorrect/i, 'Must mention possibility of incorrect questions/parts');

    // 3. Advised to report to admin to help tackle issues
    assert.match(content, /report.*admin/i, 'Must advise reporting to admin');
    assert.match(content, /tackle.*issues/i, 'Must mention tackling issues');

    // 4. Persistence key for single-visit dismissal
    assert.match(content, /gate_ag_accuracy_notice_dismissed/, 'Must use dismissal persistence key');
  });

  test('App.jsx properly wires PortalAccuracyNoticeModal with one-time display logic', () => {
    const appPath = path.resolve('src/App.jsx');
    const appContent = fs.readFileSync(appPath, 'utf-8');

    // Must import PortalAccuracyNoticeModal
    assert.match(appContent, /PortalAccuracyNoticeModal/, 'App.jsx must import PortalAccuracyNoticeModal');

    // Must check gate_ag_accuracy_notice_dismissed
    assert.match(appContent, /gate_ag_accuracy_notice_dismissed/, 'App.jsx must check dismissal in localStorage');

    // Must render PortalAccuracyNoticeModal
    assert.match(appContent, /<PortalAccuracyNoticeModal/, 'App.jsx must render PortalAccuracyNoticeModal');
  });
});
