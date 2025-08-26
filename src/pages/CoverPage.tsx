import React from "react";
import {
  Box,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const CoverPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "100vw",
        background: "linear-gradient(135deg, #0e1e5fff 0%, #110328ff 100%)",
        textAlign: "center",
        color: "white",
        padding: 0,
        margin: 0,
        overflow: "hidden",
      }}
    >
      {/* Main Glass Card */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 1000,
          py: 8,
          px: 4,
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "24px",
          boxShadow: "0 15px 35px rgba(0, 0, 0, 0.25)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Logo / Icon */}
        <SchoolIcon sx={{ fontSize: 70, mb: 2, color: "#fff" }} />

        {/* Title */}
        <Typography
          variant={isMobile ? "h3" : "h2"}
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            background: "linear-gradient(45deg, #fff, #f0f0f0)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            mb: 2,
          }}
        >
          UniNotes
        </Typography>

        {/* Subtitle */}
        <Typography
          variant={isMobile ? "h6" : "h5"}
          component="p"
          sx={{
            mb: 5,
            opacity: 0.9,
            maxWidth: 700,
            mx: "auto",
            lineHeight: 1.6,
            px: 2,
          }}
        >
          A community where students <b>share notes</b>, <b>learn faster</b>, and
          <b> grow together</b>.  
          As they say, "Sharing is caring."
        </Typography>

        {/* Action Buttons */}
        <Box
          sx={{
            display: "flex",
            gap: 3,
            justifyContent: "center",
            flexWrap: "wrap",
            mb: 4,
            width: "100%",
          }}
        >
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/login")}
            startIcon={<MenuBookIcon />}
            sx={{
              minWidth: 180,
              padding: "14px 40px",
              fontSize: "1.1rem",
              fontWeight: 600,
              background: "linear-gradient(45deg, #342e9dff, #94c2c8ff)",
              boxShadow: "0 4px 20px rgba(34, 6, 87, 0.3)",
              "&:hover": {
                boxShadow: "0 8px 25px rgba(5, 9, 84, 0.4)",
                transform: "translateY(-2px)",
              },
              transition: "all 0.3s ease",
            }}
          >
            LogIn
          </Button>

          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate("/signup")}
            startIcon={<CloudUploadIcon />}
            sx={{
              minWidth: 180,
              padding: "14px 40px",
              fontSize: "1.1rem",
              fontWeight: 600,
              color: "white",
              border: "2px solid rgba(255, 255, 255, 0.3)",
              "&:hover": {
                background: "rgba(53, 13, 85, 0.1)",
                border: "2px solid rgba(255, 255, 255, 1)",
                transform: "translateY(-2px)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Sign Up
          </Button>
        </Box>

        {/* Decorative Images Placeholder */}
        <Box
          sx={{
            mt: 6,
            display: "flex",
            gap: 3,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          
          
        </Box>
      </Box>
    </Box>
  );
};

export default CoverPage;



