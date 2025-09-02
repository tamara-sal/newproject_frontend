import React, { useState, useEffect } from "react";
import { updateUser, type User } from "../api";
import {
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";

const Profile: React.FC = () => {
  const storedUser = localStorage.getItem("user");
  const user: User | null = storedUser ? JSON.parse(storedUser) : null;

  const [name, setName] = useState(user?.name || "");
  const [email] = useState(user?.email || "");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({
    open: false,
    message: "",
    severity: "success",
  });

  const handleUpdate = async () => {
    if (!name) {
      setSnackbar({ open: true, message: "Name cannot be empty", severity: "error" });
      return;
    }

    setLoading(true);

    try {
      const res = await updateUser({ name, email });
      localStorage.setItem("user", JSON.stringify(res.data));
      setSnackbar({ open: true, message: "Profile updated successfully!", severity: "success" });
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: "Failed to update profile", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 8, p: 4, border: "1px solid #ddd", borderRadius: 2, boxShadow: 2 }}>
      <Typography variant="h5" sx={{ textAlign: "center", mb: 3 }}>My Profile</Typography>

      <TextField
        fullWidth
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Email"
        value={email}
        disabled
        sx={{ mb: 2, backgroundColor: "#f5f5f5" }}
      />

      <Button
        variant="contained"
        fullWidth
        onClick={handleUpdate}
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Changes"}
      </Button>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Profile;
