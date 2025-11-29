// backend/server.js

const express = require('express');
const app = express();
const PORT = 4000; // we use 4000 to avoid mac AirPlay on 5000

app.use(express.json());

const courses = [
  { id: 1, title: "Intro to Programming", level: "Beginner" },
  { id: 2, title: "Web Development with HTML & CSS", level: "Beginner" },
  { id: 3, title: "JavaScript for Frontend", level: "Intermediate" }
];

// Health check
app.get('/', (req, res) => {
  res.send('Hello from Eman backend ✅');
});

// ✅ List all courses
app.get('/api/courses', (req, res) => {
  return res.json(courses);
});

// ✅ Get single course by ID
app.get('/api/courses/:id', (req, res) => {
  const courseId = parseInt(req.params.id, 10);
  const course = courses.find((c) => c.id === courseId);

  if (!course) {
    return res.status(404).json({ message: 'Course not found' });
  }

  return res.json(course);
});

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
