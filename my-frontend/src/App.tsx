import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import CoverPage from "./pages/CoverPage";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import UploadNote from "./pages/UploadNote";
import SelectCourse from "./pages/CourseSelection";

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: { main: "#0a0243ff", light: "#092fa15f", dark: "#09023fff" },
    secondary: { main: "#081b61ff", light: "#12096eff", dark: "#060235ff" },
    background: { default: "#f5f5f5" },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h2: { fontWeight: 700 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 500 },
    h6: { fontWeight: 500 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: { styleOverrides: { root: { textTransform: "none", fontWeight: 600, borderRadius: 8 } } },
    MuiCard: { styleOverrides: { root: { borderRadius: 12, boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)" } } },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/CoverPage" element={<CoverPage/>}/>

          {/* Select faculty/course */}
          <Route path="/upload/select" element={<SelectCourse />} />

          {/* Upload page receives state from navigation */}
          <Route path="/upload" element={<UploadNote />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
