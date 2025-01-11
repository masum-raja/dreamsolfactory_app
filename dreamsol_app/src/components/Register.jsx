import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
  Container,
  Link,
} from "@mui/material";
import {
  Google as GoogleIcon,
  Facebook as FacebookIcon,
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Lock as LockIcon,
  Person as PersonIcon,
  Email as EmailIcon,
} from "@mui/icons-material";
import "./Register.css";

const Register = () => {
  const [isRegisterActive, setIsRegisterActive] = useState(false);

  const toggleForm = () => setIsRegisterActive((prev) => !prev);

  return (
    <Container className={`container ${isRegisterActive && "active"}`}>
      <Box
        className="form-box login"
        sx={{ flexDirection: "column", justifyContent: "center" }}
      >
        <Typography variant="h1" sx={{ fontSize: "36px", fontWeight: "bold" }}>
          Login
        </Typography>
        <TextField
          fullWidth
          sx={{ mt: 4 }}
          label="Username"
          variant="outlined"
          InputProps={{ endAdornment: <PersonIcon /> }}
        />
        <TextField
          fullWidth
          sx={{ mt: 2 }}
          label="Password"
          type="password"
          variant="outlined"
          InputProps={{ endAdornment: <LockIcon /> }}
        />
        <Link sx={{ mt: 2 }} href="#" underline="hover">
          Forgot Password?
        </Link>
        <Button
          sx={{ mt: 2 }}
          fullWidth
          variant="contained"
          color="primary"
          size="large"
        >
          Login
        </Button>
        <Typography variant="body1" my={2}>
          or login with social platforms
        </Typography>
        <Box>
          <IconButton>
            <GoogleIcon />
          </IconButton>
          <IconButton>
            <FacebookIcon />
          </IconButton>
          <IconButton>
            <GitHubIcon />
          </IconButton>
          <IconButton>
            <LinkedInIcon />
          </IconButton>
        </Box>
      </Box>
      <Box
        className="form-box register"
        sx={{ flexDirection: "column", justifyContent: "center" }}
      >
        <Typography variant="h1" sx={{ fontSize: "36px", fontWeight: "bold" }}>
          Registration
        </Typography>
        <TextField
          fullWidth
          sx={{ mt: 4 }}
          label="Username"
          variant="outlined"
          InputProps={{ endAdornment: <PersonIcon /> }}
        />
        <TextField
          fullWidth
          sx={{ mt: 2 }}
          label="Email"
          variant="outlined"
          InputProps={{ endAdornment: <PersonIcon /> }}
        />
        <TextField
          fullWidth
          sx={{ mt: 2 }}
          label="Password"
          type="password"
          variant="outlined"
          InputProps={{ endAdornment: <LockIcon /> }}
        />
        <Button
          sx={{ mt: 2 }}
          fullWidth
          variant="contained"
          color="primary"
          size="large"
        >
          Register
        </Button>
        <Typography variant="body1" my={2}>
          or register with social platforms
        </Typography>
        <Box>
          <IconButton>
            <GoogleIcon />
          </IconButton>
          <IconButton>
            <FacebookIcon />
          </IconButton>
          <IconButton>
            <GitHubIcon />
          </IconButton>
          <IconButton>
            <LinkedInIcon />
          </IconButton>
        </Box>
      </Box>
      <Box className="toggle-box">
        <Box className="toggle-panel toggle-left">
          <h1>Hello, Welcome!</h1>
          <p>Don't have an account?</p>
          <Button
            variant="outlined"
            color="white"
            disabled={isRegisterActive}
            onClick={toggleForm}
          >
            Register
          </Button>
        </Box>
        <Box className="toggle-panel toggle-right">
          <h1>Welcome Back!</h1>
          <p>Already have an account?</p>
          <Button
            variant="outlined"
            color="white"
            disabled={!isRegisterActive}
            onClick={toggleForm}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
