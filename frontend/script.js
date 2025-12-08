// script.js

document.addEventListener("DOMContentLoaded", () => {
  // 1) SECTION SWITCHING (navbar + "Get Started" button)

  const sectionButtons = document.querySelectorAll(
    ".nav-btn[data-section], .primary-btn[data-section]"
  );
  const sections = document.querySelectorAll(".section"); // includes auth-section ones

  function showSection(targetId) {
    // remove active from all
    sections.forEach((sec) => sec.classList.remove("active"));

    // add active to the target section
    const target = document.getElementById(targetId);
    if (target) {
      target.classList.add("active");
    }
  }

  sectionButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.dataset.section;
      if (targetId) {
        showSection(targetId);
      }
    });
  });

  // 2) COURSES: load from backend if available, otherwise fallback

  const coursesContainer = document.getElementById("courses-list");

  // some dummy courses in case backend is not running
  const fallbackCourses = [
    {
      id: 1,
      title: "Intro to Programming",
      level: "Beginner",
      description: "Basic concepts of programming and problem solving."
    },
    {
      id: 2,
      title: "Web Development 101",
      level: "Beginner",
      description: "HTML, CSS and a bit of JavaScript to build simple pages."
    },
    {
      id: 3,
      title: "Data Structures",
      level: "Intermediate",
      description: "Lists, stacks, queues, trees and how to think in algorithms."
    }
  ];

  function renderCourses(courses) {
    if (!coursesContainer) return;

    if (!courses || courses.length === 0) {
      coursesContainer.innerHTML = "<p>No courses to show.</p>";
      return;
    }

    coursesContainer.innerHTML = "";

    courses.forEach((course) => {
      const card = document.createElement("article");
      card.className = "card";

      card.innerHTML = `
        <h3>${course.title || "Untitled course"}</h3>
        <p><strong>Level:</strong> ${course.level || "N/A"}</p>
        ${
          course.description
            ? `<p>${course.description}</p>`
            : `<p class="hint">No description provided.</p>`
        }
      `;

      coursesContainer.appendChild(card);
    });
  }

  async function loadCourses() {
    if (!coursesContainer) return;

    // loading state
    coursesContainer.innerHTML = "<p>Loading courses...</p>";

    try {
      // ⚠️ Change this URL to match your backend route if different.
      const response = await fetch("http://localhost:4000/courses");

      if (!response.ok) {
        throw new Error("Backend returned error " + response.status);
      }

      const data = await response.json();
      // Expecting array of { id, title, level, description }
      renderCourses(data);
    } catch (error) {
      console.warn("Could not load courses from backend, using fallback.", error);
      renderCourses(fallbackCourses);
    }
  }

  loadCourses();
});
