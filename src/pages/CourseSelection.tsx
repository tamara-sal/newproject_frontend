// src/pages/CourseSelection.tsx
import React, { useState } from "react";
import { Box, Typography, Button, MenuItem, TextField, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

// Example data
const faculties: Record<string, string[]> = {
  Engineering: ["General", "Mechanical", "Computer"],
  Business: ["Accounting", "Finance", "Marketing"],
  Arts: ["History", "Literature", "Music"],
};

const courses: Record<string, string[]> = {
  General: ["Calculus", "Physics", "Chemistry"],
  Mechanical: ["Mechanics", "Thermodynamics", "Fluid Mechanics"],
  Computer: ["Programming", "Data Structures", "Algorithms"],
  Accounting: ["Financial Accounting", "Management Accounting"],
  Finance: ["Corporate Finance", "Investments"],
  Marketing: ["Digital Marketing", "Market Research"],
  History: ["World History", "Ancient Civilizations"],
  Literature: ["English Literature", "Comparative Literature"],
  Music: ["Music Theory", "Composition"],
};

export default function SelectCourse() {
  const navigate = useNavigate();
  const [faculty, setFaculty] = useState("");
  const [major, setMajor] = useState("");
  const [course, setCourse] = useState("");

  const handleNext = () => {
    if (!faculty || !major || !course) {
      alert("Please select all fields");
      return;
    }
  
    navigate(`/upload/${faculty}/${major}`);
  };

  return (
    <div>
      <Navbar />
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <Card sx={{ p: 4, minWidth: 300, maxWidth: 400 }}>
          <Typography variant="h5" gutterBottom>
            Select Course
          </Typography>

          {/* Faculty selection */}
          <TextField
            select
            label="Faculty"
            value={faculty}
            onChange={(e) => {
              setFaculty(e.target.value);
              setMajor(""); // reset major when faculty changes
              setCourse(""); // reset course
            }}
            fullWidth
            margin="normal"
          >
            {Object.keys(faculties).map((f) => (
              <MenuItem key={f} value={f}>
                {f}
              </MenuItem>
            ))}
          </TextField>

          {/* Major selection */}
          {faculty && (
            <TextField
              select
              label="Major"
              value={major}
              onChange={(e) => {
                setMajor(e.target.value);
                setCourse(""); // reset course
              }}
              fullWidth
              margin="normal"
            >
              {faculties[faculty].map((m) => (
                <MenuItem key={m} value={m}>
                  {m}
                </MenuItem>
              ))}
            </TextField>
          )}

          {/* Course selection */}
          {major && (
            <TextField
              select
              label="Course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              fullWidth
              margin="normal"
            >
              {courses[major].map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </TextField>
          )}

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
            onClick={handleNext}
          >
            Next
          </Button>
        </Card>
      </Box>
    </div>
  );
}
