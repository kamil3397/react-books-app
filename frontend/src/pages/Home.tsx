import { Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

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
          {t('home.title')}
        </Typography>
        <Typography variant="h6" paragraph>
          {t('home.description')}
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{ marginTop: '32px' }}
          onClick={() => navigate('/register')}
        >
          {t('home.cta')}
        </Button>
      </Container>
    </Container>
  );
};
