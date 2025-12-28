// ==========================================
// LearnFlow E-Learning Platform
// Application Logic
// ==========================================

// ==========================================
// Data Store
// ==========================================
const courses = [
    {
        id: 1,
        title: "Introduction to Web Development",
        description: "Learn the fundamentals of web development including HTML, CSS, and JavaScript. Build your first website from scratch and understand how the web works.",
        level: "Beginner",
        icon: "🌐",
        duration: "8 weeks",
        lessons: 24,
        tasks: [
            { id: 1, text: "Complete HTML basics module", completed: false },
            { id: 2, text: "Build your first webpage", completed: false },
            { id: 3, text: "Learn CSS styling fundamentals", completed: false },
            { id: 4, text: "Create a responsive layout", completed: false },
            { id: 5, text: "Introduction to JavaScript", completed: false },
            { id: 6, text: "Final project: Personal portfolio", completed: false }
        ]
    },
    {
        id: 2,
        title: "Python Programming Masterclass",
        description: "Master Python programming from basics to advanced concepts. Learn data structures, algorithms, and build real-world applications.",
        level: "Intermediate",
        icon: "🐍",
        duration: "10 weeks",
        lessons: 32,
        tasks: [
            { id: 1, text: "Python syntax and variables", completed: false },
            { id: 2, text: "Control flow and functions", completed: false },
            { id: 3, text: "Data structures deep dive", completed: false },
            { id: 4, text: "Object-oriented programming", completed: false },
            { id: 5, text: "File handling and modules", completed: false },
            { id: 6, text: "Build a CLI application", completed: false }
        ]
    },
    {
        id: 3,
        title: "Data Science Fundamentals",
        description: "Explore the world of data science. Learn statistical analysis, data visualization, and machine learning basics with hands-on projects.",
        level: "Intermediate",
        icon: "📊",
        duration: "12 weeks",
        lessons: 40,
        tasks: [
            { id: 1, text: "Introduction to data analysis", completed: false },
            { id: 2, text: "Statistical concepts review", completed: false },
            { id: 3, text: "Data cleaning techniques", completed: false },
            { id: 4, text: "Visualization with matplotlib", completed: false },
            { id: 5, text: "Introduction to pandas", completed: false },
            { id: 6, text: "Machine learning basics", completed: false }
        ]
    },
    {
        id: 4,
        title: "UI/UX Design Principles",
        description: "Create beautiful and user-friendly interfaces. Learn design thinking, wireframing, prototyping, and industry-standard design tools.",
        level: "Beginner",
        icon: "🎨",
        duration: "6 weeks",
        lessons: 18,
        tasks: [
            { id: 1, text: "Design thinking fundamentals", completed: false },
            { id: 2, text: "User research methods", completed: false },
            { id: 3, text: "Wireframing essentials", completed: false },
            { id: 4, text: "Color theory and typography", completed: false },
            { id: 5, text: "Prototyping with Figma", completed: false },
            { id: 6, text: "Design a mobile app interface", completed: false }
        ]
    },
    {
        id: 5,
        title: "Cloud Computing with AWS",
        description: "Master Amazon Web Services from the ground up. Learn cloud architecture, deployment, and management of scalable applications.",
        level: "Advanced",
        icon: "☁️",
        duration: "10 weeks",
        lessons: 28,
        tasks: [
            { id: 1, text: "AWS fundamentals overview", completed: false },
            { id: 2, text: "EC2 and compute services", completed: false },
            { id: 3, text: "S3 and storage solutions", completed: false },
            { id: 4, text: "Networking with VPC", completed: false },
            { id: 5, text: "Database services (RDS, DynamoDB)", completed: false },
            { id: 6, text: "Deploy a full-stack application", completed: false }
        ]
    },
    {
        id: 6,
        title: "React.js Complete Guide",
        description: "Build modern web applications with React. Learn components, hooks, state management, and build production-ready applications.",
        level: "Intermediate",
        icon: "⚛️",
        duration: "8 weeks",
        lessons: 26,
        tasks: [
            { id: 1, text: "React fundamentals and JSX", completed: false },
            { id: 2, text: "Components and props", completed: false },
            { id: 3, text: "State and lifecycle", completed: false },
            { id: 4, text: "Hooks deep dive", completed: false },
            { id: 5, text: "React Router and navigation", completed: false },
            { id: 6, text: "Build a full React application", completed: false }
        ]
    }
];

// Application State
let appState = {
    currentUser: null,
    enrolledCourses: [],
    files: [],
    currentCourseId: null,
    currentFileId: null,
    editingCourseId: null
};

// Users Database (simulates backend storage)
let usersDB = {
    students: [],
    instructors: []
};

// Global Courses Database (shared across all users)
let globalCoursesDB = [];

