import React from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Avatar,
  Container,
  CssBaseline,
  Link,
  Alert,
} from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

interface AuthFormProps {
  title: string;
  buttonText: string;
  onSubmit: () => void;
  loading: boolean;
  error: string | null;
  redirectLink: { text: string; href: string };
  formData: { username: string; password: string };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ title, buttonText, onSubmit, loading, error, redirectLink, formData, handleChange }) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit();
    };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {title}
          </Typography>
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid2 container spacing={2}>
              <Grid2 size={{ xs: 12 }}>
                <TextField
                  name="username"
                  required
                  fullWidth
                  label="Username"
                  value={formData.username}
                  onChange={handleChange}
                  error={!!error}
                />
              </Grid2>
              <Grid2 size={{ xs: 12 }}>
                <TextField
                  name="password"
                  type="password"
                  required
                  fullWidth
                  label="Password"
                  value={formData.password}
                  onChange={handleChange}
                  error={!!error}
                />
              </Grid2>
            </Grid2>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>
              {loading ? 'Loading...' : buttonText}
            </Button>
            <Grid2 container justifyContent="flex-end">
              <Grid2>
                <Link href={redirectLink.href} variant="body2">
                  {redirectLink.text}
                </Link>
              </Grid2>
            </Grid2>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default AuthForm;
