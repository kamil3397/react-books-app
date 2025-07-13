import { useState } from 'react';
import { Button, Container, TextField, Typography, MenuItem, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios, { AxiosError } from 'axios';

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

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

const schema = yup.object().shape({
  name: yup.string().min(2, 'Name must be at least 2 characters').max(50).required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(passwordRegex, 'Your password must contain at least one uppercase letter and one number')
    .required('Password is required'),
  preferredLanguage: yup.string().required('Language is required'),
});

type FormData = {
  name: string;
  email: string;
  password: string;
  preferredLanguage: string;
};

export const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      preferredLanguage: 'en',
    },
  });

  const onSubmit = async (data: FormData) => {
  setError('');

  try {
    await axios.post('http://localhost:4000/register', data);
    navigate('/login');
  } catch (err) {
    const axiosError = err as AxiosError<{ message?: string }>;
    const message = axiosError.response?.data?.message || 'Registration failed';
    setError(message);
  }
};

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Typography variant="h4">
        Create an Account
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: 16 }}>
        <TextField
          fullWidth
          label="Name"
          margin="normal"
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          fullWidth
          label="Email"
          type="email"
          margin="normal"
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <TextField
          select
          fullWidth
          label="Preferred Book Language"
          margin="normal"
          {...register('preferredLanguage')}
          error={!!errors.preferredLanguage}
          helperText={errors.preferredLanguage?.message}
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

        <Button type="submit" variant="contained" size="large" fullWidth sx={{ mt: 3 }}>
          Register
        </Button>

        <Typography variant="body2" mt={2}>
          Already have an account?{' '}
          <Button onClick={() => navigate('/login')}>Log in</Button>
        </Typography>
      </form>
    </Container>
  );
};