// Load state from localStorage
function loadState() {
    // Load users database
    const savedUsers = localStorage.getItem('learnflowUsers');
    if (savedUsers) {
        try {
            const parsed = JSON.parse(savedUsers);
            // Ensure proper structure
            usersDB = {
                students: Array.isArray(parsed.students) ? parsed.students : [],
                instructors: Array.isArray(parsed.instructors) ? parsed.instructors : []
            };
        } catch (e) {
            console.error('Error loading users DB:', e);
            usersDB = { students: [], instructors: [] };
        }
    }
    
    // Load global courses database
    const savedGlobalCourses = localStorage.getItem('learnflowGlobalCourses');
    if (savedGlobalCourses) {
        try {
            globalCoursesDB = JSON.parse(savedGlobalCourses);
            if (!Array.isArray(globalCoursesDB)) {
                globalCoursesDB = [];
            }
        } catch (e) {
            console.error('Error loading global courses:', e);
            globalCoursesDB = [];
        }
    }
    
    // Load app state
    const savedState = localStorage.getItem('learnflowState');
    if (savedState) {
        try {
            appState = JSON.parse(savedState);
            if (appState.currentUser && appState.currentUser.email && appState.currentUser.role) {
                // Verify user still exists in database with correct role
                const userExists = verifyUserExists(appState.currentUser.email, appState.currentUser.role);
                if (userExists) {
                    // Reload user data to ensure it's fresh
                    const user = findUserByEmail(appState.currentUser.email);
                    if (user && user.role === appState.currentUser.role) {
                        loadUserData(user);
                        showLoggedInState();
                    } else {
                        // Role mismatch, clear session
                        appState.currentUser = null;
                        saveState();
                    }
                } else {
                    // User no longer exists, clear session
                    appState.currentUser = null;
                    saveState();
                }
            }
        } catch (e) {
            console.error('Error loading app state:', e);
            appState = {
                currentUser: null,
                enrolledCourses: [],
                files: [],
                currentCourseId: null,
                currentFileId: null,
                editingCourseId: null
            };
        }
    }
}

// Clear all data (for debugging/reset)
function clearAllData() {
    if (confirm('This will delete all accounts and data. Are you sure?')) {
        localStorage.removeItem('learnflowUsers');
        localStorage.removeItem('learnflowState');
        localStorage.removeItem('learnflowGlobalCourses');
        // Clear all user data
        for (let key in localStorage) {
            if (key.startsWith('userData_')) {
                localStorage.removeItem(key);
            }
        }
        location.reload();
    }
}

// Save global courses database
function saveGlobalCourses() {
    localStorage.setItem('learnflowGlobalCourses', JSON.stringify(globalCoursesDB));
}

// Save state to localStorage
function saveState() {
    localStorage.setItem('learnflowState', JSON.stringify(appState));
}

// Save users database
function saveUsersDB() {
    localStorage.setItem('learnflowUsers', JSON.stringify(usersDB));
}

// Verify user exists in database
function verifyUserExists(email, role) {
    if (role === 'student') {
        return usersDB.students.some(u => u.email === email);
    } else if (role === 'instructor') {
        return usersDB.instructors.some(u => u.email === email);
    }
    return false;
}

// Find user by email - checks both databases
function findUserByEmail(email) {
    // Normalize email for comparison
    const normalizedEmail = email.toLowerCase().trim();
    
    // Check instructors first
    const instructor = usersDB.instructors.find(u => u.email.toLowerCase() === normalizedEmail);
    if (instructor) {
        return { ...instructor, role: 'instructor' };
    }
    
    // Then check students
    const student = usersDB.students.find(u => u.email.toLowerCase() === normalizedEmail);
    if (student) {
        return { ...student, role: 'student' };
    }
    
    return null;
}

// Simple password hashing (for demo - in production use bcrypt)
function hashPassword(password) {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
        const char = password.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return 'hash_' + Math.abs(hash).toString(16);
}

// Validate password
function validatePassword(inputPassword, storedHash) {
    return hashPassword(inputPassword) === storedHash;
}

// ==========================================
// Navigation
// ==========================================
function showPage(pageName) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === pageName) {
            link.classList.add('active');
        }
    });
    
    // Show requested page
    const pageId = pageName + 'Page';
    const page = document.getElementById(pageId);
    if (page) {
        page.classList.add('active');
    }
    
    // Load page-specific content
    if (pageName === 'courses') {
        renderCourses();
    } else if (pageName === 'dashboard') {
        if (!appState.currentUser) {
            openModal('loginModal');
            return;
        }
        renderDashboard();
    }
}

// ==========================================
// Modal Management
// ==========================================
function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
    document.body.style.overflow = '';
}

