// ================= MOBILE MENU =================

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// ================= SMOOTH SCROLL =================

document.querySelectorAll('a[href^="#"]').forEach(link => {

  link.addEventListener("click", function (e) {

    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));

    if (target) {

      target.scrollIntoView({
        behavior: "smooth"
      });

      mobileMenu.classList.add("hidden");
    }

  });

});

// ================= EXPLORE BUTTON =================

const exploreBtn = document.getElementById("exploreBtn");

exploreBtn.addEventListener("click", () => {

  document.getElementById("featured").scrollIntoView({
    behavior: "smooth"
  });

});

// ================= SEARCH FUNCTION =================

const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

searchBtn.addEventListener("click", searchArticles);

searchInput.addEventListener("keypress", (e) => {

  if (e.key === "Enter") {
    searchArticles();
  }

});

function searchArticles() {

  const value = searchInput.value.toLowerCase();

  const cards = document.querySelectorAll(".bg-white");

  cards.forEach(card => {

    const text = card.innerText.toLowerCase();

    if (text.includes(value)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }

  });

}

// ================= NEWSLETTER =================

const newsletterForm =
document.getElementById("newsletterForm");

newsletterForm.addEventListener("submit", (e) => {

  e.preventDefault();

  const email =
  document.getElementById("emailInput").value;

  if (email === "") {

    alert("Please enter your email");

    return;
  }

  alert("Subscribed Successfully!");

  newsletterForm.reset();

});

// ================= ACTIVE NAV LINK =================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach(section => {

    const sectionTop = section.offsetTop;

    if (pageYOffset >= sectionTop - 200) {

      current = section.getAttribute("id");

    }

  });

  navLinks.forEach(link => {

    link.classList.remove("text-indigo-600");

    if (link.getAttribute("href").includes(current)) {

      link.classList.add("text-indigo-600");

    }

  });

});

// ================= CARD CLICK EFFECT =================

const cards = document.querySelectorAll(".rounded-2xl");

cards.forEach(card => {

  card.addEventListener("click", () => {

    card.classList.add("scale-95");

    setTimeout(() => {

      card.classList.remove("scale-95");

    }, 150);

  });

});

// ================= PAGE LOADED =================

window.addEventListener("load", () => {

  console.log("InkFlow Loaded Successfully");

});

// newsletter

// =========================
// FIREBASE IMPORTS
// =========================

import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getAnalytics }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";

import {

    getDatabase,

    ref,

    push,

    set,

    get,

    child

}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


// =========================
// FIREBASE CONFIG
// =========================

const firebaseConfig = {

    apiKey:
    "AIzaSyD7cHYw4pPIUL_4E-d6DO5Dp73Pw51q1bw",

    authDomain:
    "c-29-1d32d.firebaseapp.com",

    databaseURL:
    "https://c-29-1d32d-default-rtdb.firebaseio.com",

    projectId:
    "c-29-1d32d",

    storageBucket:
    "c-29-1d32d.firebasestorage.app",

    messagingSenderId:
    "834488455480",

    appId:
    "1:834488455480:web:7f3d80da404527e63871cd",

    measurementId:
    "G-9B68Z0RP31"

};


// =========================
// INITIALIZE FIREBASE
// =========================

const app =
initializeApp(firebaseConfig);

const analytics =
getAnalytics(app);

const db =
getDatabase(app);


// =========================
// MOBILE MENU
// =========================

const menuBtn =
document.getElementById("menuBtn");

const mobileMenu =
document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {

    mobileMenu.classList.toggle("hidden");

});


// =========================
// EXPLORE BUTTON
// =========================

const exploreBtn =
document.getElementById("exploreBtn");

exploreBtn.addEventListener("click", () => {

    document
    .getElementById("featured")
    .scrollIntoView({

        behavior: "smooth"

    });

});


// =========================
// SEARCH FUNCTION
// =========================

const searchInput =
document.getElementById("searchInput");

const searchBtn =
document.getElementById("searchBtn");

searchBtn.addEventListener("click", () => {

    const value =
    searchInput.value.toLowerCase();

    const cards =
    document.querySelectorAll("#featured .bg-white");

    cards.forEach(card => {

        const text =
        card.innerText.toLowerCase();

        if (text.includes(value)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

});


// =========================
// NEWSLETTER SUBSCRIPTION
// =========================

const newsletterForm =
document.getElementById("newsletterForm");

const emailInput =
document.getElementById("emailInput");

newsletterForm.addEventListener("submit",
async (e) => {

    e.preventDefault();

    const email =
    emailInput.value.trim();

    // EMAIL VALIDATION

    if (!email.includes("@")) {

        showNotification(

            "Please enter a valid email",

            "error"

        );

        return;

    }

    try {

        // DATABASE REFERENCE

        const subscribersRef =
        ref(db, "subscribers");

        // SAVE EMAIL

        await push(subscribersRef, {

            email: email,

            subscribedAt:
            new Date().toISOString()

        });

        // SUCCESS

        showNotification(

            "Subscription successful!",

            "success"

        );

        // RESET INPUT

        emailInput.value = "";

    } catch (error) {

        console.log(error);

        showNotification(

            "Something went wrong",

            "error"

        );

    }

});


// =========================
// NOTIFICATION SYSTEM
// =========================

function showNotification(message, type) {

    const notification =
    document.createElement("div");

    notification.className = `

        fixed
        top-5
        right-5
        px-6
        py-4
        rounded-xl
        text-white
        shadow-2xl
        z-50
        font-semibold
        transition-all
        duration-300

        ${type === "success"

        ? "bg-green-500"

        : "bg-red-500"}

    `;

    notification.innerText = message;

    document.body.appendChild(notification);

    setTimeout(() => {

        notification.remove();

    }, 3000);

}

