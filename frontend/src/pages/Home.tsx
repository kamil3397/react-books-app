import { Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Translation } from '../components/i18n/Translation';

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
      <Container maxWidth="md" sx={{ textAlign: 'center', py: 10 }}>
        <Translation i18nKey="home.title">
          {(text) => (
            <Typography variant="h2" fontWeight="bold" gutterBottom>
              {text}
            </Typography>
          )}
        </Translation>

        <Translation i18nKey="home.description">
          {(text) => (
            <Typography variant="h6" color="text.secondary" paragraph>
              {text}
            </Typography>
          )}
        </Translation>

        <Translation i18nKey="home.cta">
          {(text) => (
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/register')}
              sx={{ mt: 4 }}
            >
              {text}
            </Button>
          )}
        </Translation>
      </Container>
    </Container>
  );
};
