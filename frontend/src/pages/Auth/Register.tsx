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
        navigate('/login');
      })
      .catch((error) => {
        const message = error.response?.data?.message || 'Registration failed';
        setError(message);
      });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4">
        Create an Account
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate mt="16px">
        <TextField
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <TextField
          select
          label="Preferred Book Language"
          name="preferredLanguage"
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

        {error && <Alert severity="error" sx={{ mt: '16px' }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mt: '16px' }}>{success}</Alert>}

        <Button type="submit" variant="contained" fullWidth size="large" sx={{ mt: '24px' }}>
          Register
        </Button>

        <Typography variant="body2" mt="16px">
          Already have an account? <Button onClick={() => navigate('/login')}>Log in</Button>
        </Typography>
      </Box>
    </Container>
  );
};
