/**
 * Welcome Message & Notification Templates for GATE AG Prep Platform
 * Features the Aspirant Creed (Hindi translation leading English).
 */

export const ASPIRANT_CREED = {
  hindi: "कठिन परिश्रम और सफलता के आगे बहानों का कोई स्थान नहीं होता। गहराई से सोचना, अविचल पुरुषार्थ करना और उत्कृष्टता के लिए निरंतर संघर्षरत रहना एक पावन साधना है—यह साधना तब तक और उसके बाद भी अनवरत चलनी चाहिए, जब तक समय का अनंत प्रवाह बहता रहे।",
  english: "Excuses fade before the altar of hard work and success. To think deeply, to toil unyieldingly, and to strive for excellence is a sacred pursuit—one that must never cease as long as time continues its boundless flow."
};

/**
 * Generate full HTML email template for newly registered users
 */
export function generateWelcomeEmailHtml(user = {}) {
  const name = user.full_name || user.fullName || user.display_name || user.username || 'Aspirant';
  const college = user.college_name || user.collegeName || user.institute || 'Premier Agricultural Institute';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to GATE AG Prep</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 24px; line-height: 1.6;">
  <div style="max-width: 620px; margin: 0 auto; background-color: #ffffff; border-radius: 14px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025);">
    
    <!-- Top Emerald Header Banner -->
    <div style="background: linear-gradient(135deg, #059669 0%, #047857 100%); padding: 36px 28px; text-align: center; color: #ffffff;">
      <div style="font-size: 40px; line-height: 1; margin-bottom: 12px;">🌾 🚜 🎯</div>
      <h1 style="margin: 0; font-size: 26px; font-weight: 800; letter-spacing: -0.5px;">Welcome to GATE AG Prep!</h1>
      <p style="margin: 8px 0 0; opacity: 0.95; font-size: 15px; font-weight: 500;">Your Dedicated Platform for GATE Agricultural Engineering</p>
    </div>

    <!-- Main Content -->
    <div style="padding: 32px 28px;">
      <p style="font-size: 16px; margin-top: 0; color: #0f172a;">
        Dear <strong>${name}</strong>,
      </p>

      <p style="font-size: 15px; color: #334155; line-height: 1.7;">
        Heartiest congratulations on registering with <strong>GATE AG Prep</strong> (${college})! By joining today, you have committed to stepping onto the path of discipline, rigorous problem-solving, and premier academic achievement.
      </p>

      <!-- Bilingual Golden Quote Card: Hindi first, then English -->
      <div style="background: linear-gradient(180deg, #fffbeb 0%, #fef3c7 100%); border: 1px solid #fde68a; border-left: 5px solid #d97706; border-radius: 10px; padding: 22px; margin: 26px 0;">
        <div style="display: flex; align-items: center; margin-bottom: 12px;">
          <span style="font-size: 20px; margin-right: 8px;">✨</span>
          <strong style="color: #92400e; font-size: 13px; letter-spacing: 0.8px; text-transform: uppercase;">Aspirant Creed • प्रेरणा संदेश</strong>
        </div>
        
        <!-- Hindi Translation (Leading) -->
        <p style="margin: 0 0 14px 0; font-size: 15px; line-height: 1.8; color: #78350f; font-weight: 600;">
          « ${ASPIRANT_CREED.hindi} »
        </p>

        <div style="height: 1px; background-color: #fcd34d; margin: 14px 0;"></div>

        <!-- English Version -->
        <p style="margin: 0; font-size: 13.5px; line-height: 1.7; color: #92400e; font-style: italic;">
          "${ASPIRANT_CREED.english}"
        </p>
      </div>

      <p style="font-size: 15px; color: #334155; line-height: 1.7;">
        Mastery in Agricultural Engineering is forged day by day—through every tractor dynamics derivation in <strong>FMPE</strong>, runoff hydrograph in <strong>SWCE</strong>, and heat transfer equation in <strong>PFE</strong>. There are no shortcuts; only dedicated preparation transforms ambition into an All-India Rank.
      </p>

      <!-- Core Features -->
      <h3 style="font-size: 16px; color: #0f172a; margin: 24px 0 12px; font-weight: 700;">🚀 What You Now Have Access To:</h3>
      <ul style="margin: 0 0 24px; padding-left: 20px; font-size: 14px; line-height: 1.8; color: #475569;">
        <li><strong>1,320+ Official PYQs:</strong> 2007–2026 verified questions with exact GATE keys & solutions.</li>
        <li><strong>50 Full-Length CBT Mocks:</strong> Real GATE UI, countdown timer, and negative marking simulation.</li>
        <li><strong>Formula Sheet & AI Doubt Solver:</strong> High-yield formulas, step-by-step NAT breakdowns, and instant conceptual answers.</li>
      </ul>

      <!-- CTA Button -->
      <div style="text-align: center; margin: 32px 0;">
        <a href="https://gateagprep.web.app" style="background: #059669; color: #ffffff; text-decoration: none; padding: 14px 34px; border-radius: 8px; font-weight: 700; font-size: 15px; display: inline-block; box-shadow: 0 4px 6px -1px rgba(5, 150, 105, 0.3);">
          Begin Practice Now &rarr;
        </a>
      </div>

      <p style="font-size: 14px; color: #64748b; margin-bottom: 4px;">
        We wish you tireless perseverance, sharp analytical thinking, and grand success in GATE Agricultural Engineering!
      </p>
      <p style="font-size: 14px; font-weight: 700; color: #1e293b; margin-top: 8px;">
        — Team GATE AG Prep
      </p>
    </div>

    <!-- Footer -->
    <div style="background-color: #f1f5f9; padding: 18px 28px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0;">
      © 2026 GATE AG Prep Platform. Dedicated to excellence in Agricultural Engineering.
    </div>
  </div>
</body>
</html>`;
}

/**
 * Generate plain text email for email clients without HTML support
 */
export function generateWelcomeEmailText(user = {}) {
  const name = user.full_name || user.fullName || user.display_name || user.username || 'Aspirant';
  const college = user.college_name || user.collegeName || user.institute || 'Agricultural Institute';

  return `Welcome to GATE AG Prep, ${name}!

Registration Confirmed: ${college}

=======================================================
ASPIRANT CREED (प्रेरणा संदेश)
=======================================================
« ${ASPIRANT_CREED.hindi} »

"${ASPIRANT_CREED.english}"
=======================================================

Dear ${name},

Welcome to India's dedicated preparation platform for GATE Agricultural Engineering.

Mastery in AG comes through consistent daily effort—solving numericals across Farm Machinery & Power, Soil & Water Conservation, and Food Processing Engineering.

We wish you relentless hard work, sharp thinking, and resounding success in your GATE AG journey!

Best regards,
GATE AG Prep Team
https://gateagprep.web.app
`;
}

/**
 * Generate SMS / WhatsApp / Telegram message
 */
export function generateWelcomeSMS(user = {}) {
  const name = user.full_name || user.fullName || user.display_name || user.username || 'Aspirant';

  return `🌾 Welcome to GATE AG Prep, ${name}! 🚀

« ${ASPIRANT_CREED.hindi} »

"${ASPIRANT_CREED.english}"

Gear up with 1,320+ Official PYQs & 50 Full Mocks. We wish you intense hard work, deep thinking, and grand success in GATE AG! 🎯`;
}

/**
 * Generate in-app notification payload
 */
export function generateWelcomeNotification(user = {}) {
  const name = user.full_name || user.fullName || user.display_name || user.username || 'Aspirant';

  return {
    title: `Welcome to GATE AG Prep, ${name}! 🌾`,
    messageHindi: ASPIRANT_CREED.hindi,
    messageEnglish: ASPIRANT_CREED.english,
    wish: "May your hard work, analytical thinking, and persistence lead you to a top All-India Rank in GATE Agricultural Engineering!",
    type: "welcome",
    timestamp: new Date().toISOString()
  };
}
