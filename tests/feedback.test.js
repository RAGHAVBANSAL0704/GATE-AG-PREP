import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

describe('Direct WhatsApp Issue Reporting Tests', () => {
  const WHATSAPP_NUMBER = "917206283166";

  const generateWhatsAppUrl = ({ category, questionRef, name, description }) => {
    const formattedMsg = `*GATE AG Prep — Issue Report*
----------------------------------
*Category:* ${category}
*Target Ref/Question:* ${questionRef.trim() || 'N/A'}
*Student Name:* ${name.trim() || 'GATE Aspirant'}
----------------------------------
*Problem Details:*
${description.trim()}
----------------------------------
_Sent from GATE AG Prep Web Portal_`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(formattedMsg)}`;
  };

  it('generates valid WhatsApp wa.me URL with pre-filled issue parameters', () => {
    const url = generateWhatsAppUrl({
      category: 'Question Error',
      questionRef: 'GATE_2026_Q15',
      name: 'Ankit',
      description: 'Specific fuel consumption in step 2 has a typo.'
    });

    assert.ok(url.startsWith('https://wa.me/917206283166?text='), 'URL must use wa.me/917206283166');
    assert.ok(url.includes(encodeURIComponent('Question Error')), 'URL must encode category');
    assert.ok(url.includes(encodeURIComponent('GATE_2026_Q15')), 'URL must encode target question reference');
  });

  it('handles optional fields gracefully', () => {
    const url = generateWhatsAppUrl({
      category: 'UI Bug',
      questionRef: '',
      name: '',
      description: 'Calculator modal button overlap on mobile screen.'
    });

    assert.ok(url.includes(encodeURIComponent('GATE Aspirant')), 'Fallback name must be GATE Aspirant');
    assert.ok(url.includes(encodeURIComponent('N/A')), 'Empty ref fallback must be N/A');
  });
});
