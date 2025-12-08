# E-Learning Platform – Phase 1

## Project Abstract

A simple e-learning platform prototype to demonstrate:

- User authentication **UI only** (no real login logic yet)
- Course listing from a backend API (with fallback data in the frontend)
- A basic student dashboard placeholder

This is for our Software Engineering project – **Phase 1** (prototype).

---

## MVP Features (Phase 1)

- Home page
- Login / Signup (UI only, no real auth)
- Dashboard (placeholder)
- Courses section  
  - Reads from backend API: `GET /api/courses`  
  - Uses fallback data if backend is not running
- GitHub Issues + Project Board + Branching workflow

---

## Team

- **hodda** – Frontend (pages, navigation, basic UI)
- **eman** – Backend (Node.js API for courses)
- **ryad** – CSS & Documentation (styling, layout, README)

---

## Tech Stack

### Frontend

- Plain **HTML / CSS / JavaScript**
- No frameworks, no build step
- Lives in the `frontend/` folder

### Backend

- **Node.js**
- **Express.js**
- Port: **4000**  
  (macOS uses port 5000 for AirPlay, so we use 4000 instead.)

---

## How to Run Locally

### 1. Frontend (Hodda & Ryad)

The frontend is a simple static prototype.

Open the file:

```bash
frontend/index.html
You can:
Double-click it in Finder / Explorer to open in the browser, or
In VS Code: right-click index.html → “Open with Live Server” (optional)
This will show:
Home section
Courses section
Dashboard placeholder
Login / Signup forms (UI only)
2. Backend (Eman)
From the project root:
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
No database yet – data is stored directly in server.js.
Frontend calls: http://localhost:4000/api/courses.
If the backend is not running, the frontend uses fallback data (in script.js).
Project Structure
e-learning-platform/
├── backend/
│   ├── server.js        # Express server + courses endpoints
│   └── package.json
├── frontend/
│   ├── index.html       # Static UI (Home, Courses, Dashboard, Auth)
│   ├── style.css        # Styling (Ryad)
│   └── script.js        # Navigation + API call + fallback data
└── README.md
Frontend Behaviour (Phase 1)
Top navbar buttons switch between sections using JS:
Home
Courses
Dashboard
Login
Sign up
The "Get Started" button on the Home section scrolls to / displays the Sign up form.
The Courses section:
Tries to load from GET /api/courses
If the request fails → displays 3 fallback dummy courses.
Branching Strategy
Create a branch for each feature, for example:
hodda/navigation-home
eman/api-courses
ryad/layout-and-css
Use Pull Requests to merge into main.
Every commit message must be clear and descriptive.
Never push features directly to main