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
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getNotes, createNote, updateNote, deleteNote } from "../api";

interface Note {
  _id: string;
  title: string;
  description: string;
  authorEmail: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [search, setSearch] = useState("");
  const [welcomeOpen, setWelcomeOpen] = useState(true);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
    fetchNotes();
  }, [navigate]);

  const fetchNotes = async () => {
    try {
      const res = await getNotes();
      if (Array.isArray(res.data)) setNotes(res.data);
      else setNotes(res.data?.notes || []);
    } catch (err) {
      console.error("Failed to fetch notes:", err);
      setNotes([]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteNote(id);
      fetchNotes();
    } catch (err) {
      console.error("Delete failed:", err);
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
      } else {
        await createNote({ title, description, authorEmail: user.email });
      }
      fetchNotes();
      setDialogOpen(false);
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredNotes = notes.filter((n) =>
    n.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Navbar />

      {/* Welcome Snackbar */}
      {user && (
        <Snackbar
          open={welcomeOpen}
          autoHideDuration={5000}
          onClose={() => setWelcomeOpen(false)}
        >
          <Alert
            onClose={() => setWelcomeOpen(false)}
            severity="info"
            sx={{ width: "100%", backgroundColor: "#6a0dad", color: "#fff" }}
          >
            Hi, {user.name}! Welcome back.
          </Alert>
        </Snackbar>
      )}

      <Box
        sx={{
          flexGrow: 1,
          pt: "80px",
          px: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* Search & Add */}
        <Box
          sx={{
            width: "100%",
            maxWidth: 800,
            mb: 2,
            display: "flex",
            gap: 2,
          }}
        >
          <TextField
            fullWidth
            label="Search Notes"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            variant="contained"
            sx={{ backgroundColor: "#6a0dad", color: "#fff" }}
            onClick={() => handleDialogOpen()}
          >
            Add Note
          </Button>
        </Box>

        {/* Notes List */}
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
              multiline={false}
              InputProps={{ sx: { pt: 1 } }}
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
              InputProps={{ sx: { pt: 1 } }}
            />
          </DialogContent>

          <DialogActions sx={{ justifyContent: "space-between" }}>
            <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#ff7f50", color: "#fff" }}
              onClick={handleSave}
            >
              {editingNote ? "Update" : "Create"}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
};

export default Dashboard;
