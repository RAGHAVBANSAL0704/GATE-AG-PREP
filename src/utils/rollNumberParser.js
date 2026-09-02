/**
 * Smart Roll Number & Admission Number Auto-Parser
 * 
 * Analyzes university admission numbers across CCS HAU, IITs, State Agricultural
 * Universities (SAUs), and ICAR institutes to auto-detect degree program, batch year,
 * graduation class, academic year, and target GATE examination year.
 */

export function parseAdmissionRollNumber(rawInput, university = '') {
  if (!rawInput || typeof rawInput !== 'string') {
    return { isValid: false, message: 'Please enter your roll number / admission number' };
  }

  const clean = rawInput.trim().toUpperCase().replace(/[\s-]/g, '');
  if (clean.length < 4) {
    return { isValid: false, message: 'Too short to parse' };
  }

  const currentCalendarYear = new Date().getFullYear(); // e.g. 2026
  let admissionYear = null;
  let degree = 'B.Tech (Agricultural Engineering)';
  let durationYears = 4;
  let isLateral = false;
  let programLevel = 'UG'; // 'UG' | 'PG' | 'PhD'

  // 1. CCS HAU Pattern Analysis
  // Formats: 2022AE01BIV, 2023AE05BLII (Lateral), 2021AE05BIV(R), 2024AE01M, 2022AE01P
  const hauMatch = clean.match(/^(\d{4})AE(\d{1,3})(BIV|BLII|BIV\(R\)|M|P|D)?/i);
  if (hauMatch) {
    admissionYear = parseInt(hauMatch[1], 10);
    const suffix = (hauMatch[3] || '').toUpperCase();

    if (suffix === 'BLII') {
      degree = 'B.Tech (Agricultural Engineering) - Lateral Entry';
      durationYears = 3;
      isLateral = true;
    } else if (suffix.startsWith('BIV')) {
      degree = 'B.Tech (Agricultural Engineering)';
      durationYears = 4;
    } else if (suffix === 'M') {
      degree = 'M.Tech (Agricultural Engineering)';
      durationYears = 2;
      programLevel = 'PG';
    } else if (suffix === 'P' || suffix === 'D') {
      degree = 'Ph.D. (Agricultural Engineering)';
      durationYears = 3;
      programLevel = 'PhD';
    }
  }

  // 2. IIT Kharagpur / IIT Patterns
  // Formats: 22AG10015 (B.Tech 4Y), 22AG30005 (Dual 5Y), 22AG60R04 (M.Tech 2Y), 22AG90R02 (PhD)
  if (!admissionYear) {
    const iitMatch = clean.match(/^(\d{2})AG(60R\d{1,3}|90R\d{1,3}|300\d{1,3}|\d{1,5})/i);
    if (iitMatch) {
      const yr2Digit = parseInt(iitMatch[1], 10);
      admissionYear = 2000 + yr2Digit;
      const progCode = iitMatch[2].toUpperCase();

      if (progCode.startsWith('60R')) {
        degree = 'M.Tech (Agricultural & Food Engineering)';
        durationYears = 2;
        programLevel = 'PG';
      } else if (progCode.startsWith('90R')) {
        degree = 'Ph.D. (Agricultural & Food Engineering)';
        durationYears = 3;
        programLevel = 'PhD';
      } else if (progCode.startsWith('300')) {
        degree = 'B.Tech + M.Tech Dual Degree (Agri & Food Engg)';
        durationYears = 5;
      } else {
        degree = 'B.Tech (Agricultural & Food Engineering)';
        durationYears = 4;
      }
    }
  }

  // 3. Generic SAU / 4-Digit Leading Year Pattern
  // Formats: 2022-AG-045, CTAE2023015, PAU2021102, 202410145
  if (!admissionYear) {
    const gen4Match = clean.match(/(\d{4})/);
    if (gen4Match) {
      const candYr = parseInt(gen4Match[1], 10);
      if (candYr >= 1990 && candYr <= currentCalendarYear + 1) {
        admissionYear = candYr;
        if (clean.includes('MTECH') || clean.includes('MSC') || clean.includes('PG')) {
          degree = 'M.Tech (Agricultural Engineering / Allied)';
          durationYears = 2;
          programLevel = 'PG';
        } else if (clean.includes('PHD') || clean.includes('DOC')) {
          degree = 'Ph.D. (Agricultural Engineering)';
          durationYears = 3;
          programLevel = 'PhD';
        }
      }
    }
  }

  // 4. Generic 2-Digit Year Fallback (e.g. AG22105)
  if (!admissionYear) {
    const gen2Match = clean.match(/(\d{2})/);
    if (gen2Match) {
      const candYr = 2000 + parseInt(gen2Match[1], 10);
      if (candYr >= 2005 && candYr <= currentCalendarYear + 1) {
        admissionYear = candYr;
      }
    }
  }

  // Validation failure if no year extracted
  if (!admissionYear) {
    return { 
      isValid: false, 
      message: 'Could not detect admission batch year from roll number format' 
    };
  }

  // Calculate Academic Milestones
  const graduationYear = admissionYear + durationYears;
  const elapsedYears = currentCalendarYear - admissionYear;

  let academicYear = '4th Year (Final Year)';
  let targetGateYear = currentCalendarYear;

  if (programLevel === 'UG') {
    if (elapsedYears <= 0) {
      academicYear = '1st Year (Freshman)';
      targetGateYear = admissionYear + 2; // Eligible from 3rd year onwards
    } else if (elapsedYears === 1) {
      academicYear = '2nd Year (Sophomore)';
      targetGateYear = admissionYear + 2;
    } else if (elapsedYears === 2) {
      academicYear = '3rd Year (Pre-Final Year)';
      targetGateYear = currentCalendarYear;
    } else if (elapsedYears === 3) {
      academicYear = isLateral ? 'Final Year (Senior)' : '4th Year (Final Year)';
      targetGateYear = currentCalendarYear;
    } else {
      academicYear = 'Graduate / Alum Aspirant';
      targetGateYear = currentCalendarYear;
    }
  } else if (programLevel === 'PG') {
    if (elapsedYears <= 0) {
      academicYear = 'M.Tech 1st Year';
      targetGateYear = currentCalendarYear;
    } else if (elapsedYears === 1) {
      academicYear = 'M.Tech 2nd Year (Final Year)';
      targetGateYear = currentCalendarYear;
    } else {
      academicYear = 'Post-Graduate Alum Aspirant';
      targetGateYear = currentCalendarYear;
    }
  } else {
    academicYear = 'Ph.D. Scholar / Researcher';
    targetGateYear = currentCalendarYear;
  }

  // Summary preview badge string
  const summaryBadge = `${degree} (${admissionYear}–${graduationYear}) • ${academicYear} • Target: GATE ${targetGateYear}`;

  return {
    isValid: true,
    cleanCode: clean,
    admissionYear,
    graduationYear,
    durationYears,
    isLateral,
    degree,
    programLevel,
    academicYear,
    targetGateYear,
    summaryBadge
  };
}
