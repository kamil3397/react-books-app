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
      secondary: '#555',
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

          '&.HomeWrapper': {
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(to right, #f5f7fa, #c3cfe2)',
          },

          '&.HomeContainer': {
            textAlign: 'center',
            paddingTop: '80px',
            paddingBottom: '80px',
          },

          '&.BookCardTextWrapper': {
            flexGrow: 1,
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h2: {
          fontWeight: 'bold',
          marginBottom: '16px',
        },
        h6: {
          color: 'text.secondary',
        },
        subtitle1: {
          '&.BookCardTitle': {
            fontWeight: 'bold',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            minHeight: 48,
          },
        },
        body2: {
          '&.BookCardAuthor': {
            marginTop: 8,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontSize: '1rem',
          textDecoration: 'none',
          '&.HomeButton': {
            marginTop: '32px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          '&.BookCard': {
            height: 420,
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 16,
            boxShadow: 2,
            overflow: 'hidden',
            position: 'relative',
          },
        },
      },
    },
    MuiCardMedia: {
      styleOverrides: {
        root: {
          '&.BookCardImage': {
            height: 240,
            objectFit: 'cover',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          '&.BookCardFavorite': {
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 1,
            backgroundColor: 'light',
            color: theme.palette.error.main,
            width: 36,
            height: 36,
            borderRadius: '50%',
            padding: 0,
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '&:hover': {
              backgroundColor: 'light',
            },
            '& svg': {
              fontSize: '20px',
              margin: 0,
            },
          },
        }),
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          '&.BookCardContent': {
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
          },
        },
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
    MuiAppBar: {
      defaultProps: {
        color: 'primary',
        position: 'static',
        elevation: 3,
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
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          marginRight: '0.5rem',
        },
      },
    },
  },
});
