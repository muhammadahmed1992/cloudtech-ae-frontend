import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Paper,
  Box,
  Alert,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import { register } from '../../services/register.service';

const Registration: React.FC = () => {
  const [credentials, setCredentials] = useState<{ name: string; password: string; roleId: number }>({
    name: '',
    password: '',
    roleId: 2, 
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await register(credentials);
      if (response) {
        setSuccess('User registered successfully!');
        setCredentials({ name: '', password: '', roleId: 2 }); 
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      setError('Registration error. Please try again.');
    }
  };

  return (
    <Grid container component="main" justifyContent="center" alignItems="center" sx={{ minHeight: '100vh' }}>
      <Paper elevation={3} sx={{ padding: 3, width: '300px', borderRadius: '8px' }}>
        <Typography variant="h6" component="h1" align="center" gutterBottom>
          Create a New User
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              label="Username"
              variant="standard"
              fullWidth
              value={credentials.name}
              onChange={(e) => setCredentials({ ...credentials, name: e.target.value })}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Password"
              type="password"
              variant="standard"
              fullWidth
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
          </Box>
          <Box mb={2}>
            <FormControl fullWidth variant="standard">
              <InputLabel>Role</InputLabel>
              <Select
                value={credentials.roleId}
                onChange={(e) => setCredentials({ ...credentials, roleId: Number(e.target.value) })}
              >
                <MenuItem value={1}>Admin</MenuItem>
                <MenuItem value={2}>User</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Register
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default Registration;
