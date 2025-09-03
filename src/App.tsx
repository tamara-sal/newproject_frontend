import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Dashboard from "./pages/Dash2";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import CoverPage from "./pages/CoverPage";
import SplashLoader from "./AnimatedLogo";
import FashionPage from "./pages/Main";  // Using FashionPage for /fashion route
import AddCloth from "./pages/AddClothing";
import { Box } from "@mui/material";
import Women from "./pages/Women";
import Men from "./pages/Men";

const theme = createTheme({ /* your theme here */ });

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (!user) return <Navigate to="/login" />;

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login"; // redirect after logout
  };

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} onSidebarToggle={toggleSidebar} />
      <Sidebar open={sidebarOpen} onClose={toggleSidebar} />
      <Box sx={{ minHeight: "calc(100vh - 64px)", pt: "64px" }}>
        {children}
      </Box>
      <Footer />
    </>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <SplashLoader onFinish={() => setLoading(false)} />;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
  {/* Public */}
  <Route path="/" element={<Navigate to="/login" />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/coverpage" element={<CoverPage />} />
  
  {/* Fashion */}
  <Route path="/fashion" element={<FashionPage />} />
  <Route path="/fashion/men" element={<Men />} />
  <Route path="/fashion/women" element={<Women />} />

  {/* Protected */}
  <Route
    path="/dashboard"
    element={
      <AuthLayout>
        <Dashboard />
      </AuthLayout>
    }
  />
  <Route
    path="/profile"
    element={
      <AuthLayout>
        <Profile />
      </AuthLayout>
    }
  />
  <Route
    path="/contact"
    element={
      <AuthLayout>
        <Contact />
      </AuthLayout>
    }
  />
  <Route
    path="/addclothes"
    element={
      <AuthLayout>
        <AddCloth />
      </AuthLayout>
    }
  />

  {/* Catch all */}
  <Route path="*" element={<Navigate to="/dashboard" />} />
</Routes>

      
    </ThemeProvider>
  );
}
