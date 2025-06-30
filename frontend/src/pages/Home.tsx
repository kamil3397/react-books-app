import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(to right, #f5f7fa, #c3cfe2)',
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: 'center', py: 10 }}>
        <Typography variant="h2" fontWeight="bold" gutterBottom>
          Discover Timeless Books
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Explore classics from the Gutendex Library. Sign up to save your favorites and rediscover forgotten gems.
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/register')}
          sx={{ mt: 4 }}
        >
          Get Started
        </Button>
      </Container>
    </Box>
  );
};
