import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Box, Button, Container, TextField, Typography, MenuItem, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
  { label: 'العربية', value: 'ar' },
];

export const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    preferredLanguage: 'en',
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
        setSuccess('Account created successfully!');
        setForm({ name: '', email: '', password: '', preferredLanguage: 'en' });
        navigate('/login')
      })
      .catch((error) => {
        const message = error.response?.data?.message || 'Registration failed';
        setError(message);
      });
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom>
        Create an Account
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          margin="normal"
          value={form.name}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          margin="normal"
          value={form.email}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Password"
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
          label="Preferred Book Language"
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
          Register
        </Button>

        <Typography variant="body2" mt={2}>
          Already have an account?{' '}
          <Button onClick={() => navigate('/login')}>Log in</Button>
        </Typography>
      </Box>
    </Container>
  );
};
