# E-Learning Platform – Phase 1

## About the Project
This is our E-Learning Platform project.  
In Phase 1, our goal is mainly to set up the project on GitHub and organize our work.  
There is no real coding yet — we are only preparing the structure, issues, branches, and documentation.

---

## What We Did in Phase 1

### 1. GitHub Repository
- We created the main repository for the project.
- All three team members were added as collaborators.

### 2. GitHub Issues
- We created several issues to plan the tasks of the project.
- Each issue has a description, labels, and an assigned team member.
- All issues are connected to the project board.

### 3. Project Board
We set up a simple Kanban board with:
- **To Do**
- **In Progress**
- **Done**

We move each issue between the columns based on progress.

### 4. Branches
Each of us created a branch to work on:
- `hodda`
- `eman`
- `ryad`

For every issue, we create a separate branch, work on it, then open a Pull Request to merge it.

### 5. Basic Project Structure
We added a simple folder structure to organize future work:

e-learning-platform/
├── frontend/
├── backend/
├── pages/
└── README.md


There is no real code yet — just empty files and basic templates to prepare for Phase 2.

### 6. Documentation
We wrote this README to explain what we have done in Phase 1 and how the project is organized.

---

## Team Members
- Hodda  
- Eman  
- Ryad  

---

## Summary
Phase 1 is mainly about:
- Setting up the repo  
- Creating issues  
- Organizing the project board  
- Making branches  
- Preparing a clean structure  
- Writing documentation  

We are now ready to start actual development in **Phase 2**.





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


