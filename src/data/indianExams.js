export const ALL_INDIAN_EXAM_DOMAINS = [
  {
    domain: 'Agricultural & Rural Development',
    icon: '🌾',
    exams: [
      { id: 'gate_ag', name: 'GATE AG (Agricultural Engineering)', badge: 'Primary Portal' },
      { id: 'icar_jrf', name: 'ICAR AIEEA PG / JRF (Agri Engineering & Technology)', badge: 'High Demand' },
      { id: 'icar_srf', name: 'ICAR SRF / PhD Entrance Exam', badge: 'Research' },
      { id: 'nabard_a', name: 'NABARD Grade A (Assistant Manager - ARD/Agri)', badge: 'Govt Officer' },
      { id: 'ibps_afo', name: 'IBPS AFO (Agricultural Field Officer)', badge: 'Bank Specialist' },
      { id: 'fci_agri', name: 'FCI AG-III (Technical / General)', badge: 'PSU' },
      { id: 'state_ao', name: 'State Agriculture Officer (AO / AAO)', badge: 'State PSC' },
      { id: 'cotton_cci', name: 'Cotton Corporation / NSC Officer', badge: 'PSU' }
    ]
  },
  {
    domain: 'Engineering & Technology (GATE / ESE / PSU)',
    icon: '⚙️',
    exams: [
      { id: 'gate_xe', name: 'GATE XE (Engineering Sciences)', badge: 'Multi-Discipline' },
      { id: 'gate_me', name: 'GATE ME (Mechanical Engineering)' },
      { id: 'gate_ce', name: 'GATE CE (Civil Engineering)' },
      { id: 'gate_ee', name: 'GATE EE (Electrical Engineering)' },
      { id: 'gate_cs', name: 'GATE CS (Computer Science & IT)' },
      { id: 'gate_ec', name: 'GATE EC (Electronics & Comm)' },
      { id: 'ese_ies', name: 'UPSC ESE / IES (Engineering Services Exam)', badge: 'Class-1 Govt' },
      { id: 'state_ae_je', name: 'State AE / JE (Irrigation & PWD Depts)', badge: 'State Govt' },
      { id: 'isro_barc', name: 'ISRO / BARC Scientist Engineer Exam', badge: 'Research PSU' }
    ]
  },
  {
    domain: 'Civil Services & State PSCs',
    icon: '🏛️',
    exams: [
      { id: 'upsc_cse', name: 'UPSC Civil Services (IAS / IPS / IFS)', badge: 'National' },
      { id: 'upsc_ifs', name: 'UPSC Indian Forest Service (IFS)', badge: 'Forestry/Agri' },
      { id: 'uppsc', name: 'UPPSC (Uttar Pradesh Combined State Services)' },
      { id: 'bpsc', name: 'BPSC (Bihar Public Service Commission)' },
      { id: 'mpsc', name: 'MPSC (Maharashtra Public Service Commission)' },
      { id: 'ras_rpsc', name: 'RPSC RAS (Rajasthan Administrative Service)' },
      { id: 'hpsc', name: 'HPSC (Haryana Public Service Commission)' },
      { id: 'mppsc', name: 'MPPSC (Madhya Pradesh State Services)' }
    ]
  },
  {
    domain: 'Banking, Finance & Insurance',
    icon: '🏦',
    exams: [
      { id: 'sbi_po', name: 'SBI PO (Probationary Officer)', badge: 'Top Bank' },
      { id: 'sbi_clerk', name: 'SBI Junior Associate (Clerk)' },
      { id: 'ibps_po', name: 'IBPS PO (Probationary Officer)' },
      { id: 'ibps_clerk', name: 'IBPS Clerk' },
      { id: 'rbi_grade_b', name: 'RBI Grade B Officer', badge: 'Central Bank' },
      { id: 'rbi_assistant', name: 'RBI Assistant' },
      { id: 'lic_aao', name: 'LIC AAO (Assistant Administrative Officer)' }
    ]
  },
  {
    domain: 'SSC & Railway Exams',
    icon: '🚆',
    exams: [
      { id: 'ssc_cgl', name: 'SSC CGL (Combined Graduate Level)', badge: 'Popular' },
      { id: 'ssc_chsl', name: 'SSC CHSL (10+2 Level)' },
      { id: 'ssc_je', name: 'SSC JE (Junior Engineer)' },
      { id: 'rrb_ntpc', name: 'RRB NTPC (Non-Technical Popular Categories)' },
      { id: 'rrb_je', name: 'RRB JE (Railway Junior Engineer)' },
      { id: 'rrb_alp', name: 'RRB ALP (Assistant Loco Pilot)' }
    ]
  },
  {
    domain: 'Management & Business (MBA)',
    icon: '💼',
    exams: [
      { id: 'cat', name: 'CAT (Common Admission Test - IIMs)', badge: 'Top MBA' },
      { id: 'xat', name: 'XAT (XLRI Jamshedpur)' },
      { id: 'cuet_pg_mba', name: 'CUET PG MBA (Central Universities)' },
      { id: 'nmat', name: 'NMAT by GMAC' },
      { id: 'snap', name: 'SNAP (Symbiosis International)' }
    ]
  },
  {
    domain: 'Teaching & Scientific Research',
    icon: '🎓',
    exams: [
      { id: 'csir_net', name: 'CSIR UGC NET (Earth, Life & Chemical Sciences)', badge: 'JRF' },
      { id: 'ugc_net', name: 'UGC NET (Assistant Professor & JRF)' },
      { id: 'ctet', name: 'CTET (Central Teacher Eligibility Test)' },
      { id: 'state_tet', name: 'State TET / SET Exams' }
    ]
  },
  {
    domain: 'Defense & Police Services',
    icon: '🛡️',
    exams: [
      { id: 'nda', name: 'NDA (National Defence Academy)' },
      { id: 'cds', name: 'CDS (Combined Defence Services)' },
      { id: 'afcat', name: 'AFCAT (Air Force Common Admission Test)' },
      { id: 'capf', name: 'UPSC CAPF (Assistant Commandant)' }
    ]
  },
  {
    domain: 'Medical & Healthcare Entrance',
    icon: '🩺',
    exams: [
      { id: 'neet_ug', name: 'NEET UG (Medical Entrance)' },
      { id: 'neet_pg', name: 'NEET PG / INI-CET' },
      { id: 'gpat', name: 'GPAT (Graduate Pharmacy Aptitude Test)' }
    ]
  },
  {
    domain: 'Undergraduate Entrances',
    icon: '📖',
    exams: [
      { id: 'jee_main', name: 'JEE Main (Engineering Entrances)' },
      { id: 'jee_adv', name: 'JEE Advanced (IITs Entrance)' },
      { id: 'cuet_ug', name: 'CUET UG (Undergraduate Common Test)' },
      { id: 'bitsat', name: 'BITSAT (BITS Pilani)' }
    ]
  }
];
