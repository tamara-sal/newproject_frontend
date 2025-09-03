import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Paper, Typography, Container } from "@mui/material";
import Carousel from "../components/Carousel";
import Footer from "../components/Footer";

const categories = ["men", "women"] as const;
type Category = typeof categories[number];

const FashionPage: React.FC = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category: Category) => {
    navigate(`/fashion/${category}`);
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      
      <Box sx={{ flex: "0 0 auto" }}>
        <Carousel />
      </Box>

      
      <Container 
        maxWidth="lg" 
        sx={{ 
          flex: "1 0 auto", 
          py: 6,
          px: { xs: 2, sm: 3 } 
        }}
      >
      
        <Typography 
          variant="h2" 
          fontWeight="bold" 
          textAlign="center" 
          gutterBottom
          sx={{ 
            mb: 6,
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
          }}
        >
          Fashion Categories
        </Typography>

       
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { 
              xs: "1fr", 
              sm: "repeat(2, 1fr)" 
            },
            gap: 4,
            maxWidth: 800,
            mx: "auto",
            userSelect: "none",
          }}
        >
          {categories.map((category) => (
            <Paper
              key={category}
              onClick={() => handleCategoryClick(category)}
              sx={{
                cursor: "pointer",
                p: { xs: 3, sm: 4, md: 5 },
                height: { xs: 120, sm: 160, md: 200 },
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                bgcolor: category === "men" ? "primary.main" : "secondary.main",
                color: "white",
                borderRadius: 3,
                transition: "all 0.3s ease",
                "&:hover": { 
                  transform: "translateY(-4px)",
                  boxShadow: 8,
                },
                "&:active": {
                  transform: "translateY(-2px)",
                },
              }}
              elevation={4}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleCategoryClick(category);
                }
              }}
              aria-label={`Explore ${category} fashion collection`}
            >
              <Typography 
                variant="h4" 
                fontWeight="bold" 
                gutterBottom
                sx={{ 
                  fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' } 
                }}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  display: { xs: 'none', sm: 'block' },
                  fontSize: { sm: '0.9rem', md: '1rem' }
                }}
              >
                Explore the latest {category} fashion collection
              </Typography>
            </Paper>
          ))}
        </Box>
      </Container>

    
      <Box sx={{ flex: "0 0 auto", mt: 'auto' }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default FashionPage;