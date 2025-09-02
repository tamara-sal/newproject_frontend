import React from "react";
import { Box, Typography, Link, Stack } from "@mui/material";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer: React.FC = () => (
  <Box sx={{ backgroundColor: "#6a0dad", color: "#fff", py: 4, mt: "auto" }}>
    <Stack spacing={1} alignItems="center">
      <Typography variant="h6">Vision . Innovation . Continuity</Typography>
      <Typography variant="body2">Unity for Continuity</Typography>
      <Typography variant="body2">All rights Reserved Africell - 2025</Typography>
      <Stack direction="row" spacing={2} mt={1}>
        <Link href="https://www.facebook.com/AfricellSierraLeone" color="inherit" target="_blank" rel="noopener noreferrer">  <FaFacebook size ={24} /></Link>
        <Link href="https://x.com/africellgroup?lang=en" color="inherit" target="_blank" rel="noopener noreferrer">  
        <FaTwitter size={24} /></Link>
        <Link href="https://www.instagram.com/africellgroup/?hl=en" color="inherit"target="_blank" rel="noopener noreferrer"><FaInstagram size={24} /></Link>
      </Stack>
    </Stack>
  </Box>
);

export default Footer;
