import React from "react";
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
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import * as Yup from "yup";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { ILogin } from "../../types/ILogin";

interface AuthFormProps {
  title: string;
  buttonText: string;
  onSubmit: (values: ILogin) => void;
  loading: boolean;
  error: string | null;
  redirectLink: { text: string; href: string };
}

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(4, "Username must be at least 4 characters long"),
  password: Yup.string()
    .required("Password is required")
    .min(4, "Password must be at least 4 characters long"),
});

const AuthForm: React.FC<AuthFormProps> = ({ title, buttonText, onSubmit, loading, error, redirectLink }) => {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {title}
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <Box sx={{ mt: 3 }}>
                <Grid2 container spacing={2}>
                  <Grid2 size={{ xs: 12 }}>
                    <Field
                      as={TextField}
                      name="username"
                      fullWidth
                      label="Username"
                      required
                      error={touched.username && Boolean(errors.username)}
                      helperText={<ErrorMessage name="username" />}
                    />
                  </Grid2>
                  <Grid2 size={{ xs: 12 }}>
                    <Field
                      as={TextField}
                      name="password"
                      type="password"
                      fullWidth
                      label="Password"
                      required
                      error={touched.password && Boolean(errors.password)}
                      helperText={<ErrorMessage name="password" />}
                    />
                  </Grid2>
                </Grid2>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  //disabled={loading || isSubmitting}
                >
                  {loading ? "Loading..." : buttonText}
                </Button>
                <Grid2 container justifyContent="flex-end">
                  <Grid2>
                    <Link href={redirectLink.href} variant="body2">
                      {redirectLink.text}
                    </Link>
                  </Grid2>
                </Grid2>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default AuthForm;
