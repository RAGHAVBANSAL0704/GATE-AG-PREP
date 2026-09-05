export const DEFAULT_THEME_ID = 'oxford-sage';
export const DEFAULT_DARK_MODE = false;

export const APP_THEMES = [
  // --- STREAMLINED 2 CORE MODES (LIGHT DEFAULT & DARK) ---
  {
    id: 'oxford-sage',
    name: 'Light Mode',
    tagline: 'Crisp slate canvas with elevated white cards & deep slate typography',
    type: 'light',
    badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    swatches: ['#F8FAFC', '#FFFFFF', '#0F172A', '#E2E8F0'],
    accent: '#10B981'
  },
  {
    id: 'obsidian-emerald',
    name: 'Dark Mode',
    tagline: 'Deep dark backdrop with high-contrast typography & emerald accents',
    type: 'dark',
    badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    swatches: ['#050811', '#0B1120', '#10B981', '#172645'],
    accent: '#10B981'
  }
];

