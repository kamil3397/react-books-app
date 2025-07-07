import { useEffect, useState } from 'react';
import { Container, Typography, TextField, CircularProgress, Alert, Box } from '@mui/material';
import axios from 'axios';

interface UserProfile {
  name: string;
  email: string;
  language: string;
}

export const ProfilePage = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get<UserProfile>('http://localhost:4000/profile', {
          headers: { Authorization: token },
        });
        setProfile(res.data);
      } catch {
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!profile) return <Alert severity="warning">Profile data not available. Please try again later.</Alert>;

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 5 }}>
      <Typography variant="h4" gutterBottom>User Profile</Typography>
      <Typography variant="h6" gutterBottom>Hello, {profile.name}!</Typography>

      <Box sx={{ width: '100%', maxWidth: 400, mt: 2 }}>
        <TextField
          label="Name"
          value={profile.name}
          fullWidth
          margin="normal"
          disabled
        />
        <TextField
          label="Email"
          value={profile.email}
          fullWidth
          margin="normal"
          disabled
        />
        <TextField
          label="Preferred Language"
          value={profile.language}
          fullWidth
          margin="normal"
          disabled
        />
      </Box>
    </Container>
  );
};
