# e-learning-platform
# E-Learning Platform - Phase 1

## Project Abstract
A simple e-learning platform prototype to demonstrate user authentication (UI only), course listing, and a basic student dashboard placeholder.

## MVP Features (Phase 1)
- Home page
- Login / Signup (UI only, no real auth)
- Dashboard (placeholder)
- Courses section (reads from backend API or fallback data)
- GitHub Issues + Project Board + Branching workflow

## Team
- hodda – Frontend (pages, navigation, basic UI)
- eman – Backend (Node.js API for courses)
- ryad – CSS & Documentation (styling, layout, README)

---

## How to run locally

### Frontend (Hodda & Ryad)

The frontend is a simple static prototype.

- Open the file:

```bash
frontend/index.html
You can:
Double-click it in Finder to open in the browser, or
In VS Code: right-click index.html → “Open with Live Server” (optional).
This will show:
Home section
Courses section
Dashboard placeholder
Login / Signup forms (UI only)
Backend (Eman)
Tech Stack
Node.js
Express.js
Port: 4000 (macOS uses port 5000 for AirPlay, so backend uses 4000)
How to run the backend
cd backend
npm install
npm run dev
The server will start on:
http://localhost:4000
API Endpoints (Phase 1)
Method	Endpoint	Description
GET	/api/courses	Returns all courses
GET	/api/courses/:id	Returns one course by ID
Example Response (GET /api/courses)
[
  { "id": 1, "title": "Intro to Programming", "level": "Beginner" },
  { "id": 2, "title": "Web Development with HTML & CSS", "level": "Beginner" },
  { "id": 3, "title": "JavaScript for Frontend", "level": "Intermediate" }
]
Notes
No database yet (data stored directly in server.js).
Frontend calls http://localhost:4000/api/courses.
If backend is not running, frontend uses fallback data.
Branching Strategy
Create a branch for each feature: feature/<name> (or hodda/..., eman/..., ryad/...)
Use Pull Requests to merge into main
Every commit message must be clear and descriptive
Never push features directly to main