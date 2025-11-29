# e-learning-platform
# E-Learning Platform - Phase 1

## Project Abstract
A simple e-learning platform prototype to demonstrate user authentication, course listing, and a basic dashboard.

## MVP Features (Phase 1)
- Home page
- Login / Signup (UI only)
- Dashboard (placeholder)
- Course page (static)
- GitHub Issues + Project Board + Branching workflow

## Team
- hodda – Frontend
- teammate – Backend / UI / Documentation

## How to run locally
1. git clone <repo-url>
2. cd e-learning-platform
3. npm install
4. npm start

## Branching Strategy
- Create a branch for each feature: feature/<name>
- Use Pull Requests to merge into main
- Every commit must be clear and descriptive



## Backend (Eman)

### Tech Stack
- Node.js
- Express.js
- Port: 4000 (macOS uses port 5000 for AirPlay, so backend uses 4000)

### How to run the backend

```bash
cd backend
npm install
npm run dev
```

The server will start on:

- http://localhost:4000

### API Endpoints (Phase 1)

| Method | Endpoint              | Description                 |
|--------|------------------------|-----------------------------|
| GET    | `/api/courses`        | Returns all courses         |
| GET    | `/api/courses/:id`    | Returns one course by ID    |

### Example Response (GET /api/courses)

```json
[
  { "id": 1, "title": "Intro to Programming", "level": "Beginner" },
  { "id": 2, "title": "Web Development with HTML & CSS", "level": "Beginner" },
  { "id": 3, "title": "JavaScript for Frontend", "level": "Intermediate" }
]
```

### Notes
- No database yet (data stored directly in server.js)
- Enough for Phase 1 backend demo


