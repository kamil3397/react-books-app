import { AppBar, Toolbar, Button, Box } from '@mui/material'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

export const Navbar = () => {
  const navigate = useNavigate()
  const { isLoggedIn, logout } = useAuthContext()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <AppBar position="static" color="primary" elevation={3}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
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
          }}
        >
          <MenuBookIcon fontSize="large" sx={{ mr: 1 }} />
          Bookify
        </Button>

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
            Books
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
            Favorites
          </Button>
          {isLoggedIn ? (
            <Button onClick={handleLogout} sx={{ color: 'white' }}>
              Logout
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
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}