function switchAuth(type) {
    if (type === 'signup') {
        closeModal('loginModal');
        openModal('signupModal');
    } else {
        closeModal('signupModal');
        openModal('loginModal');
    }
}

// Close modal on outside click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// ==========================================
// Authentication
// ==========================================
function openSignupForm(role) {
    closeModal('signupModal');
    if (role === 'student') {
        openModal('studentSignupModal');
    } else {
        openModal('instructorSignupModal');
    }
}

function backToRoleSelection() {
    closeModal('studentSignupModal');
    closeModal('instructorSignupModal');
    openModal('signupModal');
}

function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value.trim().toLowerCase();
    const password = document.getElementById('loginPassword').value;
    
    // Clear previous error
    clearAuthError('loginModal');
    
    // Validate inputs
    if (!email || !password) {
        showAuthError('loginModal', 'Please enter both email and password');
        return;
    }
    
    // Find user in database
    const user = findUserByEmail(email);
    
    if (!user) {
        showAuthError('loginModal', 'No account found with this email. Please sign up first.');
        return;
    }
    
    // Validate password
    if (!validatePassword(password, user.passwordHash)) {
        showAuthError('loginModal', 'Incorrect password. Please try again.');
        return;
    }
    
    // Load user-specific data
    loadUserData(user);
    
    // Set current user (without password hash)
    appState.currentUser = {
        email: user.email,
        name: user.name,
        role: user.role,
        expertise: user.expertise,
        bio: user.bio,
        interests: user.interests,
        createdAt: user.createdAt
    };
    
    saveState();
    showLoggedInState();
    closeModal('loginModal');
    
    const roleDisplay = user.role.charAt(0).toUpperCase() + user.role.slice(1);
    showToast(`Welcome back, ${user.name}! Logged in as ${roleDisplay}.`);
    event.target.reset();
}

function handleSignup(event, role) {
    event.preventDefault();
    
    let name, email, password, confirmPassword, extraData = {};
    let modalId = role === 'student' ? 'studentSignupModal' : 'instructorSignupModal';
    
    // Clear previous error
    clearAuthError(modalId);
    
    if (role === 'student') {
        name = document.getElementById('studentName').value.trim();
        email = document.getElementById('studentEmail').value.trim().toLowerCase();
        password = document.getElementById('studentPassword').value;
        confirmPassword = document.getElementById('studentConfirmPassword').value;
        extraData.interests = document.getElementById('studentInterests').value;
    } else {
        name = document.getElementById('instructorName').value.trim();
        email = document.getElementById('instructorEmail').value.trim().toLowerCase();
        password = document.getElementById('instructorPassword').value;
        confirmPassword = document.getElementById('instructorConfirmPassword').value;
        extraData.expertise = document.getElementById('instructorExpertise').value;
        extraData.bio = document.getElementById('instructorBio').value.trim();
    }
    
    // Validation
    if (!name || !email || !password) {
        showAuthError(modalId, 'Please fill in all required fields');
        return;
    }
    
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showAuthError(modalId, 'Please enter a valid email address');
        return;
    }
    
    // Password strength validation
    if (password.length < 6) {
        showAuthError(modalId, 'Password must be at least 6 characters long');
        return;
    }
    
    // Confirm password validation
    if (password !== confirmPassword) {
        showAuthError(modalId, 'Passwords do not match');
        return;
    }
    
    // Check if email already exists in ANY role
    const existingUser = findUserByEmail(email);
    if (existingUser) {
        showAuthError(modalId, `An account with this email already exists as ${existingUser.role}. Please use a different email or login.`);
        return;
    }
    
    // Create new user
    const newUser = {
        id: Date.now(),
        name: name,
        email: email,
        passwordHash: hashPassword(password),
        ...extraData,
        createdAt: new Date().toISOString()
    };
    
    // Add to appropriate database
    if (role === 'student') {
        usersDB.students.push(newUser);
    } else {
        usersDB.instructors.push(newUser);
    }
    saveUsersDB();
    
    // Initialize user-specific data
    const userData = {
        odotId: newUser.id,
        enrolledCourses: [],
        files: [],
        instructorCourses: []
    };
    localStorage.setItem(`userData_${email}`, JSON.stringify(userData));
    
    // Set current user
    appState.currentUser = {
        email: email,
        name: name,
        role: role,
        ...extraData,
        createdAt: newUser.createdAt
    };
    
    // Reset app state for new user
    appState.enrolledCourses = [];
    appState.files = [];
    appState.instructorCourses = [];
    
    saveState();
    showLoggedInState();
    
    closeModal(modalId);
    
    const roleDisplay = role.charAt(0).toUpperCase() + role.slice(1);
    const welcomeMsg = role === 'instructor' 
        ? `Welcome, ${name}! You're now signed in as an Instructor. Start creating your first course.`
        : `Welcome to LearnFlow, ${name}! You're now signed in as a Student.`;
    showToast(welcomeMsg);
    
    event.target.reset();
}

