import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Collapse,
  Snackbar,
  Alert,
} from "@mui/material";
import { getNotes, createNote, updateNote, deleteNote } from "../api";

interface Note {
  _id: string;
  title: string;
  description: string;
  authorEmail: string;
}

interface DashboardProps {
  onSidebarToggle?: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onSidebarToggle }) => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await getNotes();
      if (Array.isArray(res.data)) setNotes(res.data);
      else setNotes(res.data);
    } catch {
      setSnackbar({ open: true, message: "Failed to fetch notes", severity: "error" });
    }
  };

  const handleDialogOpen = (note?: Note) => {
    if (note) {
      setEditingNote(note);
      setTitle(note.title);
      setDescription(note.description);
    } else {
      setEditingNote(null);
      setTitle("");
      setDescription("");
    }
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!user) return;
    try {
      if (editingNote && editingNote._id) {
        await updateNote(editingNote._id, { title, description });
        setSnackbar({ open: true, message: "Note updated", severity: "success" });
      } else {
        await createNote({ title, description, authorEmail: user.email });
        setSnackbar({ open: true, message: "Note created", severity: "success" });
      }
      setDialogOpen(false);
      fetchNotes();
    } catch {
      setSnackbar({ open: true, message: "Save failed", severity: "error" });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteNote(id);
      fetchNotes();
      setSnackbar({ open: true, message: "Note deleted", severity: "success" });
    } catch {
      setSnackbar({ open: true, message: "Delete failed", severity: "error" });
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredNotes = notes.filter((n) => n.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <Box sx={{ flexGrow: 1, pt: "80px", px: 3, display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
      <Box sx={{ width: "100%", maxWidth: 800, mb: 2, display: "flex", gap: 2 }}>
        <TextField
  fullWidth
  label="Search Notes"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  sx={{
    "& label": { color: "#60116c" }, // label color
    "& label.Mui-focused": { color: "#9c27b0" }, // focused label color
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "#60116c" }, // border color
      "&:hover fieldset": { borderColor: "#9c27b0" }, // hover border
      "&.Mui-focused fieldset": { borderColor: "#60116c" }, // focused border
      "& input": { color: "#60116c" }, // input text color
    },
  }}
/>
        <Button variant="contained" sx={{ backgroundColor: "#6a0dad", color: "#fff" }} onClick={() => handleDialogOpen()}>
          Add Note
        </Button>
      </Box>

      <Box sx={{ width: "100%", maxWidth: 800 }}>
        {filteredNotes.map((note) => (
          <Paper
            key={note._id}
            sx={{
              mb: 2,
              p: 2,
              cursor: "pointer",
              backgroundColor: expandedId === note._id ? "#f3e5f5" : "#fff",
              borderLeft: "5px solid #6a0dad",
              borderRadius: 2,
              boxShadow: 2,
              transition: "0.3s",
              "&:hover": { boxShadow: 6, backgroundColor: "#e1bee7" },
            }}
            onClick={() => toggleExpand(note._id)}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, color: "#6a0dad" }}>
              {note.title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              By: {note.authorEmail}
            </Typography>

            <Collapse in={expandedId === note._id}>
              <Typography variant="body1" sx={{ mt: 1, whiteSpace: "pre-wrap" }}>
                {note.description || "No description added yet."}
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Button
                  sx={{ mr: 1, backgroundColor: "#6a0dad", color: "#fff" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDialogOpen(note);
                  }}
                >
                  Edit
                </Button>
                <Button
                  color="error"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(note._id);
                  }}
                >
                  Delete
                </Button>
              </Box>
            </Collapse>
          </Paper>
        ))}
        {filteredNotes.length === 0 && <Typography>No notes found.</Typography>}
      </Box>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ textAlign: "center", color: "#6a0dad" }}>
          {editingNote ? "Edit Note" : "Create Note"}
        </DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          <TextField
            label="Title"
            placeholder="Enter note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            variant="outlined"
            margin="dense"
            sx={{
              "& label": { color: "#60116c" },
              "& label.Mui-focused": { color: "#9c27b0" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#60116c" },
                "&:hover fieldset": { borderColor: "#9c27b0" },
                "&.Mui-focused fieldset": { borderColor: "#60116c" },
                "& input::placeholder": { color: "#9c27b0", opacity: 1 },
              },
            }}
          />
          <TextField
            label="Description"
            placeholder="Write your note here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={5}
            fullWidth
            variant="outlined"
            sx={{
              "& label": { color: "#60116c" },
              "& label.Mui-focused": { color: "#9c27b0" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#60116c" },
                "&:hover fieldset": { borderColor: "#9c27b0" },
                "&.Mui-focused fieldset": { borderColor: "#60116c" },
                "& input::placeholder": { color: "#9c27b0", opacity: 1 },
              },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: "space-between" }}>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" sx={{ backgroundColor: "#60116cff", color: "#fff" }} onClick={handleSave}>
            {editingNote ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Dashboard;