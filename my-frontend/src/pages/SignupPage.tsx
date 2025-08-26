import React, { useState } from "react";
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Container,
  Link,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signup } from "../api"; // your API function
import type { SignupRequest } from "../api"; // type-only import
import SchoolIcon from "@mui/icons-material/School";

import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignupPage: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleToggle = () => setShowPassword(!showPassword);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const signupData: SignupRequest = { name, email, password };

    try {
      const response = await signup(signupData);
      console.log("Signup successful:", response);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Signup failed");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        padding: 2,
      }}
    >
      <Container maxWidth="sm">
        <Card sx={{ p: 4, width: "100%", maxWidth: 450, mx: "auto" }}>
          <SchoolIcon
            sx={{ display: "block", mx: "auto", fontSize: 70, mb: 2, color: "#1a0943ff" }}
          />
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            align="center"
            sx={{ mb: 3, color: "primary.main", fontWeight: 600 }}
          >
            Sign Up
          </Typography>
          {error && (
            <Typography color="error" align="center" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          <form onSubmit={handleSignup}>
            <TextField
              fullWidth
              label="Full Name"
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleToggle}>
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 3, mb: 2, py: 1.5 }} size="large">
              Sign Up
            </Button>
            <Box textAlign="center">
              <Link
                component="button"
                type="button"
                onClick={() => navigate("/login")}
                sx={{ mt: 1 }}
              >
                Already have an account? Login
              </Link>
            </Box>
          </form>
        </Card>
      </Container>
    </Box>
  );
};

export default SignupPage;
