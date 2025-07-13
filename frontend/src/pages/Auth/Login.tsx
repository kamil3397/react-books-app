import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Alert, Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios, { AxiosError } from 'axios';
import { useAuthContext } from '../../context/AuthContext';

type FormData = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuthContext();
  const [error, setError] = useState('');

  const {register,handleSubmit,formState: { errors }} = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: FormData) => {
    setError('');

    axios
      .post('http://localhost:4000/login', data)
      .then((res) => {
        const { accessToken } = res.data;
        login(accessToken);
        navigate('/books');
      })
      .catch((err: AxiosError<{ message?: string }>) => {
        const message = err.response?.data?.message || 'Login failed';
        setError(message);
      });
  };

  return (
    <Box maxWidth={400} mx="auto" mt={8}>
      <Typography variant="h5" mb={2}>
        Login
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} >
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

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Log In
        </Button>
      </form>
    </Box>
  );
};
