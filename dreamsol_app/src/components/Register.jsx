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
  Phone as LocalPhoneIcon,
} from "@mui/icons-material";
import "./Register.css";
import axios from "axios";
import useUserStore from "../zustand/store";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { user, setAccessToken, setIsLoading } = useUserStore();
  const navigate = useNavigate();

  const [isRegisterActive, setIsRegisterActive] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    mobile: "",
    password: "",
  });

  const toggleForm = () => setIsRegisterActive((prev) => !prev);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateMobile = (mobile) => {
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(mobile);
  };

  const validatePassword = (password) => {
    return (
      password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)
    );
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;

    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate inputs on change
    let error = "";
    if (name === "email") {
      error = validateEmail(value) ? "" : "Invalid email";
    } else if (name === "mobile") {
      error = validateMobile(value) ? "" : "Invalid mobile number";
    } else if (name === "password") {
      error = validatePassword(value)
        ? ""
        : "Password must be at least 8 characters long, contain an uppercase letter and a number";
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        { email: loginData.email, password: loginData.password }
      );

      if (data && data.accessToken) {
        // Store the access token in sessionStorage
        sessionStorage.setItem("authToken", data.accessToken);
  
        // setAccessToken(data && data.accessToken);
        setLoginData({ email: "", password: "" });
  
        // Redirect to /invoice after successful login
        navigate("/invoice");
      }

      toast.success("You are successfully logged in", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } catch (error) {
      console.error("Login error:", error);

      const errorMessage = error.response?.data?.message;
      toast.error(errorMessage, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validation checks
      const emailError = validateEmail(formData.email)
        ? ""
        : "Invalid email address";
      const mobileError = validateMobile(formData.mobile)
        ? ""
        : "Invalid mobile number";
      const passwordError = validatePassword(formData.password)
        ? ""
        : "Password must be at least 8 characters long, contain an uppercase letter, and a number";

      // Set errors for UI feedback
      setErrors({
        email: emailError,
        mobile: mobileError,
        password: passwordError,
      });

      // If there are any validation errors, stop execution
      if (emailError || mobileError || passwordError) {
        toast.error(emailError || mobileError || passwordError, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
        return;
      }

      // Proceed with API call if validation passes
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        {
          username: formData.username,
          email: formData.email,
          phone: formData.mobile,
          password: formData.password,
        }
      );

      // Success toast message
      toast.success("You are successfully registered", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });

      // Reset formData and state
      setFormData({ username: "", email: "", mobile: "", password: "" });
      setErrors({});
      setIsRegisterActive(false);
    } catch (error) {
      console.error("Registration error:", error);

      // Error toast message
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container className={`container ${isRegisterActive && "active"}`}>
        <Box
          className="form-box login"
          sx={{ flexDirection: "column", justifyContent: "center" }}
        >
          {/* Login Section */}
          <Typography
            variant="h1"
            sx={{ fontSize: "36px", fontWeight: "bold" }}
          >
            Login
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              sx={{ mt: 4 }}
              label="Email"
              variant="outlined"
              name="email"
              value={loginData.email}
              onChange={handleLoginChange}
              InputProps={{ endAdornment: <PersonIcon /> }}
            />
            <TextField
              fullWidth
              sx={{ mt: 2 }}
              label="Password"
              type="password"
              variant="outlined"
              name="password"
              value={loginData.password}
              onChange={handleLoginChange}
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
              type="submit"
            >
              Login
            </Button>
            <ToastContainer />
          </form>
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
          {/* Signup Section */}
          <Typography
            variant="h1"
            sx={{ fontSize: "36px", fontWeight: "bold" }}
          >
            Registration
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              sx={{ mt: 4 }}
              label="Name"
              variant="outlined"
              name="username"
              value={formData.username}
              onChange={handleChange}
              InputProps={{ endAdornment: <PersonIcon /> }}
            />
            <TextField
              fullWidth
              sx={{ mt: 2 }}
              label="Email"
              variant="outlined"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={
                errors.email && <span id="error-message">{errors.email}</span>
              }
              InputProps={{ endAdornment: <EmailIcon /> }}
            />
            <TextField
              fullWidth
              sx={{ mt: 2 }}
              label="Mobile"
              variant="outlined"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              error={!!errors.mobile}
              helperText={
                errors.mobile && <span id="error-message">{errors.mobile}</span>
              }
              InputProps={{ endAdornment: <LocalPhoneIcon /> }}
            />
            <TextField
              fullWidth
              sx={{ mt: 2 }}
              label="Password"
              type="password"
              variant="outlined"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={
                errors.password && (
                  <span id="error-message">{errors.password}</span>
                )
              }
              InputProps={{ endAdornment: <LockIcon /> }}
            />
            <Button
              sx={{ mt: 2 }}
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              type="submit"
            >
              Register
            </Button>
          </form>
          {/* <Typography variant="body1" my={2}>
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
        </Box> */}
        </Box>
        <Box className="toggle-box">
          <Box className="toggle-panel toggle-left">
            <h1>Hello, Welcome!</h1>
            <h6>Don't have an account?</h6>
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
            <h6>Already have an account?</h6>
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
    </div>
  );
};

export default Register;
