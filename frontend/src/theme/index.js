export const theme = {
  colors: {
    primary: '#3B82F6',
    secondary: '#10B981',
    accent: '#FBBF24',
    background: '#F8FAFC',
    surface: '#FFFFFF',
    error: '#EF4444',
    success: '#10B981',
    warning: '#F59E0B',
    info: '#3B82F6',
    text: {
      primary: '#1F2937',
      secondary: '#6B7280',
      disabled: '#9CA3AF',
      light: '#FFFFFF',
    },
    border: {
      light: '#E5E7EB',
      dark: '#D1D5DB',
    },
    gray: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },
  },
  typography: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: '700',
      lineHeight: '1.2',
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: '600',
      lineHeight: '1.25',
      letterSpacing: '-0.02em',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: '600',
      lineHeight: '1.3',
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: '600',
      lineHeight: '1.4',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: '500',
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: '500',
      lineHeight: '1.5',
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: '500',
      lineHeight: '1.57',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: '1.5',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: '1.57',
    },
    body: {
      fontSize: '1rem',
      fontWeight: '400',
      lineHeight: '1.5',
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: '600',
      lineHeight: '1.57',
      textTransform: 'none',
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: '1.66',
    },
    small: {
      fontSize: '0.875rem',
      fontWeight: '400',
    },
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
  },
  shape: {
    borderRadius: '0.75rem',
  },
  borderRadius: {
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
  },
  shadows: [
    'none',
    '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  ],
  transitions: {
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
  zIndex: {
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
};

export default theme;
