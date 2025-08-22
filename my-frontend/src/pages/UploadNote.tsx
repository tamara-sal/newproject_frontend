// src/pages/UploadNote.tsx
import React, { useState } from "react";
import {
  Card,
  Typography,
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

// Define faculties, majors, and courses
const faculties = {
  Engineering: ["General", "Mechanical", "Computer", "Civil"],
  Business: ["Finance", "Marketing", "Management"],
  Arts: ["History", "Literature", "Philosophy"],
} as const;

const courses: Record<string, string[]> = {
  General: ["Calculus", "Physics", "Programming"],
  Mechanical: ["Mechanics", "Thermodynamics"],
  Computer: ["Programming", "Data Structures"],
  Civil: ["Statics", "Concrete Design"],
  Finance: ["Accounting", "Investment"],
  Marketing: ["Market Research", "Advertising"],
  Management: ["Project Management", "HR"],
  History: ["Ancient History", "Modern History"],
  Literature: ["Poetry", "Novels"],
  Philosophy: ["Ethics", "Logic"],
};

type FacultyType = keyof typeof faculties;

export default function UploadNote() {
  const navigate = useNavigate();

  const [selectedFaculty, setSelectedFaculty] = useState<FacultyType>("Engineering");
  const [selectedMajor, setSelectedMajor] = useState(faculties[selectedFaculty][0]);
  const [selectedCourse, setSelectedCourse] = useState(courses[selectedMajor][0]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert("Please upload a PDF file!");
      return;
    }

    // For now, we just save locally (no backend)
    const newNote = {
      id: Date.now().toString(),
      title,
      description,
      faculty: selectedFaculty,
      major: selectedMajor,
      course: selectedCourse,
      fileUrl: URL.createObjectURL(file),
    };

    const existingNotes = JSON.parse(localStorage.getItem("notes") || "[]");
    localStorage.setItem("notes", JSON.stringify([...existingNotes, newNote]));

    alert("Note uploaded successfully!");
    navigate("/dashboard");
  };

  return (
    <div>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "50px",
          width: "100vw",
        }}
      >
        <Card
          sx={{
            padding: "20px",
            width: "400px",
            maxWidth: "90vw",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Upload a New Note
          </Typography>

          <form onSubmit={handleUpload}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Faculty</InputLabel>
              <Select
                value={selectedFaculty}
                label="Faculty"
                onChange={(e) => {
                  const faculty = e.target.value as FacultyType;
                  setSelectedFaculty(faculty);
                  setSelectedMajor(faculties[faculty][0]);
                  setSelectedCourse(courses[faculties[faculty][0]][0]);
                }}
              >
                {Object.keys(faculties).map((faculty) => (
                  <MenuItem key={faculty} value={faculty}>
                    {faculty}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Major</InputLabel>
              <Select
                value={selectedMajor}
                label="Major"
                onChange={(e) => {
                  const major = e.target.value;
                  setSelectedMajor(major);
                  setSelectedCourse(courses[major][0]);
                }}
              >
                {faculties[selectedFaculty].map((major) => (
                  <MenuItem key={major} value={major}>
                    {major}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Course</InputLabel>
              <Select
                value={selectedCourse}
                label="Course"
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                {courses[selectedMajor].map((course) => (
                  <MenuItem key={course} value={course}>
                    {course}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Title"
              margin="normal"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              fullWidth
              label="Description"
              margin="normal"
              multiline
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button variant="outlined" component="label" fullWidth sx={{ mt: 2 }}>
              Upload PDF
              <input
                type="file"
                hidden
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </Button>
            {file && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Selected: {file.name}
              </Typography>
            )}
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
              Submit
            </Button>
          </form>
        </Card>
      </Box>
    </div>
  );
}
