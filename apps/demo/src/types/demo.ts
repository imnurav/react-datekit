export type ThemeAccent = 'blue' | 'purple' | 'emerald' | 'rose' | 'amber';

export interface ThemeColors {
  primary: string;
  primaryHover: string;
  rangeBg: string;
  rangeHoverBg: string;
  rangeText: string;
}

export const THEME_ACCENTS: Record<ThemeAccent, ThemeColors> = {
  blue: {
    primary: '#2563eb',
    primaryHover: '#1d4ed8',
    rangeBg: '#eff6ff',
    rangeHoverBg: '#dbeafe',
    rangeText: '#1d4ed8',
  },
  purple: {
    primary: '#7c3aed',
    primaryHover: '#6d28d9',
    rangeBg: '#f5f3ff',
    rangeHoverBg: '#ede9fe',
    rangeText: '#6d28d9',
  },
  emerald: {
    primary: '#059669',
    primaryHover: '#047857',
    rangeBg: '#ecfdf5',
    rangeHoverBg: '#d1fae5',
    rangeText: '#047857',
  },
  rose: {
    primary: '#e11d48',
    primaryHover: '#be123c',
    rangeBg: '#fff1f2',
    rangeHoverBg: '#ffe4e6',
    rangeText: '#be123c',
  },
  amber: {
    primary: '#d97706',
    primaryHover: '#b45309',
    rangeBg: '#fffbeb',
    rangeHoverBg: '#fef3c7',
    rangeText: '#b45309',
  },
};

export interface NavItem {
  id: string;
  title: string;
  badge?: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export const NAV_GROUPS: NavGroup[] = [
  {
    title: 'Getting Started',
    items: [
      { id: 'introduction', title: 'Introduction' },
      { id: 'playground', title: 'Interactive Studio', badge: 'Live' },
      { id: 'installation', title: 'Installation' },
      { id: 'nextjs', title: 'Next.js Setup', badge: 'SSR' },
    ],
  },
  {
    title: 'Core Components',
    items: [
      { id: 'single', title: 'Single Date' },
      { id: 'input-demos', title: 'Trigger Popover', badge: 'Input' },
      { id: 'range', title: 'Date Range' },
      { id: 'presets', title: 'Presets', badge: '15+' },
      { id: 'datetime', title: 'Date & Time' },
      { id: 'multiple', title: 'Multiple Dates' },
    ],
  },
  {
    title: 'Constraints & Custom',
    items: [
      { id: 'disabled-dates', title: 'Disabled Dates' },
      { id: 'disable-future', title: 'Disable Future Dates', badge: 'New' },
      { id: 'min-max', title: 'Min / Max Bounds' },
      { id: 'custom-presets', title: 'Custom Presets' },
      { id: 'custom-rendering', title: 'Custom Date Cells' },
    ],
  },
  {
    title: 'Experience & Reference',
    items: [
      { id: 'mobile-preview', title: 'Mobile Experience', badge: 'Touch' },
      { id: 'theming', title: 'Theming & Tokens' },
      { id: 'accessibility', title: 'Accessibility (a11y)' },
      { id: 'api-reference', title: 'API Reference' },
    ],
  },
];
