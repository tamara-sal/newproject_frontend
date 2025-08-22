// src/components/Navbar.tsx
import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <AppBar position="fixed" sx={{ top:0}} >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={() => navigate("/dashboard")}
        >
          Student Notes
        </Typography>
        <Button color="inherit" onClick={() => navigate("/dashboard")}>
          Dashboard
        </Button>
        <Button color="inherit" onClick={() => navigate("/upload")}>
          Upload
        </Button>
        <Button color="inherit" onClick={() => navigate("/")}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
