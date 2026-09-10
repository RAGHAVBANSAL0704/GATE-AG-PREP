import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { 
  ASPIRANT_CREED, 
  generateWelcomeEmailHtml, 
  generateWelcomeEmailText, 
  generateWelcomeSMS, 
  generateWelcomeNotification 
} from '../src/utils/welcomeTemplates.js';

describe('Welcome Templates & Aspirant Creed Tests', () => {
  test('ASPIRANT_CREED contains authentic Hindi translation and English quote', () => {
    assert.ok(ASPIRANT_CREED.hindi, 'Hindi quote must be defined');
    assert.ok(ASPIRANT_CREED.english, 'English quote must be defined');

    // Verify Hindi quote wording
    assert.match(ASPIRANT_CREED.hindi, /कठिन परिश्रम और सफलता के आगे बहानों का कोई स्थान नहीं होता/);
    assert.match(ASPIRANT_CREED.hindi, /गहराई से सोचना/);
    assert.match(ASPIRANT_CREED.hindi, /समय का अनंत प्रवाह बहता रहे/);

    // Verify English quote wording
    assert.match(ASPIRANT_CREED.english, /Excuses fade before the altar of hard work and success/i);
    assert.match(ASPIRANT_CREED.english, /boundless flow/i);
  });

  test('generateWelcomeEmailHtml generates valid HTML with Hindi quote appearing before English quote', () => {
    const mockUser = {
      full_name: 'Raghav Bansal',
      college_name: 'COAET CCS HAU Hisar'
    };

    const html = generateWelcomeEmailHtml(mockUser);
    assert.match(html, /Raghav Bansal/);
    assert.match(html, /COAET CCS HAU Hisar/);

    // Verify Hindi quote is present
    const hindiIndex = html.indexOf(ASPIRANT_CREED.hindi);
    const englishIndex = html.indexOf(ASPIRANT_CREED.english);

    assert.ok(hindiIndex !== -1, 'Hindi quote should be in HTML email');
    assert.ok(englishIndex !== -1, 'English quote should be in HTML email');
    assert.ok(hindiIndex < englishIndex, 'Hindi quote MUST appear before English quote');
  });

  test('generateWelcomeEmailText generates plain text with Hindi quote before English quote', () => {
    const mockUser = {
      full_name: 'Priya Patel',
      college_name: 'IIT Kharagpur'
    };

    const text = generateWelcomeEmailText(mockUser);
    assert.match(text, /Priya Patel/);
    assert.match(text, /IIT Kharagpur/);

    const hindiPos = text.indexOf(ASPIRANT_CREED.hindi);
    const englishPos = text.indexOf(ASPIRANT_CREED.english);

    assert.ok(hindiPos !== -1, 'Hindi quote should be in text email');
    assert.ok(englishPos !== -1, 'English quote should be in text email');
    assert.ok(hindiPos < englishPos, 'Hindi quote MUST precede English quote in plain text email');
  });

  test('generateWelcomeSMS formats concise message with Hindi first and wishes for success', () => {
    const mockUser = {
      full_name: 'Vikram Singh'
    };

    const sms = generateWelcomeSMS(mockUser);
    assert.match(sms, /Vikram Singh/);
    assert.ok(sms.indexOf(ASPIRANT_CREED.hindi) < sms.indexOf(ASPIRANT_CREED.english));
    assert.match(sms, /grand success in GATE AG/i);
  });

  test('generateWelcomeNotification produces structured notification object', () => {
    const mockUser = {
      username: 'agri_topper'
    };

    const notif = generateWelcomeNotification(mockUser);
    assert.equal(notif.type, 'welcome');
    assert.match(notif.title, /agri_topper/);
    assert.equal(notif.messageHindi, ASPIRANT_CREED.hindi);
    assert.equal(notif.messageEnglish, ASPIRANT_CREED.english);
    assert.match(notif.wish, /hard work/i);
  });
});
