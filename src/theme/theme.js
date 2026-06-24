// Airtel app design tokens — derived directly from the reference screenshots.
// Keep this file as the single source of truth so every screen matches.

export const colors = {
  airtelRed: '#ED1C24',        // primary brand red (status bar / header)
  airtelRedDark: '#C8161D',    // pressed / gradient end
  black: '#1A1A1A',
  white: '#FFFFFF',
  bgGray: '#F4F4F4',           // app background behind cards
  cardWhite: '#FFFFFF',
  textPrimary: '#1A1A1A',
  textSecondary: '#5F6368',
  textMuted: '#8A8A8A',
  divider: '#EAEAEA',
  blueIcon: '#1F6FE5',         // outline icons in "More" menu (Upgrade eSIM, Help, etc.)
  linkBlue: '#1A73E8',         // "Manage Account", "View All"
  successGreen: '#1FA855',
  purpleCard: '#7B4FA0',       // "My Favourites" tile
  greenCard: '#7CB342',        // "Statements" tile
  tabActive: '#ED1C24',
  tabInactive: '#9A9A9A',
  batteryPill: '#ED1C24',
};

export const gradients = {
  // Profile header geometric gradient (teal -> olive -> orange/brown)
  profileHeader: ['#2C5F5A', '#6E6B3A', '#A8531E', '#7A2E12'],
};

export const fonts = {
  // Airtel app uses a clean rounded sans-serif (system default is the closest
  // safe match across iOS/Android without bundling a custom font).
  regular: 'System',
  medium: 'System',
  bold: 'System',
};

export const fontSizes = {
  xs: 11,
  sm: 13,
  base: 15,
  md: 16,
  lg: 18,
  xl: 22,
  xxl: 28,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const radius = {
  sm: 6,
  md: 10,
  lg: 16,
  pill: 999,
};

export default { colors, gradients, fonts, fontSizes, spacing, radius };
