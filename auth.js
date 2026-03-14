// ----------------------
// Initialize Firebase
// ----------------------
const firebaseConfig = {
  apiKey: "AIzaSyCnPkV0kC7_HtlUYnfUzD_aO0U6rhfopf8",
  authDomain: "online-exam-system-33281.firebaseapp.com",
  projectId: "online-exam-system-33281",
  storageBucket: "online-exam-system-33281.firebasestorage.app",
  messagingSenderId: "690568730610",
  appId: "1:690568730610:web:fb2ec21aaf9642f8883d6b"
};
firebase.initializeApp(firebaseConfig);

// ----------------------
// Register
document.getElementById("registerForm")?.addEventListener("submit", function(e){
    e.preventDefault(); // stop default form submit

    const email = this.querySelector('input[type="email"]').value.trim();
    const password = this.querySelector('input[type="password"]').value.trim();

    if (!email || !password) {
        alert("Email and password are required!");
        return;
    }

    // Create user in Firebase
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            // User created, now automatically sign in
            return firebase.auth().signInWithEmailAndPassword(email, password);
        })
        .then(() => {
            alert("Registration Successful! Redirecting...");
            // Redirect to saved course or dashboard
            const redirectPage = sessionStorage.getItem("redirectAfterLogin") || "dashboard.html";
            sessionStorage.removeItem("redirectAfterLogin");
            window.location.href = redirectPage;
        })
        .catch(error => {
            console.error(error);
            alert("Error: " + error.message);
        });
});
// ----------------------
// Login
// ----------------------
document.getElementById("loginForm")?.addEventListener("submit", function(e) {
    e.preventDefault();

    const email = this.querySelector("input[type=email]").value;
    const password = this.querySelector("input[type=password]").value;

    if (!email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        alert("Login Successful!");
        redirectAfterLogin();
    })
    .catch((error) => {
        alert(error.message);
    });
});

// ----------------------
// Redirect After Login or Registration
// ----------------------
function redirectAfterLogin() {
    const redirectPage = sessionStorage.getItem("redirectAfterLogin");
    if (redirectPage) {
        sessionStorage.removeItem("redirectAfterLogin");
        window.location.href = redirectPage; // Go to course page
    } else {
        window.location.href = "dashboard.html"; // Default dashboard
    }
}