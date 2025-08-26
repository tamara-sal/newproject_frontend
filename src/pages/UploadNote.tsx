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


// Faculties and majors
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

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("faculty", selectedFaculty);
    formData.append("major", selectedMajor);
    formData.append("course", selectedCourse);

    
  };

  return (
    <div>
      <Navbar />
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: "50px", width: "100vw" }}>
        <Card sx={{ padding: "20px", width: "400px", maxWidth: "90vw" }}>
          <Typography variant="h5" gutterBottom>
            Upload a New Note
          </Typography>
          <form onSubmit={handleUpload}>
            {/* Faculty */}
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

            {/* Major */}
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

            {/* Course */}
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

            {/* Title */}
            <TextField
              fullWidth
              label="Title"
              margin="normal"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            {/* Description */}
            <TextField
              fullWidth
              label="Description"
              margin="normal"
              multiline
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            {/* File Upload */}
            <Button variant="outlined" component="label" fullWidth sx={{ mt: 2 }}>
              Upload File
              <input
                type="file"
                hidden
                accept=".pdf,.doc,.docx,.xls,.xlsx,image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </Button>
            {file && <Typography variant="body2" sx={{ mt: 1 }}>Selected: {file.name}</Typography>}

            {/* Submit */}
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
              Submit
            </Button>
          </form>
        </Card>
      </Box>
    </div>
  );
}