function loadUserData(user) {
    const savedData = localStorage.getItem(`userData_${user.email}`);
    if (savedData) {
        const userData = JSON.parse(savedData);
        appState.enrolledCourses = userData.enrolledCourses || [];
        appState.files = userData.files || [];
    } else {
        appState.enrolledCourses = [];
        appState.files = [];
    }
}

function saveUserData() {
    if (!appState.currentUser) return;
    
    const userData = {
        odotId: appState.currentUser.email,
        enrolledCourses: appState.enrolledCourses,
        files: appState.files
    };
    localStorage.setItem(`userData_${appState.currentUser.email}`, JSON.stringify(userData));
}

// Override saveState to also save user data
const originalSaveState = saveState;
saveState = function() {
    originalSaveState();
    saveUserData();
};

function logout() {
    // Save current user data before logging out
    saveUserData();
    
    appState.currentUser = null;
    appState.enrolledCourses = [];
    appState.files = [];
    saveState();
    showLoggedOutState();
    showPage('home');
    showToast('You have been logged out');
}

function showLoggedInState() {
    document.getElementById('authButtons').style.display = 'none';
    document.getElementById('userMenu').style.display = 'flex';
    document.getElementById('userName').textContent = appState.currentUser.name;
    document.getElementById('dashboardLink').style.display = 'block';
    
    // Set role badge
    const roleBadge = document.getElementById('userRoleBadge');
    roleBadge.textContent = appState.currentUser.role;
    roleBadge.className = 'user-role-badge ' + appState.currentUser.role;
    
    // Update dashboard based on role
    updateDashboardForRole();
}

function showLoggedOutState() {
    document.getElementById('authButtons').style.display = 'flex';
    document.getElementById('userMenu').style.display = 'none';
    document.getElementById('dashboardLink').style.display = 'none';
}

function updateDashboardForRole() {
    const isInstructor = appState.currentUser && appState.currentUser.role === 'instructor';
    
    // Show/hide tabs based on role
    document.getElementById('tabCourses').style.display = isInstructor ? 'none' : 'block';
    document.getElementById('tabManage').style.display = isInstructor ? 'block' : 'none';
    document.getElementById('tabAnalytics').style.display = isInstructor ? 'block' : 'none';
    
    // Update subtitle
    const subtitle = document.getElementById('dashboardSubtitle');
    subtitle.textContent = isInstructor 
        ? 'Create courses, manage content, and track student progress'
        : 'Manage your courses, tasks, and files';
    
    // Set default active tab based on role
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    if (isInstructor) {
        document.getElementById('tabManage').classList.add('active');
        document.getElementById('manageCoursesTab').classList.add('active');
    } else {
        document.getElementById('tabCourses').classList.add('active');
        document.getElementById('myCoursesTab').classList.add('active');
    }
}

// Auth error handling
function showAuthError(modalId, message) {
    const modal = document.getElementById(modalId);
    let errorDiv = modal.querySelector('.auth-error');
    
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'auth-error';
        const form = modal.querySelector('.auth-form');
        form.insertBefore(errorDiv, form.firstChild);
    }
    
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}

function clearAuthError(modalId) {
    const modal = document.getElementById(modalId);
    const errorDiv = modal.querySelector('.auth-error');
    if (errorDiv) {
        errorDiv.style.display = 'none';
    }
}

// ==========================================
// Courses
// ==========================================
function getAllCourses() {
    // Combine default courses with instructor-created courses from global database
    const instructorCourses = globalCoursesDB.map(c => ({
        ...c,
        isInstructorCourse: true
    }));
    return [...courses, ...instructorCourses];
}

// Get courses created by current instructor
function getInstructorOwnCourses() {
    if (!appState.currentUser || appState.currentUser.role !== 'instructor') {
        return [];
    }
    return globalCoursesDB.filter(c => c.instructorId === appState.currentUser.email);
}

