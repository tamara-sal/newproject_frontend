import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
  Paper,
} from "@mui/material";
import axios from "axios";

interface Cloth {
  _id: string;
  name: string;
  imageUrl: string;
  category: string;
}

const ClothesList: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [clothes, setClothes] = useState<Cloth[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  if (!category) return;

  const fetchClothes = async () => {
    setLoading(true);
    try {
      const res = await axios.get<Cloth[]>(`http://localhost:8080/clothes?category=${category}`);
      setClothes(res.data);
    } catch {
      setClothes([]);
    } 
    setLoading(false);
  };

  fetchClothes();
}, [category]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", mt: 10, px: 2 }}>
      <Typography variant="h3" gutterBottom textAlign="center" textTransform="capitalize" fontWeight="bold">
        {category} Fashion
      </Typography>

      {clothes.length === 0 ? (
        <Typography variant="h6" textAlign="center" mt={4}>
          No clothes found for {category}.
        </Typography>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            justifyContent: "center",
          }}
        >
          {clothes.map(({ _id, name, imageUrl }) => (
            <Paper
              key={_id}
              sx={{
                width: 250,
                p: 2,
                textAlign: "center",
                cursor: "default",
                userSelect: "none",
                borderRadius: 2,
                boxShadow: 3,
              }}
              elevation={3}
            >
              <CardMedia
                component="img"
                height="200"
                image={imageUrl}
                alt={name}
                sx={{ borderRadius: 1, objectFit: "cover" }}
              />
              <CardContent>
                <Typography variant="h6">{name}</Typography>
              </CardContent>
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ClothesList;
