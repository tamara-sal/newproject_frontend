// src/pages/Dashboard.tsx
import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button,Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [search, setSearch] = useState("");
  const [showWelcome, setShowWelcome] = useState(true); // control notification
  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    else navigate("/login"); // redirect if not logged in
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };


  return (
    <div>
      <Navbar />
      <Box
        sx={{
          flexGrow: 1,
          pt: "80px",
          px: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* Welcome message */}
        {user && showWelcome && (
          <Paper
            elevation={3}
            sx={{
              width: "100%",
              maxWidth: 600,
              mb: 3,
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#e0f7fa",
            }}
          >
            <Typography>
              Welcome, {user.name}! We're glad to have you here.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowWelcome(false)}
            >
              Thank You
            </Button>
          </Paper>
        )}

        

        {/* Search Box */}
        <Box sx={{ width: "100%", maxWidth: 800, mb: 3 }}>
          <TextField
            fullWidth
            label="Search Notes"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#1976d2",
                  borderWidth: 2,
                },
              },
            }}
          />
        </Box>

        
        
      </Box>
    </div>
  );
};

export default Dashboard;
