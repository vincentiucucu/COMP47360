import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { login } from '../services/postLogin';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        VendTune
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignIn() {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const username = data.get("email");
    const password = data.get("password");

    try {
      const res = await login(username, password);
      if (res.status >= 200 && res.status < 300) {
        navigate("/services");
      } else {
        navigate("/login");
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ bgcolor: '#333', width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              animation: "fadeIn 1s ease-in-out",
              color: "white",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0px 0px 10px rgba(0,0,0,0.5)",
              backdropFilter: 'blur(20px)'
            }}
          >
            <Avatar
              sx={{
                m: 1,
                bgcolor: "#ff7043",
                width: 56,
                height: 56,
                animation: "bounce 1s infinite",
              }}
            >
              <LockOutlinedIcon sx={{ fontSize: 32 }} />
            </Avatar>
            <Typography
              component="h1"
              variant="h5"
              sx={{
                fontFamily: "'Roboto', sans-serif",
                fontWeight: "bold",
                color: "#ff7043",
                letterSpacing: "0.5px",
              }}
            >
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                sx={{
                  "& .MuiInputLabel-root": { color: "#ff7043" },
                  "& .MuiOutlinedInput-root": {
                    "& > fieldset": { borderColor: "#ff7043" },
                  },
                  "& .MuiOutlinedInput-root:hover": {
                    "& > fieldset": { borderColor: "#ff7043" },
                  },
                  "& .MuiOutlinedInput-root.Mui-focused": {
                    "& > fieldset": { borderColor: "#ff7043" },
                  },
                  input: { color: "black" } // Ensure input text is visible
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                sx={{
                  "& .MuiInputLabel-root": { color: "#ff7043" },
                  "& .MuiOutlinedInput-root": {
                    "& > fieldset": { borderColor: "#ff7043" },
                  },
                  "& .MuiOutlinedInput-root:hover": {
                    "& > fieldset": { borderColor: "#ff7043" },
                  },
                  "& .MuiOutlinedInput-root.Mui-focused": {
                    "& > fieldset": { borderColor: "#ff7043" },
                  },
                  input: { color: "black" } // Ensure input text is visible
                }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: "0.875rem",
                    color: "#ff7043",
                  },
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: "bold",
                  textTransform: "none",
                  bgcolor: "#ff7043",
                  color: "white",
                  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
                  "&:hover": {
                    bgcolor: "#ff8a65",
                    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .5)",
                  },
                  transition: "all 0.3s ease-in-out",
                }}
              >
                {loading ? "Loading..." : "Sign In"}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2" sx={{ color: "#ff7043" }}>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2" sx={{ color: "#ff7043" }}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4, color: "#ff7043" }} />
        </Container>
        <style>
          {`
            @keyframes fadeIn {
              0% { opacity: 0; }
              100% { opacity: 1; }
            }

            @keyframes bounce {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-10px); }
            }
          `}
        </style>
      </ThemeProvider>
    </Box>
  );
}
