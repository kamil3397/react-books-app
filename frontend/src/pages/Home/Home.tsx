import { Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth={false}
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to right, #f5f7fa, #c3cfe2)',
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          textAlign: 'center',
          paddingTop: '80px',
          paddingBottom: '80px',
        }}
      >
        <Typography variant="h2" gutterBottom>
          Discover Timeless Books
        </Typography>
        <Typography variant="h6" paragraph>
          Explore classics from the Gutendex Library. Sign up to save your favorites and rediscover forgotten gems.
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{ marginTop: '32px' }}
          onClick={() => navigate('/register')}
        >
          Get Started
        </Button>
      </Container>
    </Container>
  );
};