function renderCourses() {
    const grid = document.getElementById('coursesGrid');
    const allCourses = getAllCourses();
    
    grid.innerHTML = allCourses.map(course => `
        <div class="course-card" onclick="showCourseDetails(${course.id})">
            <div class="course-image">
                ${course.icon}
                ${course.isInstructorCourse ? `<span class="course-instructor-badge">By ${course.instructorName}</span>` : ''}
            </div>
            <div class="course-info">
                <div class="course-level">${course.level}</div>
                <h3 class="course-title">${course.title}</h3>
                <p class="course-description">${course.description}</p>
                <div class="course-meta">
                    <span>📚 ${course.lessons} lessons</span>
                    <span>⏱️ ${course.duration}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function showCourseDetails(courseId) {
    const allCourses = getAllCourses();
    const course = allCourses.find(c => c.id === courseId);
    if (!course) return;
    
    appState.currentCourseId = courseId;
    
    const isEnrolled = appState.enrolledCourses.some(ec => ec.id === courseId);
    const isInstructor = appState.currentUser && appState.currentUser.role === 'instructor';
    const isOwnCourse = course.isInstructorCourse && 
                        isInstructor &&
                        course.instructorId === appState.currentUser.email;
    
    let actionsHTML = '';
    
    if (isOwnCourse) {
        // Instructor viewing their own course
        actionsHTML = `
            <button class="btn btn-primary btn-lg" onclick="editCourse(${course.id})">
                Edit Course
            </button>
            <button class="btn btn-ghost btn-lg" onclick="deleteCourse(${course.id})">
                Delete Course
            </button>
        `;
    } else if (isInstructor) {
        // Instructor viewing someone else's course (can't enroll)
        actionsHTML = `
            <button class="btn btn-ghost btn-lg" disabled>
                Instructors cannot enroll
            </button>
        `;
    } else if (isEnrolled) {
        // Student already enrolled
        actionsHTML = `
            <button class="btn btn-primary btn-lg" onclick="openTasksModal(${course.id})">
                View Tasks
            </button>
            <button class="btn btn-ghost btn-lg" disabled>
                ✓ Enrolled
            </button>
        `;
    } else {
        // Student not enrolled
        actionsHTML = `
            <button class="btn btn-primary btn-lg" onclick="enrollCourse(${course.id})">
                Enroll Now
            </button>
        `;
    }
    
    const detailsHTML = `
        <div class="course-details-header">
            <div class="course-details-icon">${course.icon}</div>
            <h1 class="course-details-title">${course.title}</h1>
            <div class="course-details-level">${course.level}</div>
            ${course.isInstructorCourse ? `<p style="color: var(--text-muted); margin-top: var(--space-sm);">By ${course.instructorName}</p>` : ''}
        </div>
        <div class="course-details-body">
            <h3>About This Course</h3>
            <p>${course.description}</p>
            <br>
            <p><strong>Duration:</strong> ${course.duration}</p>
            <p><strong>Total Lessons:</strong> ${course.lessons}</p>
            <p><strong>Tasks:</strong> ${course.tasks.length} assignments</p>
            ${course.isInstructorCourse ? `<p><strong>Enrolled Students:</strong> ${course.enrolledStudents || 0}</p>` : ''}
        </div>
        <div class="course-details-actions">
            ${actionsHTML}
        </div>
    `;
    
    document.getElementById('courseDetails').innerHTML = detailsHTML;
    showPage('courseDetails');
}

function enrollCourse(courseId) {
    if (!appState.currentUser) {
        openModal('loginModal');
        return;
    }
    
    // Prevent instructors from enrolling
    if (appState.currentUser.role === 'instructor') {
        showToast('Instructors cannot enroll in courses. Switch to a student account to enroll.');
        return;
    }
    
    const allCourses = getAllCourses();
    const course = allCourses.find(c => c.id === courseId);
    if (!course) return;
    
    // Check if already enrolled
    if (appState.enrolledCourses.some(ec => ec.id === courseId)) {
        showToast('You are already enrolled in this course');
        return;
    }
    
    // Deep copy course with tasks
    const enrolledCourse = {
        ...course,
        tasks: course.tasks.map(t => ({ ...t, completed: false })),
        enrolledAt: new Date().toISOString()
    };
    
    appState.enrolledCourses.push(enrolledCourse);
    
    // Update enrolled count for instructor courses in global database
    if (course.isInstructorCourse) {
        const globalCourse = globalCoursesDB.find(c => c.id === courseId);
        if (globalCourse) {
            globalCourse.enrolledStudents = (globalCourse.enrolledStudents || 0) + 1;
            saveGlobalCourses();
        }
    }
    
    saveState();
    
    showToast('Successfully enrolled in ' + course.title);
    showCourseDetails(courseId);
}

// ==========================================
// Tasks
// ==========================================
function openTasksModal(courseId) {
    const enrolledCourse = appState.enrolledCourses.find(ec => ec.id === courseId);
    if (!enrolledCourse) return;
    
    appState.currentCourseId = courseId;
    
    document.getElementById('tasksModalTitle').textContent = enrolledCourse.title + ' - Tasks';
    
    renderTasks(enrolledCourse);
    openModal('tasksModal');
}

function renderTasks(enrolledCourse) {
    const tasksList = document.getElementById('tasksList');
    const completedCount = enrolledCourse.tasks.filter(t => t.completed).length;
    const totalTasks = enrolledCourse.tasks.length;
    const progress = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;
    
    tasksList.innerHTML = enrolledCourse.tasks.map((task, index) => `
        <div class="task-item">
            <div class="task-checkbox ${task.completed ? 'completed' : ''}" 
                 onclick="toggleTask(${enrolledCourse.id}, ${index})">
            </div>
            <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
        </div>
    `).join('');
    
    document.getElementById('progressFill').style.width = progress + '%';
    document.getElementById('progressText').textContent = progress + '% Complete';
}

function toggleTask(courseId, taskIndex) {
    const enrolledCourse = appState.enrolledCourses.find(ec => ec.id === courseId);
    if (!enrolledCourse) return;
    
    enrolledCourse.tasks[taskIndex].completed = !enrolledCourse.tasks[taskIndex].completed;
    saveState();
    
    renderTasks(enrolledCourse);
    
    // Update dashboard if visible
    if (document.getElementById('dashboardPage').classList.contains('active')) {
        renderEnrolledCourses();
    }
}

// ==========================================
// Dashboard
// ==========================================
function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    switch(tabName) {
        case 'courses':
            document.getElementById('myCoursesTab').classList.add('active');
            break;
        case 'files':
            document.getElementById('myFilesTab').classList.add('active');
            break;
        case 'manage':
            document.getElementById('manageCoursesTab').classList.add('active');
            renderInstructorCourses();
            break;
        case 'analytics':
            document.getElementById('analyticsTab').classList.add('active');
            renderAnalytics();
            break;
    }
}

function renderDashboard() {
    updateDashboardForRole();
    renderFiles();
    
    if (appState.currentUser && appState.currentUser.role === 'instructor') {
        renderInstructorCourses();
        renderAnalytics();
    } else {
        renderEnrolledCourses();
    }
}

function renderEnrolledCourses() {
    const container = document.getElementById('enrolledCourses');
    const emptyState = document.getElementById('emptyCoursesState');
    
    if (appState.enrolledCourses.length === 0) {
        container.innerHTML = '';
        container.appendChild(emptyState);
        emptyState.style.display = 'block';
        return;
    }
    
    emptyState.style.display = 'none';
    
    container.innerHTML = appState.enrolledCourses.map(course => {
        const completedTasks = course.tasks.filter(t => t.completed).length;
        const totalTasks = course.tasks.length;
        const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
        
        return `
            <div class="enrolled-card">
                <div class="enrolled-header">
                    <span class="enrolled-icon">${course.icon}</span>
                    <div>
                        <div class="enrolled-title">${course.title}</div>
                        <div class="enrolled-level">${course.level}</div>
                    </div>
                </div>
                <div class="enrolled-progress">
                    <div class="enrolled-progress-label">
                        <span>Progress</span>
                        <span>${completedTasks}/${totalTasks} tasks</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progress}%"></div>
                    </div>
                </div>
                <div class="enrolled-actions">
                    <button class="btn btn-primary" onclick="openTasksModal(${course.id})">
                        View Tasks
                    </button>
                    <button class="btn btn-ghost" onclick="showCourseDetails(${course.id})">
                        Details
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// ==========================================
// Files
// ==========================================
function handleCreateFile(event) {
    event.preventDefault();
    
    const fileName = document.getElementById('fileName').value.trim();
    if (!fileName) return;
    
    const newFile = {
        id: Date.now(),
        name: fileName,
        content: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    
    appState.files.push(newFile);
    saveState();
    
    closeModal('createFileModal');
    document.getElementById('fileName').value = '';
    
    renderFiles();
    showToast('File created successfully');
    
    // Open the file for editing
    editFile(newFile.id);
}

function renderFiles() {
    const container = document.getElementById('filesList');
    const emptyState = document.getElementById('emptyFilesState');
    
    if (appState.files.length === 0) {
        container.innerHTML = '';
        container.appendChild(emptyState);
        emptyState.style.display = 'block';
        return;
    }
    
    emptyState.style.display = 'none';
    
    container.innerHTML = appState.files.map(file => {
        const date = new Date(file.updatedAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
        
        return `
            <div class="file-item">
                <div class="file-info">
                    <span class="file-icon">📄</span>
                    <div>
                        <div class="file-name">${file.name}</div>
                        <div class="file-date">Last modified: ${date}</div>
                    </div>
                </div>
                <div class="file-actions">
                    <button class="btn btn-primary" onclick="editFile(${file.id})">Edit</button>
                    <button class="btn btn-ghost" onclick="deleteFile(${file.id})">Delete</button>
                </div>
            </div>
        `;
    }).join('');
}

function editFile(fileId) {
    const file = appState.files.find(f => f.id === fileId);
    if (!file) return;
    
    appState.currentFileId = fileId;
    
    document.getElementById('editFileTitle').textContent = 'Edit: ' + file.name;
    document.getElementById('fileContent').value = file.content;
    
    openModal('editFileModal');
}

function saveFile() {
    const file = appState.files.find(f => f.id === appState.currentFileId);
    if (!file) return;
    
    file.content = document.getElementById('fileContent').value;
    file.updatedAt = new Date().toISOString();
    
    saveState();
    closeModal('editFileModal');
    renderFiles();
    showToast('File saved successfully');
}

function deleteFile(fileId) {
    if (!confirm('Are you sure you want to delete this file?')) return;
    
    appState.files = appState.files.filter(f => f.id !== fileId);
    saveState();
    renderFiles();
    showToast('File deleted');
}

// ==========================================
// Toast Notifications
// ==========================================
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    toastMessage.textContent = message;
    toast.classList.add('active');
    
    setTimeout(() => {
        toast.classList.remove('active');
    }, 3000);
}

// ==========================================
// Initialize Application
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    loadState();
    renderCourses();
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.active').forEach(modal => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
});

