import { AppBar, Toolbar, Button, Box } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

export const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuthContext();

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

        <Box sx={{ ml: 'auto' }}>
          <Button component={NavLink} to="/books">Books</Button>
          <Button component={NavLink} to="/favorites">Favorites</Button>
          <Button
            component={NavLink}
            to="/profile"
            sx={{
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
            <Button onClick={handleLogout}>Logout</Button>
          ) : (
            <Button component={NavLink} to="/login">Login</Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
