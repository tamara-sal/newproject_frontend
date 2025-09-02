import React, { useState } from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Contact: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleOpenMaps = () => {
    window.open(
      "https://www.google.com/maps?q=33.89811743237185,35.50717165997794",
      "_blank"
    );
  };

  // Dummy user (replace with your auth state)
  const user = { name: "John Doe", email: "john@example.com" };

  const handleLogout = () => {
    localStorage.removeItem("token"); // clear auth
    window.location.href = "/login";
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
      <Navbar user={user} onLogout={handleLogout} onSidebarToggle={toggleSidebar} />
      <Sidebar open={sidebarOpen} onClose={toggleSidebar} />

      <Box sx={{ flexGrow: 1, padding: "3rem 1rem", maxWidth: "1200px", margin: "0 auto" }}>
        <Typography variant="h4" sx={{ textAlign: "center", mb: 4, fontWeight: "bold", color: "#60116c" }}>
          Contact Us
        </Typography>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.5fr 2fr" }, gap: 4 }}>
          {/* Info Card */}
          <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Typography variant="h5" sx={{ mb: 2, color: "#333" }}>Our Office</Typography>
            <Typography sx={{ mb: 1 }}>
              <strong>Al-Nahar Building</strong>, 7th Floor, Beirut, Lebanon
            </Typography>
            <Typography sx={{ mb: 1 }}>
              📞 <a href="tel:+96171234567" style={{ color: "#60116c", textDecoration: "none" }}>+961 71 234 567</a>
            </Typography>
            <Typography sx={{ mb: 1 }}>
              <strong> website:</strong> <a href="https://www.africell.com" style={{ color: "#60116c", textDecoration: "none" }}>info@africell.com</a>
            </Typography>
            <Typography sx={{ mb: 1 }}>
               <strong> contact us: </strong><a href="https://www.africell.com/contact-press/" target="_blank" rel="noopener noreferrer" style={{ color: "#60116c", textDecoration: "none" }}>
                www.africell.com/contact
              </a>
            </Typography>
            <Button variant="contained" sx={{ mt: 2, backgroundColor: "#60116c" }} onClick={handleOpenMaps}>
              Open in Google Maps
            </Button>
          </Paper>

          {/* Map Placeholder */}
          <Paper sx={{ borderRadius: 3, boxShadow: 3, minHeight: 450, backgroundColor: "#eee" }}>
            
            <iframe
              title="Office Location"
              src="https://www.google.com/maps?q=33.89811743237185, 35.50717165997794&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: "12px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Paper>
        </Box>
      </Box>
    </div>
  );
};

export default Contact;
