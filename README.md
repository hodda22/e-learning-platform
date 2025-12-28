# LearnFlow — E-Learning Platform (Phase 2)

A simple web-based e-learning platform (SPA-style UI) where users can browse courses, enroll, track tasks/progress, and manage personal notes.

## Live Demo (Deployment)
- GitHub Pages: **https://hodda22.github.io/e-learning-platform/**  
  > If this link shows 404, GitHub Pages must be enabled by the repo admin: **Settings → Pages → Source = GitHub Actions**.

---

## Features
### Student
- Sign up / log in / log out (UI + validation)
- Browse courses + view course details
- Enroll in a course (shows under Dashboard)
- View tasks and toggle completion (progress updates)
- Notes / Files: create, edit, save, delete (learning notes)

### Instructor (conceptual / limited)
- Instructor actor exists in docs/diagrams (course management may be limited in current implementation)

### Persistence
- Data is persisted via **localStorage** (client-side), so progress and notes remain after refresh on the same browser/device.

---

## Tech Stack
- Frontend: HTML + CSS + JavaScript
- Backend: Node.js + Express.js (for simple API endpoints if used)
- Storage: local JSON / localStorage (depending on feature)

---

## Project Structure
```txt
e-learning-platform/
├── phase2/                 # Final website build for Phase 2 (deploy this)
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── frontend/               # (optional/older) frontend folder if present
├── backend/                # Node/Express backend (optional runtime)
├── docs/
│   ├── meetings/           # Scrum meeting summaries (md)
│   └── diagrams/           # Exported UML diagrams (png/svg)
└── .github/workflows/      # GitHub Actions (CI + Deploy)
How to Run Locally
Option A — Run the website only (Phase 2 UI)
Open:
phase2/index.html in your browser
(Recommended for demo: this is the folder deployed to GitHub Pages.)
Option B — Run backend (if you want API running)
Prerequisites
Node.js 18+ (recommended 20)
Run
cd backend
npm install
node server.js
Backend should start on:
http://localhost:4000
API Endpoints (if backend is enabled)
GET /api/courses → returns courses list
If your Phase 2 UI uses localStorage only, the backend is optional.
CI/CD (Pipeline)
CI (GitHub Actions)
Workflow: .github/workflows/ci.yml
Runs on every push to main and every pull request
Installs dependencies and runs npm test --if-present and npm run build --if-present
Deployment (GitHub Pages)
Workflow: .github/workflows/deploy-pages.yml
Deploys the phase2/ folder to GitHub Pages (Actions)
Admin requirement
Repo Settings → Pages → Source = GitHub Actions
Documentation (Phase 2 Deliverables)
SRS / Requirements: (add link/file name here if you have it in repo)
UML Diagrams (PNG/SVG): docs/diagrams/
Use-case diagram
Sequence diagrams (Login, Enroll, Toggle task, Create/Edit note)
Class diagram
Component diagram (bonus)
Test Cases: included in SRS or separate doc (add path here)
Scrum Meeting Summaries: docs/meetings/
2025-12-20.md
2025-12-24.md
2025-12-28.md
Project Management (GitHub)
Backlog / Issues: GitHub Issues (with labels: priority + area)
Scrum Board: GitHub Projects board (Backlog → To Do → In Progress → Done)
Pull Requests: All changes should go through PRs (branch → PR → merge)
Team
Eman Mohammed — 222000058
Hodda Emad — 221001807
Ryad Elshemy — 221001488
