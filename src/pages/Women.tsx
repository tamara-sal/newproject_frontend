import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert
} from "@mui/material";
import axios from "axios";

interface ClothingItem {
  _id: string;
  name: string;
  imageUrl: string; // can be local path or external URL
  category: "men" | "women";
}

const Women: React.FC = () => {
  const [items, setItems] = useState<ClothingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<ClothingItem | null>(null);
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({ open: false, message: "", severity: "success" });

  const storedUser = localStorage.getItem("user");
  const token = storedUser ? JSON.parse(storedUser).token : "";

  const fetchItems = async () => {
    try {
      const res = await axios.get<ClothingItem[]>("http://localhost:8080/clothes?category=women");
      setItems(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleEditOpen = (item: ClothingItem) => {
    setEditingItem(item);
    setName(item.name);
    setImageUrl(item.imageUrl);
  };

  const handleSave = async () => {
    if (!editingItem) return;
    try {
      await axios.put(
        `http://localhost:8080/clothes/update?id=${editingItem._id}`,
        { name, imageUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSnackbar({ open: true, message: "Item updated!", severity: "success" });
      setEditingItem(null);
      fetchItems();
    } catch {
      setSnackbar({ open: true, message: "Failed to update.", severity: "error" });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8080/clothes/delete?id=${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setSnackbar({ open: true, message: "Item deleted!", severity: "success" });
      fetchItems();
    } catch {
      setSnackbar({ open: true, message: "Failed to delete.", severity: "error" });
    }
  };

  if (loading) return <Typography align="center">Loading...</Typography>;

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 10, px: 2 }}>
      <Typography variant="h3" fontWeight="bold" align="center" gutterBottom>
        Women's Fashion
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, justifyContent: "center" }}>
        {items.map((item) => {
          // Determine correct image URL
          const imgSrc = item.imageUrl.startsWith("http")
            ? item.imageUrl
            : `http://localhost:8080/${item.imageUrl}`;

          return (
            <Paper key={item._id} sx={{ width: 250, p: 2, textAlign: "center", userSelect: "none", borderRadius: 2, boxShadow: 3 }}>
              <img
                src={imgSrc}
                alt={item.name}
                style={{ width: "100%", height: 200, objectFit: "cover", borderRadius: 8, marginBottom: 12, cursor: "pointer" }}
                onClick={() => window.open(imgSrc, "_blank")}
              />
              <Typography variant="h6">{item.name}</Typography>

              {token && (
                <Box sx={{ mt: 1 }}>
                  <Button sx={{ mr: 1 }} variant="contained" color="primary" onClick={() => handleEditOpen(item)}>
                    Edit
                  </Button>
                  <Button variant="outlined" color="error" onClick={() => handleDelete(item._id)}>
                    Delete
                  </Button>
                </Box>
              )}
            </Paper>
          );
        })}
      </Box>

      {/* Edit Dialog */}
      <Dialog open={!!editingItem} onClose={() => setEditingItem(null)}>
        <DialogTitle>Edit Item</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
          <TextField label="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditingItem(null)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default Women;
