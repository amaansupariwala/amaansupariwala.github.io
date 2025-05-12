import { createGlobalStyle } from 'styled-components';
import portfolioData from './portfolioData';

const { colors } = portfolioData;

// Theme object with color palette and other design tokens
export const theme = {
  colors: {
    primary: colors.primary,
    secondary: colors.secondary,
    accent1: colors.accent1,
    accent2: colors.accent2,
    gradient1: colors.gradient1,
    gradient2: colors.gradient2,
    background: colors.background,
    surface: colors.surface,
    text: colors.text,
    textSecondary: colors.textSecondary,
  },
  fonts: {
    primary: "'Poppins', 'Inter', sans-serif",
    secondary: "'Inter', 'Poppins', sans-serif",
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
  },
};

// Global styles for the entire application
export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');
  
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
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fonts.primary};
    font-weight: ${theme.fontWeights.bold};
    line-height: ${theme.lineHeights.tight};
    margin-bottom: ${theme.spacing.md};
  }
  
  h1 {
    font-size: ${theme.fontSizes['4xl']};
  }
  
  h2 {
    font-size: ${theme.fontSizes['3xl']};
  }
  
  h3 {
    font-size: ${theme.fontSizes['2xl']};
  }
  
  h4 {
    font-size: ${theme.fontSizes.xl};
  }
  
  h5 {
    font-size: ${theme.fontSizes.lg};
  }
  
  h6 {
    font-size: ${theme.fontSizes.md};
  }
  
  p {
    margin-bottom: ${theme.spacing.md};
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
  
  section {
    padding: ${theme.spacing['3xl']} 0;
  }
  
  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: ${theme.colors.background};
  }
  
  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.primary};
    border-radius: ${theme.borderRadius.full};
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.secondary};
  }
`;

export default theme; 