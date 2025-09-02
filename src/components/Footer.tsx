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
        <Link href="#" color="inherit"><FaFacebook /></Link>
        <Link href="#" color="inherit"><FaTwitter /></Link>
        <Link href="#" color="inherit"><FaInstagram /></Link>
      </Stack>
    </Stack>
  </Box>
);

export default Footer;
