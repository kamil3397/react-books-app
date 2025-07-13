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
          startIcon={<MenuBookIcon fontSize="large" />}
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          Bookify
        </Button>

        <Box>
          <Button component={NavLink} to="/books">
            Books
          </Button>
          <Button component={NavLink} to="/favorites">
            Favorites
          </Button>
          {isLoggedIn ? (
            <Button onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button component={NavLink} to="/login">
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
