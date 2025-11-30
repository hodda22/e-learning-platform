// FRONTEND LOGIC 

// Handle navigation between sections
const navButtons = document.querySelectorAll(".nav-btn, .primary-btn[data-section]");
const sections = document.querySelectorAll(".section");

function showSection(id) {
  sections.forEach((sec) => {
    if (sec.id === id) {
      sec.classList.add("active");
    } else {
      sec.classList.remove("active");
    }
  });
}

// Attach click handlers
navButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-section");
    if (target) {
      showSection(target);
    }
  });
});

// Default: show home
showSection("home");

// COURSES: try to load from backend, fallback to static
const fallbackCourses = [
  { id: 1, title: "Intro to Programming", level: "Beginner" },
  { id: 2, title: "Web Development with HTML & CSS", level: "Beginner" },
  { id: 3, title: "JavaScript for Frontend", level: "Intermediate" },
];

function renderCourses(courses) {
  const container = document.getElementById("courses-list");
  container.innerHTML = "";

  courses.forEach((course) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${course.title}</h3>
      <p>Level: ${course.level ?? "N/A"}</p>
      <p>Course ID: ${course.id}</p>
    `;
    container.appendChild(card);
  });
}

// Try to fetch from backend (port 4000)
function loadCourses() {
  fetch("http://localhost:4000/api/courses")
    .then((res) => {
      if (!res.ok) throw new Error("Backend not available");
      return res.json();
    })
    .then((data) => {
      renderCourses(data);
    })
    .catch(() => {
      // If backend is not running, fallback to local data
      renderCourses(fallbackCourses);
    });
}

document.addEventListener("DOMContentLoaded", loadCourses);
