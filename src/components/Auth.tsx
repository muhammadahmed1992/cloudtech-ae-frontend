import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Paper,
  Box,
  Alert,
  Typography,
} from '@mui/material';
import { login } from '../services/login.service';
import { useAuth } from './AuthProvider';
import { User } from '../types/user/user';
import { useNavigate } from 'react-router-dom';

const Auth: React.FC = () => {
  const [credentials, setCredentials] = useState<User>({ name: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const { performLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); 
  
    try {
      const { accessToken, isValid } = await login(credentials); 
      if (isValid && accessToken) {
        performLogin(accessToken); 
        navigate('/'); 
      } else {
        setError('Invalid username or password'); 
      }
    } catch (error) {
      setError('An error occurred while trying to log in. Please try again.'); 
      console.error('Login error:', error); 
    }
  };
  

  return (
    <Grid container component="main" justifyContent="center" alignItems="center" sx={{ minHeight: '100vh' }}>
      <Paper elevation={3} sx={{ padding: 3, width: '300px', borderRadius: '8px' }}>
        <Typography variant="h6" component="h1" align="center" gutterBottom>
          Login to Your Account
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              label="Username"
              variant="standard"
              fullWidth
              value={credentials.name}
              onChange={(e) => setCredentials({ name: e.target.value, password: credentials.password })}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Password"
              type="password"
              variant="standard"
              fullWidth
              value={credentials.password}
              onChange={(e) => setCredentials({ name: credentials.name, password: e.target.value })}
            />
          </Box>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default Auth;