// ==========================================
// Instructor Course Management
// ==========================================
function handleCreateCourse(event) {
    event.preventDefault();
    
    if (!appState.currentUser || appState.currentUser.role !== 'instructor') {
        showToast('Only instructors can create courses');
        return;
    }
    
    const title = document.getElementById('courseTitle').value.trim();
    const icon = document.getElementById('courseIcon').value;
    const description = document.getElementById('courseDescription').value.trim();
    const level = document.getElementById('courseLevel').value;
    const duration = document.getElementById('courseDuration').value.trim();
    const lessons = parseInt(document.getElementById('courseLessons').value);
    const tasksText = document.getElementById('courseTasks').value.trim();
    
    // Parse tasks from text
    const tasks = tasksText
        .split('\n')
        .filter(t => t.trim())
        .map((text, index) => ({
            id: index + 1,
            text: text.trim(),
            completed: false
        }));
    
    // Create new course
    const newCourse = {
        id: Date.now(),
        title,
        icon,
        description,
        level,
        duration,
        lessons,
        tasks: tasks.length > 0 ? tasks : [
            { id: 1, text: 'Complete course introduction', completed: false },
            { id: 2, text: 'Finish all lessons', completed: false },
            { id: 3, text: 'Complete final assessment', completed: false }
        ],
        instructorId: appState.currentUser.email,
        instructorName: appState.currentUser.name,
        createdAt: new Date().toISOString(),
        enrolledStudents: 0,
        isInstructorCourse: true
    };
    
    // Add to global courses database
    globalCoursesDB.push(newCourse);
    saveGlobalCourses();
    
    closeModal('createCourseModal');
    event.target.reset();
    
    showToast('Course created successfully!');
    renderInstructorCourses();
    renderCourses();
    renderAnalytics();
}

