import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

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
          {t('home.title')}
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          {t('home.description')}
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/register')}
          sx={{ mt: 4 }}
        >
          {t('home.cta')}
        </Button>
      </Container>
    </Box>
  );
};
