/**
 * Engineers' Day 2026 Celebration Utilities & Metadata
 * Organized by: COAET, CCS HAU Hisar
 * Theme: KṣetraVeda Yantradhārā (क्षेत्रवेद यन्त्रधारा) 🌾⚙️
 */

export const ENGINEERS_DAY_METADATA = {
  themeName: "KṣetraVeda Yantradhārā",
  themeHindi: "क्षेत्रवेद यन्त्रधारा",
  organizerShort: "COAET, CCS HAU Hisar",
  organizerFull: "College of Agricultural Engineering and Technology, Chaudhary Charan Singh Haryana Agricultural University, Hisar",
  date: "15 September 2026",
  cutoffTimestampIso: "2026-09-15T23:59:59+05:30",
  shortStageVersion: "KṣetraVeda Yantradhārā represents the seamless flow of knowledge, innovation and technology through the fields of agriculture. ‘Kṣetra’ signifies our land, ‘Veda’ its wisdom, ‘Yantra’ the power of engineering, and ‘Dhārā’ the continuous flow of progress. Together, the theme celebrates the beautiful union of agriculture and engineering, where traditional wisdom meets modern innovation to cultivate a smarter and more sustainable future.",
  invocationHindi: "KṣetraVeda Yantradhārā 🌾⚙️: Kṣetra (क्षेत्र - भूमि/खेत), Veda (वेद - ज्ञान/विद्या), Yantra (यन्त्र - अभियांत्रिकी/तकनीक), और Dhārā (धारा - अविरल प्रवाह)। कृषि ज्ञान की पावन धरोहर और आधुनिक अभियांत्रिकी के अविरल प्रवाह का गौरवमयी संगम। सी.ओ.ए.ई.टी., सी.सी.एस. एच.ए.यू. हिसार की ओर से राष्ट्रीय अभियंता दिवस की हार्दिक शुभकामनाएं!",
  invocationEnglish: "A continuous stream of knowledge and technology flowing through the fields of agriculture. From irrigation and farm machinery to renewable energy, precision agriculture and smart farming, engineering acts as the bridge between the wisdom of the soil and the possibilities of technology.",
  coreEssence: "For Engineers’ Day, KṣetraVeda Yantradhārā celebrates not merely machines and technology, but the ideas, innovation and human ingenuity that make agriculture more efficient, sustainable and future-ready. 🌱⚙️",
  etymology: [
    { term: "Kṣetra", devanagari: "क्षेत्र", meaning: "Field, land, or cultivated earth" },
    { term: "Veda", devanagari: "वेद", meaning: "Knowledge, wisdom, and understanding" },
    { term: "Yantra", devanagari: "यन्त्र", meaning: "Machine, instrument, or technology" },
    { term: "Dhārā", devanagari: "धारा", meaning: "Continuous flow or stream" }
  ],
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
