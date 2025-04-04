import { createTheme } from '@mui/material/styles';

// Mercado Libre inspired theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#3483fa',
      light: '#6cb4ff',
      dark: '#0056c7',
    },
    secondary: {
      main: '#ff7733',
      light: '#ff9966',
      dark: '#cc5c26',
    },
    success: {
      main: '#00a650',
      light: '#4cd989',
      dark: '#007538',
    },
    error: {
      main: '#f44336',
      light: '#ff7961',
      dark: '#ba000d',
    },
    warning: {
      main: '#fff159',
      light: '#ffffa8',
      dark: '#cabc00',
      contrastText: '#333333',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    divider: '#e6e6e6',
  },
  typography: {
    fontFamily: [
      'Roboto',
      'Helvetica',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '32px',
      fontWeight: 700,
      lineHeight: 1.25,
    },
    h2: {
      fontSize: '24px',
      fontWeight: 500,
      lineHeight: 1.25,
    },
    h3: {
      fontSize: '20px',
      fontWeight: 500,
      lineHeight: 1.25,
    },
    h4: {
      fontSize: '18px', 
      fontWeight: 500,
      lineHeight: 1.25,
    },
    h5: {
      fontSize: '16px',
      fontWeight: 500,
      lineHeight: 1.25,
    },
    h6: {
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: 1.25,
    },
    subtitle1: {
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: 1.5,
      color: '#666666',
    },
    subtitle2: {
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: 1.57,
      color: '#666666',
    },
    body1: {
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: 1.5,
      color: '#666666',
    },
    button: {
      fontSize: '14px',
      fontWeight: 500,
      textTransform: 'none',
    },
    caption: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: 1.66,
      color: '#666666',
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0 1px 2px 0 rgba(0,0,0,.15)',
    '0 1px 3px 0 rgba(0,0,0,.2)',
    '0 2px 4px 0 rgba(0,0,0,.2)',
    '0 4px 8px 0 rgba(0,0,0,.15)',
    '0 8px 16px 0 rgba(0,0,0,.15)',
    ...Array(19).fill('none'),
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 6,
          boxShadow: 'none',
          padding: '8px 16px',
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: '0 2px 4px 0 rgba(0,0,0,.2)',
            transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
          },
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: '#1959c3',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 2px 0 rgba(0,0,0,.15)',
          borderRadius: 8,
          transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
  },
});

export default theme;
