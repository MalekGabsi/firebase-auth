import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged,sendPasswordResetEmail ,createUserWithEmailAndPassword} 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDWvVGGfp0Hp_dvia4Aigh7UEMYx4AtDRw",
  authDomain: "tp-firebase-e9830.firebaseapp.com",
  projectId: "tp-firebase-e9830",
  storageBucket: "tp-firebase-e9830.firebasestorage.app",
  messagingSenderId: "121779361522",
  appId: "1:121779361522:web:bb21235a3e67821f32226b"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


// ---------------- UTILS ----------------

function setMessage(elementId, text, type = "") {
  const element = document.getElementById(elementId);
  if (!element) return;

  element.textContent = text;
  element.classList.remove("error", "success");

  if (type) {
    element.classList.add(type);
  }
}

function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}


// ---------------- APP ----------------

document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;

  // -------- LOGIN --------
  if (page === "login") {
    const loginForm = document.getElementById("login-form");

    loginForm?.addEventListener("submit", (event) => {
      event.preventDefault();

      const email = document.getElementById("login-email").value.trim();
      const password = document.getElementById("login-password").value.trim();

      if (!email || !password) {
        setMessage("login-message", "Veuillez renseigner l'e-mail et le mot de passe.", "error");
        return;
      }

      if (!isValidEmail(email)) {
        setMessage("login-message", "Email invalide.", "error");
        return;
      }

      // 🔥 Firebase login
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          setMessage("login-message", "Connexion réussie !", "success");
          window.location.href = "dashboard.html";
        })
        .catch((error) => {
          setMessage("login-message", "Erreur : " + error.message, "error");
        });
    });
  }

  // -------- DASHBOARD --------
  if (page === "dashboard") {
    const userDisplay = document.getElementById("user-display");
    const logoutButton = document.getElementById("logout-button");
    const logoutLink = document.getElementById("logout-link");

    // 🔥 Check user
    onAuthStateChanged(auth, (user) => {
      if (user) {
        userDisplay.textContent = "Connecté : " + user.email;
      } else {
        window.location.href = "login.html";
      }
    });

    // 🔥 Logout
    const logoutHandler = (event) => {
      event.preventDefault();

      signOut(auth)
        .then(() => {
          window.location.href = "login.html";
        })
        .catch((error) => {
          setMessage("dashboard-message", error.message, "error");
        });
    };

    logoutButton?.addEventListener("click", logoutHandler);
    logoutLink?.addEventListener("click", logoutHandler);
  }

  // -------- REGISTER --------
if (page === "register") {
  const registerForm = document.getElementById("register-form");

  registerForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("register-name").value.trim();
    const email = document.getElementById("register-email").value.trim();
    const password = document.getElementById("register-password").value;
    const passwordConfirm = document.getElementById("register-password-confirm").value;

    if (!name || !email || !password || !passwordConfirm) {
      setMessage("register-message", "Tous les champs sont obligatoires.", "error");
      return;
    }

    if (!isValidEmail(email)) {
      setMessage("register-message", "Email invalide.", "error");
      return;
    }

    if (password.length < 8) {
      setMessage("register-message", "Mot de passe : 8 caractères minimum.", "error");
      return;
    }
    
    if (!/[A-Z]/.test(password)) {
      setMessage("register-message", "Ajoute au moins une majuscule.", "error");
      return;
    }
    
    if (!/[0-9]/.test(password)) {
      setMessage("register-message", "Ajoute au moins un chiffre.", "error");
      return;
    }

    if (password !== passwordConfirm) {
      setMessage("register-message", "Les mots de passe ne correspondent pas.", "error");
      return;
    }

    // 🔥 Firebase register
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setMessage("register-message", "Compte créé avec succès !", "success");
        window.location.href = "dashboard.html";
      })
      .catch((error) => {
        let message = "Erreur lors de la création.";

        if (error.code === "auth/invalid-email") {
          message = "Adresse e-mail invalide.";
        } else if (error.code === "auth/weak-password") {
          message = "Mot de passe trop faible.";
        } else if (error.code === "auth/email-already-in-use") {
          message = "Compte déjà existant.";
        }

        setMessage("register-message", message, "error");
      });
  });
}

// -------- FORGOT PASSWORD --------
if (page === "forgot-password") {
  const forgotForm = document.getElementById("forgot-password-form");

  forgotForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("forgot-email").value.trim();

    if (!email) {
      setMessage("forgot-message", "Veuillez saisir votre e-mail.", "error");
      return;
    }

    if (!isValidEmail(email)) {
      setMessage("forgot-message", "Email invalide.", "error");
      return;
    }

    // 🔥 Firebase reset password
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setMessage("forgot-message", "Email de réinitialisation envoyé !", "success");
      })
      .catch((error) => {
        let message = "Erreur lors de l’envoi.";

        if (error.code === "auth/user-not-found") {
          message = "Aucun compte avec cet e-mail.";
        } else if (error.code === "auth/invalid-email") {
          message = "Email invalide.";
        }

        setMessage("forgot-message", message, "error");
      });
  });
}
}



);