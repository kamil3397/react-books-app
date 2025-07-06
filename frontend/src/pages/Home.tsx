import { Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth={false} className="HomeWrapper">
      <Container maxWidth="md" className="HomeContainer">
        <Typography variant="h2" gutterBottom>
          Discover Timeless Books
        </Typography>
        <Typography variant="h6" paragraph>
          Explore classics from the Gutendex Library. Sign up to save your favorites and rediscover forgotten gems.
        </Typography>
        <Button
          variant="contained"
          size="large"
          className="HomeButton"
          onClick={() => navigate('/register')}
        >
          Get Started
        </Button>
      </Container>
    </Container>
  );
};
