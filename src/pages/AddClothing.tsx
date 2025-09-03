import React, { useState } from "react";
import { Box, Button, TextField, Typography, MenuItem, Snackbar, Alert } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface ClothingItem {
  _id: string;
  name: string;
  imageUrl: string;
  category: "men" | "women";
}

const AddCloth: React.FC = () => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState<"men" | "women">("men");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const token = storedUser ? JSON.parse(storedUser).token : "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !imageUrl || !category) {
      setError("Please fill all fields.");
      setSnackbarOpen(true);
      return;
    }

    try {
      const newItem: Omit<ClothingItem, "_id"> = { name, imageUrl, category };
      await axios.post("http://localhost:8080/clothes/add", newItem, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSuccess("Cloth added successfully!");
      setSnackbarOpen(true);

      // Reset form
      setName("");
      setImageUrl("");
      setCategory("men");

      // Navigate to respective category page
      navigate(`/fashion/${category}`);
    } catch (err) {
      console.error(err);
      setError("Failed to add cloth. Try again.");
      setSnackbarOpen(true);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 500,
        mx: "auto",
        mt: 10,
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="h4" mb={3} textAlign="center">
        Add New Cloth
      </Typography>

      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
        required
      />

      <TextField
        label="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        fullWidth
        margin="normal"
        required
      />

      <TextField
        select
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value as "men" | "women")}
        fullWidth
        margin="normal"
        required
      >
        <MenuItem value="men">Men</MenuItem>
        <MenuItem value="women">Women</MenuItem>
      </TextField>

      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
        Add Cloth
      </Button>

      <Snackbar
  open={snackbarOpen}
  autoHideDuration={4000}
  onClose={() => setSnackbarOpen(false)}
>
  <Alert
    severity={success ? "success" : "error"}
    onClose={() => setSnackbarOpen(false)}
    sx={{ width: "100%" }}
  >
    {success || error}
  </Alert>
</Snackbar>
    </Box>
  );
};

export default AddCloth;