function renderInstructorCourses() {
    const container = document.getElementById('instructorCoursesList');
    const emptyState = document.getElementById('emptyInstructorCoursesState');
    
    // Get courses created by current instructor from global database
    const instructorCourses = getInstructorOwnCourses();
    
    if (!instructorCourses || instructorCourses.length === 0) {
        container.innerHTML = '';
        container.appendChild(emptyState);
        emptyState.style.display = 'block';
        return;
    }
    
    emptyState.style.display = 'none';
    
    container.innerHTML = instructorCourses.map(course => {
        const enrolledCount = course.enrolledStudents || 0;
        
        return `
            <div class="instructor-course-card">
                <div class="instructor-course-icon">${course.icon}</div>
                <div class="instructor-course-info">
                    <h4>${course.title}</h4>
                    <div class="instructor-course-meta">
                        <span>📊 ${course.level}</span>
                        <span>📚 ${course.lessons} lessons</span>
                        <span>📝 ${course.tasks.length} tasks</span>
                        <span>👥 ${enrolledCount} students</span>
                    </div>
                </div>
                <div class="instructor-course-actions">
                    <button class="btn btn-primary" onclick="editCourse(${course.id})">Edit</button>
                    <button class="btn btn-ghost" onclick="deleteCourse(${course.id})">Delete</button>
                </div>
            </div>
        `;
    }).join('');
}

