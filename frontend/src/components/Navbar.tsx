import { AppBar, Toolbar, Button, Box } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';

import { NavLink, useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar>
      <Toolbar>
        <Button
          component={NavLink}
          to="/"
          color="inherit"
          sx={{ display: 'flex', alignItems: 'center', fontSize: '1.25rem', fontWeight: 500 }}
        >
          <MenuBookIcon fontSize="large" />
          Bookify
        </Button>

        <Box>
          <Button
            component={NavLink}
            to="/books"
            color="inherit"
            sx={{ '&.active': { fontWeight: 'bold', borderBottom: '2px solid white' } }}
          >
            Books
          </Button>

          <Button
            component={NavLink}
            to="/favorites"
            color="inherit"
            sx={{ '&.active': { fontWeight: 'bold', borderBottom: '2px solid white' } }}
          >
            Favorites
          </Button>

          {isLoggedIn ? (
            <Button onClick={handleLogout} color="inherit">
              Logout
            </Button>
          ) : (
            <Button
              component={NavLink}
              to="/login"
              color="inherit"
              sx={{ '&.active': { fontWeight: 'bold', borderBottom: '2px solid white' } }}
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
