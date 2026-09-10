/**
 * Engineers' Day 2026 Celebration Utilities & Metadata
 * Organized by: COAET, CCS HAU Hisar
 * Theme: Ksetraveda Yantradhara (क्षेत्रवेद यंत्रधारा)
 */

export const ENGINEERS_DAY_METADATA = {
  themeName: "Ksetraveda Yantradhara",
  themeHindi: "क्षेत्रवेद यंत्रधारा",
  organizerShort: "COAET, CCS HAU Hisar",
  organizerFull: "College of Agricultural Engineering and Technology, Chaudhary Charan Singh Haryana Agricultural University, Hisar",
  date: "15 September 2026",
  cutoffTimestampIso: "2026-09-15T23:59:59+05:30",
  invocationHindi: "क्षेत्रवेद यंत्रधारा: कृषि ज्ञान की पावन धरोहर और आधुनिक अभियांत्रिकी के अविरल प्रवाह का गौरवमयी संगम। सी.ओ.ए.ई.टी., सी.सी.एस. एच.ए.यू. हिसार की ओर से समस्त भावी व कार्यरत अभियंताओं को राष्ट्रीय अभियंता दिवस की हार्दिक शुभकामनाएं!",
  invocationEnglish: "Confluence of the sacred science of the fields (Ksetraveda) with the unstoppable torrent of engineering innovation (Yantradhara). Empowering agriculture through mechanization, precision hydrology, and sustainable agro-processing.",
  tribute: "A Tribute to Bharat Ratna Sir M. Visvesvaraya: Honoring the father of Indian engineering by dedicating our technical intellect to solving agrarian challenges."
};

/**
 * Validates if the current date is on or before 15 September 2026 (IST)
 */
export function isEngineersDayActive(currentDate = new Date()) {
  const cutoff = new Date(ENGINEERS_DAY_METADATA.cutoffTimestampIso);
  const now = currentDate instanceof Date ? currentDate : new Date(currentDate);
  return now.getTime() <= cutoff.getTime();
}
