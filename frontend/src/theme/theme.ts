import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#ffffff',
    },
    error: {
      main: '#d32f2f',
    },
    background: {
      default: '#f5f5f5',
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#555555',
      disabled: '#9e9e9e',
    },
  },
  spacing: 8,
  typography: {
    h4: {
      fontWeight: 600,
      fontSize: '2rem',
      marginBottom: '1rem',
    },
    body1: {
      fontSize: '1rem',
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingTop: '32px',
          paddingBottom: '32px',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h2: {
          fontWeight: 'bold',
          marginBottom: '16px',
        },
        h6: ({ theme }) => ({
          color: theme.palette.text.secondary,
        }),
        subtitle1: {
          fontWeight: 'bold',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          minHeight: '48px',
        },
        body2: {
          marginTop: '8px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          textTransform: 'none',
          fontSize: '1rem',
          textDecoration: 'none',
          '&.Mui-disabled': {
            color: theme.palette.text.disabled,
          },
        }),
        text: ({ theme }) => ({
          color: theme.palette.primary.main,
          '&:hover': {
            backgroundColor: 'rgba(25, 118, 210, 0.08)',
          },
        }),
        contained: ({ theme }) => ({
          color: theme.palette.primary.light,
        }),
      },
    },
    MuiAppBar: {
      defaultProps: {
        color: 'primary',
        position: 'static',
        elevation: 3,
      },
      styleOverrides: {
        root: {
          '& .MuiButton-root': {
            color: 'inherit',
          },
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          display: 'flex',
          justifyContent: 'space-between',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          height: '420px',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '16px',
          boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
          overflow: 'hidden',
          position: 'relative',
        },
      },
    },
    MuiCardMedia: {
      styleOverrides: {
        root: {
          height: '240px',
          objectFit: 'cover',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.error.main,
        }),
      },
    },
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
        margin: 'normal',
      },
    },
    MuiGrid: {
      defaultProps: {
        spacing: 3,
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        rounded: {
          borderRadius: '8px',
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          marginRight: '8px',
        },
      },
    },
  },
});
