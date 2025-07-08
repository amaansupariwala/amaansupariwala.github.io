import { createGlobalStyle } from 'styled-components';

// New dark palette with deep black base and purple-gold gradients
export const theme = {
  colors: {
    primary: '#9333ea',      // Purple
    secondary: '#f59e0b',    // Gold
    accent: '#dc2626',       // Red accent
    background: '#0c0c0f',   // Deep black base
    surface: '#1a1a1d',     // Slightly lighter black
    text: '#f8fafc',        // Off-white
    textSecondary: '#94a3b8', // Gray
    border: '#374151',       // Dark border
    gradient: {
      purple: '#9333ea',
      gold: '#f59e0b',
      purpleGold: 'linear-gradient(135deg, #9333ea 0%, #f59e0b 100%)',
      subtle: 'linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%)'
    }
  },
  fonts: {
    primary: "'Inter', 'Poppins', sans-serif",
    secondary: "'Poppins', 'Inter', sans-serif",
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
    '2xl': '2rem',
    '3xl': '2.5rem',
    '4xl': '3rem',
    '5xl': '4rem',
  },
  fontWeights: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeights: {
    none: 1,
    tight: 1.25,
    normal: 1.5,
    loose: 2,
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem',
  },
  breakpoints: {
    xs: '0px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
  },
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    md: '0.25rem',
    lg: '0.5rem',
    xl: '1rem',
    full: '9999px',
  },
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    glow: '0 0 20px rgba(147, 51, 234, 0.3)',
  },
  transitions: {
    default: 'all 0.3s ease-in-out',
    slow: 'all 0.6s ease-in-out',
    fast: 'all 0.15s ease-in-out',
  },
  zIndices: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    tooltip: 1600,
    pacBorder: 9999,
  },
  header: {
    height: '60px',
    mobileHeight: '56px',
  }
};

// Global styles for the entire application
export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap');
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  html, body {
    font-family: ${theme.fonts.primary};
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
    font-size: 16px;
    line-height: ${theme.lineHeights.normal};
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100vh;
    overflow-x: hidden;
  }
  
  #root {
    min-height: 100vh;
    background-color: ${theme.colors.background};
    position: relative;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fonts.primary};
    font-weight: ${theme.fontWeights.bold};
    line-height: ${theme.lineHeights.tight};
    margin-bottom: ${theme.spacing.md};
    color: ${theme.colors.text};
  }
  
  h1 {
    font-size: ${theme.fontSizes['5xl']};
  }
  
  h2 {
    font-size: ${theme.fontSizes['4xl']};
  }
  
  h3 {
    font-size: ${theme.fontSizes['3xl']};
  }
  
  h4 {
    font-size: ${theme.fontSizes['2xl']};
  }
  
  h5 {
    font-size: ${theme.fontSizes.xl};
  }
  
  h6 {
    font-size: ${theme.fontSizes.lg};
  }
  
  p {
    margin-bottom: ${theme.spacing.md};
    color: ${theme.colors.text};
  }
  
  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    transition: ${theme.transitions.default};
    
    &:hover {
      color: ${theme.colors.secondary};
    }
  }
  
  button {
    font-family: ${theme.fonts.primary};
    cursor: pointer;
  }
  
  img {
    max-width: 100%;
    height: auto;
  }
  
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${theme.spacing.md};
  }
  
  /* Page transitions */
  .page-enter {
    opacity: 0;
    transform: translateY(20px);
  }
  
  .page-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 300ms ease-in-out, transform 300ms ease-in-out;
  }
  
  .page-exit {
    opacity: 1;
    transform: translateY(0);
  }
  
  .page-exit-active {
    opacity: 0;
    transform: translateY(-20px);
    transition: opacity 300ms ease-in-out, transform 300ms ease-in-out;
  }
  
  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: ${theme.colors.surface};
  }
  
  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.gradient.purpleGold};
    border-radius: ${theme.borderRadius.full};
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #a855f7, #fbbf24);
  }
  
  /* Accessibility */
  @media (prefers-reduced-motion: reduce) {
    .pac-border,
    .pac-sprite {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
    }
  }
`; 