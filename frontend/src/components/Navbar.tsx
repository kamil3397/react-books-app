import { AppBar, Toolbar, Button, Box, Typography } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

export const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const { t, i18n } = useTranslation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'pl' : 'en';
    i18n.changeLanguage(nextLang);
  };

  return (
    <AppBar position="static" color="primary" elevation={3}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 240 }}>
  <Button
    component={NavLink}
    to="/"
    color="inherit"
    sx={{
      display: 'flex',
      alignItems: 'center',
      textTransform: 'none',
      fontSize: '1.25rem',
      fontWeight: 500,
      mr: 2,
    }}
  >
    <MenuBookIcon fontSize="large" sx={{ mr: 1 }} />
    Bookify
  </Button>

  <Typography
    variant="body2"
    sx={{
      color: 'white',
      whiteSpace: 'nowrap',
      fontSize: '0.875rem',
      mr: 0.5,
      minWidth: 90,
    }}
  >
    {t('navbar.languageToggleLabel')}
  </Typography>
  <Button
    onClick={toggleLanguage}
    sx={{
      color: 'inherit',
      minWidth: 36,
      px: 0.5,
      fontSize: '0.875rem',
      fontWeight: 500,
    }}
  >
    {i18n.language === 'en' ? 'PL' : 'EN'}
  </Button>
</Box>

        <Box>
          <Button
            component={NavLink}
            to="/books"
            sx={{
              color: 'inherit',
              textDecoration: 'none',
              marginRight: '1rem',
              '&.active': {
                fontWeight: 'bold',
                borderBottom: '2px solid white',
              },
            }}
          >
            {t('navbar.books')}
          </Button>
          <Button
            component={NavLink}
            to="/favorites"
            sx={{
              color: 'inherit',
              textDecoration: 'none',
              marginRight: '1rem',
              '&.active': {
                fontWeight: 'bold',
                borderBottom: '2px solid white',
              },
            }}
          >
            {t('navbar.favorites')}
          </Button>
          {isLoggedIn ? (
            <Button onClick={handleLogout} sx={{ color: 'white' }}>
              {t('navbar.logout')}
            </Button>
          ) : (
            <Button
              component={NavLink}
              to="/login"
              sx={{
                color: 'inherit',
                textDecoration: 'none',
                marginRight: '1rem',
                '&.active': {
                  fontWeight: 'bold',
                  borderBottom: '2px solid white',
                },
              }}
            >
              {t('navbar.login')}
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
