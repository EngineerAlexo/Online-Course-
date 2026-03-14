// ==========================
// Firebase Configuration
// ==========================
const firebaseConfig = {
  apiKey: "AIzaSyCnPkV0kC7_HtlUYnfUzD_aO0U6rhfopf8",
  authDomain: "online-exam-system-33281.firebaseapp.com",
  projectId: "online-exam-system-33281",
  storageBucket: "online-exam-system-33281.firebasestorage.app",
  messagingSenderId: "690568730610",
  appId: "1:690568730610:web:fb2ec21aaf9642f8883d6b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// ==========================
// Scroll to Courses Button
// ==========================
function scrollToCourses() {
    document.querySelector("#courses").scrollIntoView({
        behavior: "smooth"
    });
}

// ==========================
// Start Course Button Handling
// ==========================
function startCourse(coursePage) {
    const user = firebase.auth().currentUser;

    if (user) {
        // User is logged in → go directly to course
        window.location.href = coursePage;
    } else {
        // Not logged in → redirect to login
        alert("Please login or register to access this course.");
        sessionStorage.setItem("redirectAfterLogin", coursePage);
        window.location.href = "login.html";
    }
}

// Attach Start Course buttons
document.querySelectorAll(".course-btn").forEach((btn, index) => {
    const courseLinks = [
        "mobile-software.html",
        "mobile-app.html",
        "windows-app.html",
        "web-development.html"
    ];

    btn.addEventListener("click", (e) => {
        e.preventDefault();
        startCourse(courseLinks[index]);
    });
});

// ==========================
// Scroll Reveal Animation
// ==========================
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
    sections.forEach(sec => {
        const top = window.scrollY;
        const offset = sec.offsetTop - 300;
        const height = sec.offsetHeight;

        if (top >= offset && top < offset + height) {
            sec.classList.add("show");
        }
    });
});

// ==========================
// Logout Function
// ==========================
function logout() {
    firebase.auth().signOut().then(() => {
        alert("Logged Out Successfully");
        window.location.href = "index.html";
    }).catch((error) => {
        console.error("Logout Error:", error);
    });
}

// ==========================
// Firebase Auth State Listener
// ==========================
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log("Logged in as:", user.email);
        // Optional: Update UI to show user is logged in
        // Example: document.querySelector(".user-email").textContent = user.email;
    } else {
        console.log("No user logged in");
    }
});

// ==========================
// Redirect After Login (Login Page)
// ==========================
function redirectAfterLogin() {
    const redirectPage = sessionStorage.getItem("redirectAfterLogin");
    if (redirectPage) {
        sessionStorage.removeItem("redirectAfterLogin");
        window.location.href = redirectPage;
    } else {
        window.location.href = "dashboard.html"; // Default dashboard
    }
}