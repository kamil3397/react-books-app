import { useState, type ChangeEvent, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, TextField, Typography, Alert } from '@mui/material'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext'

export const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError('')

    axios
      .post('http://localhost:4000/login', { email, password })
      .then((res) => {
        const { accessToken } = res.data
        login(accessToken) // użyj login() z kontekstu
        navigate('/books')
      })
      .catch((err) => {
        const message = err.response?.data?.message || 'Login failed'
        setError(message)
      })
  }

  return (
    <Box component="form" onSubmit={handleSubmit} maxWidth={400} mx="auto" mt={8}>
      <Typography variant="h5" mb={2}>
        Login
      </Typography>

      <TextField
        fullWidth
        label="Email"
        type="email"
        value={email}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        margin="normal"
        required
      />

      <TextField
        fullWidth
        label="Password"
        type="password"
        value={password}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        margin="normal"
        required
      />

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        Log In
      </Button>
    </Box>
  )
}
