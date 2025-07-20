import { AppBar, Toolbar, Button, Box, Typography } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { Translation } from './i18n/Translation';

export const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const { i18n } = useTranslation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const availableLanguages = ['en', 'pl'];

  const toggleLanguage = () => {
    const currentIndex = availableLanguages.indexOf(i18n.language);
    const nextIndex = (currentIndex + 1) % availableLanguages.length;
    i18n.changeLanguage(availableLanguages[nextIndex]);
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

          <Translation i18nKey="navbar.languageToggleLabel">
            {(text) => (
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
                {text}
              </Typography>
            )}
          </Translation>

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
          <Translation i18nKey="navbar.books">
            {(text) => (
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
                {text}
              </Button>
            )}
          </Translation>

          <Translation i18nKey="navbar.favorites">
            {(text) => (
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
                {text}
              </Button>
            )}
          </Translation>

          <Button
            component={NavLink}
            to="/profile"
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
            Profile
          </Button>

          {isLoggedIn ? (
            <Translation i18nKey="navbar.logout">
              {(text) => (
                <Button onClick={handleLogout} sx={{ color: 'white' }}>
                  {text}
                </Button>
              )}
            </Translation>
          ) : (
            <Translation i18nKey="navbar.login">
              {(text) => (
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
                  {text}
                </Button>
              )}
            </Translation>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