function editCourse(courseId) {
    const course = globalCoursesDB.find(c => c.id === courseId);
    if (!course) return;
    
    // Verify ownership
    if (course.instructorId !== appState.currentUser.email) {
        showToast('You can only edit your own courses');
        return;
    }
    
    appState.editingCourseId = courseId;
    
    // Populate form
    document.getElementById('editCourseTitle').value = course.title;
    document.getElementById('editCourseIcon').value = course.icon;
    document.getElementById('editCourseDescription').value = course.description;
    document.getElementById('editCourseLevel').value = course.level;
    document.getElementById('editCourseDuration').value = course.duration;
    document.getElementById('editCourseLessons').value = course.lessons;
    document.getElementById('editCourseTasks').value = course.tasks.map(t => t.text).join('\n');
    
    openModal('editCourseModal');
}

function handleEditCourse(event) {
    event.preventDefault();
    
    const course = globalCoursesDB.find(c => c.id === appState.editingCourseId);
    if (!course) return;
    
    // Verify ownership
    if (course.instructorId !== appState.currentUser.email) {
        showToast('You can only edit your own courses');
        return;
    }
    
    const tasksText = document.getElementById('editCourseTasks').value.trim();
    const tasks = tasksText
        .split('\n')
        .filter(t => t.trim())
        .map((text, index) => ({
            id: index + 1,
            text: text.trim(),
            completed: false
        }));
    
    // Update course
    course.title = document.getElementById('editCourseTitle').value.trim();
    course.icon = document.getElementById('editCourseIcon').value;
    course.description = document.getElementById('editCourseDescription').value.trim();
    course.level = document.getElementById('editCourseLevel').value;
    course.duration = document.getElementById('editCourseDuration').value.trim();
    course.lessons = parseInt(document.getElementById('editCourseLessons').value);
    course.tasks = tasks.length > 0 ? tasks : course.tasks;
    course.updatedAt = new Date().toISOString();
    
    saveGlobalCourses();
    closeModal('editCourseModal');
    
    showToast('Course updated successfully!');
    renderInstructorCourses();
    renderCourses();
}

function deleteCourse(courseId) {
    if (!confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
        return;
    }
    
    const course = globalCoursesDB.find(c => c.id === courseId);
    if (!course) return;
    
    // Verify ownership
    if (course.instructorId !== appState.currentUser.email) {
        showToast('You can only delete your own courses');
        return;
    }
    
    // Remove from global database
    globalCoursesDB = globalCoursesDB.filter(c => c.id !== courseId);
    saveGlobalCourses();
    
    showToast('Course deleted');
    renderInstructorCourses();
    renderCourses();
    renderAnalytics();
    showPage('dashboard');
}

// ==========================================
// Analytics
// ==========================================
function renderAnalytics() {
    if (!appState.currentUser || appState.currentUser.role !== 'instructor') return;
    
    // Get courses created by current instructor from global database
    const instructorCourses = getInstructorOwnCourses();
    
    // Calculate totals
    const totalCourses = instructorCourses.length;
    const totalStudents = instructorCourses.reduce((sum, c) => sum + (c.enrolledStudents || 0), 0);
    const totalTasks = instructorCourses.reduce((sum, c) => sum + c.tasks.length, 0);
    
    // Calculate average completion (for demo, based on enrolled students)
    const avgCompletion = totalStudents > 0 ? Math.floor(Math.random() * 30 + 50) : 0;
    
    // Update analytics cards
    document.getElementById('totalCoursesCreated').textContent = totalCourses;
    document.getElementById('totalStudents').textContent = totalStudents;
    document.getElementById('totalTasks').textContent = totalTasks;
    document.getElementById('avgCompletion').textContent = avgCompletion + '%';
    
    // Render per-course analytics
    const detailsContainer = document.getElementById('courseAnalyticsDetails');
    
    if (instructorCourses.length === 0) {
        detailsContainer.innerHTML = `
            <div class="empty-state" style="padding: var(--space-xl);">
                <span class="empty-icon">📊</span>
                <h3>No Analytics Yet</h3>
                <p>Create your first course to see analytics</p>
            </div>
        `;
        return;
    }
    
    detailsContainer.innerHTML = `
        <h4>Course Performance</h4>
        ${instructorCourses.map(course => {
            const enrolled = course.enrolledStudents || 0;
            const completion = enrolled > 0 ? Math.floor(Math.random() * 40 + 40) : 0;
            
            return `
                <div class="course-analytics-item">
                    <div class="course-analytics-header">
                        <div class="course-analytics-title">
                            <span>${course.icon}</span>
                            <span>${course.title}</span>
                        </div>
                    </div>
                    <div class="course-analytics-stats">
                        <span>👥 ${enrolled} enrolled</span>
                        <span>📝 ${course.tasks.length} tasks</span>
                        <span>✅ ${completion}% avg completion</span>
                    </div>
                    <div class="enrolled-progress" style="margin-top: var(--space-md);">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${completion}%"></div>
                        </div>
                    </div>
                </div>
            `;
        }).join('')}
    `;
}
