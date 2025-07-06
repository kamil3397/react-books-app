import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Box, Button, Container, TextField, Typography, MenuItem, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const languageOptions = [
  { label: 'English', value: 'en' },
  { label: 'Polski', value: 'pl' },
  { label: 'Deutsch', value: 'de' },
  { label: 'Français', value: 'fr' },
  { label: 'Español', value: 'es' },
  { label: 'Italiano', value: 'it' },
  { label: 'Nederlands', value: 'nl' },
  { label: 'Português', value: 'pt' },
  { label: 'Latin', value: 'la' },
  { label: 'Suomi', value: 'fi' },
  { label: 'Ελληνικά', value: 'el' },
  { label: '中文', value: 'zh' },
  { label: 'العربية', value: 'ar' }
];

export const Register = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    preferredLanguage: 'en'
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    axios
      .post('http://localhost:4000/register', form)
      .then(() => {
        setSuccess(t('registerPage.success'));
        setForm({ name: '', email: '', password: '', preferredLanguage: 'en' });
        navigate('/login');
      })
      .catch((error) => {
        const message = error.response?.data?.message || t('registerPage.failed');
        setError(message);
      });
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom>
        {t('registerPage.title')}
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label={t('registerPage.name')}
          name="name"
          margin="normal"
          value={form.name}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label={t('registerPage.email')}
          name="email"
          type="email"
          margin="normal"
          value={form.email}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label={t('registerPage.password')}
          name="password"
          type="password"
          margin="normal"
          value={form.password}
          onChange={handleChange}
          required
        />
        <TextField
          select
          fullWidth
          label={t('registerPage.language')}
          name="preferredLanguage"
          margin="normal"
          value={form.preferredLanguage}
          onChange={handleChange}
          required
        >
          {languageOptions.map(({ label, value }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </TextField>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mt: 2 }}>
            {success}
          </Alert>
        )}

        <Button type="submit" variant="contained" size="large" fullWidth sx={{ mt: 3 }}>
          {t('registerPage.submit')}
        </Button>

        <Typography variant="body2" mt={2}>
          {t('registerPage.alreadyAccount')}{' '}
          <Button onClick={() => navigate('/login')}>{t('registerPage.loginLink')}</Button>
        </Typography>
      </Box>
    </Container>
  );
};
