
// SHOPSMART LOGIN AND SIGNUP SYSTEM

// SHOW / HIDE PASSWORD

function togglePassword(inputId, button) {

    const passwordInput = document.getElementById(inputId);

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        button.innerText = "Hide";
    } else {
        passwordInput.type = "password";
        button.innerText = "Show";
    }
}


// SIGNUP SYSTEM

const signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.getElementById("signupName").value.trim();
        const email = document.getElementById("signupEmail").value.trim().toLowerCase();
        const password = document.getElementById("signupPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        const message = document.getElementById("signupMessage");

        if (password.length < 8) {
            message.style.color = "red";
            message.innerText = "Password must contain at least 8 characters.";
            return;
        }

        if (password !== confirmPassword) {
            message.style.color = "red";
            message.innerText = "Passwords do not match!";
            return;
        }

        let users = JSON.parse(localStorage.getItem("shopSmartUsers")) || [];

        const existingUser = users.find(user => user.email === email);

        if (existingUser) {
            message.style.color = "red";
            message.innerText = "Email is already registered!";
            return;
        }

        // Demo only: never store real passwords this way.
        users.push({
            name: name,
            email: email,
            password: password
        });

        localStorage.setItem("shopSmartUsers", JSON.stringify(users));

        message.style.color = "green";
        message.innerText = "Account created successfully!";

        signupForm.reset();

        setTimeout(function() {
            window.location.href = "login.html";
        }, 1200);

    });
}


// LOGIN SYSTEM

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const email = document.getElementById("loginEmail").value.trim().toLowerCase();
        const password = document.getElementById("loginPassword").value;

        const message = document.getElementById("loginMessage");

        const users = JSON.parse(localStorage.getItem("shopSmartUsers")) || [];

        const user = users.find(function(item) {
            return item.email === email && item.password === password;
        });

        if (user) {

            const currentUser = {
                name: user.name,
                email: user.email
            };

           localStorage.setItem(
    "shopSmartCurrentUser",
    JSON.stringify(currentUser)
);

            message.style.color = "green";
            message.innerText = "Login successful!";

            setTimeout(function() {
                window.location.href = "index.html";
            }, 1000);

        } else {

            message.style.color = "red";
            message.innerText = "Invalid email or password!";

        }

    });
}



// DISPLAY USER DETAILS ON HOMEPAGE

document.addEventListener("DOMContentLoaded", function () {

    const userData = sessionStorage.getItem(
        "shopSmartCurrentUser"
    );

    const loginLink = document.getElementById("loginLink");
    const signupLink = document.getElementById("signupLink");
    const logoutButton = document.getElementById("logoutButton");

    if (!loginLink || !signupLink || !logoutButton) {
        return;
    }

    if (userData) {

        const user = JSON.parse(userData);

        loginLink.innerText = "Hello, " + user.name;
        loginLink.href = "#";

        signupLink.style.display = "none";
        logoutButton.style.display = "inline-block";

    } else {

        loginLink.innerText = "Hello, Sign in";
        loginLink.href = "login.html";

        signupLink.style.display = "inline-block";
        logoutButton.style.display = "none";

    }

});


// LOGOUT FUNCTION

function logoutUser() {

    sessionStorage.removeItem("shopSmartCurrentUser");

    window.location.href = "index.html";

}
