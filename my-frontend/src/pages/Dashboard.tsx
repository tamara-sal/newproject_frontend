import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Button, Box, TextField } from "@mui/material";
import Navbar from "../components/Navbar";

interface Note {
  id: number;
  title: string;
  description: string;
  faculty: string;
  major: string;
  course: string;
  fileUrl: string;
}

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);

  // Load notes from localStorage
  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes") || "[]");
    setNotes(storedNotes);
  }, []);

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.description.toLowerCase().includes(search.toLowerCase()) ||
      note.faculty.toLowerCase().includes(search.toLowerCase()) ||
      note.major.toLowerCase().includes(search.toLowerCase()) ||
      note.course.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      
     <Box
    sx={{
      flexGrow: 1,           // fill remaining height
      pt: "80px",            // push content below navbar
      px: 3,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",  // horizontal centering
      width: "100%",
    }}
  >
    {/* Search Box */}
    <Box sx={{ width: "100%", maxWidth: 800, mb: 3 }}>
    <TextField
        
            fullWidth
            label="Search Notes"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#1976d2", // border highlight on focus
                  borderWidth: 2,
                },
              },
            }}
          />
        </Box>

        {/* Notes grid */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            justifyContent: "flex-start",
            width: "100%",
            maxWidth: 1200,
          }}
        >
          {filteredNotes.map((note) => (
            <Card
              key={note.id}
              sx={{
                flex: "1 1 300px",
                maxWidth: 350,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {note.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {note.description}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {note.faculty} | {note.major} | {note.course}
                </Typography>
              </CardContent>
              <Box sx={{ p: 2, pt: 0 }}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => window.open(note.fileUrl, "_blank")}
                >
                  Download
                </Button>
              </Box>
            </Card>
          ))}
        </Box>
      </Box>
    </div>
  );
}
