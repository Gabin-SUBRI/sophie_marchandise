// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Fade in animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// Mobile menu toggle
const mobileMenu = document.querySelector(".mobile-menu");
const navLinks = document.querySelector(".nav-links");

mobileMenu.addEventListener("click", () => {
  navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex";
});

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(74, 63, 115, 0.98)";
  } else {
    navbar.style.background = "rgba(74, 63, 115, 0.95)";
  }
});

// Modal functions
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
}

// Close modal when clicking outside
window.addEventListener("click", function (event) {
  if (event.target.classList.contains("modal")) {
    event.target.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});

// Close modal with Escape key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    const activeModal = document.querySelector(".modal.active");
    if (activeModal) {
      activeModal.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  }
});

// Code à ajouter à votre script.js existant

// Effet parallaxe pour les sections avec background fixe
function initParallax() {
  const parallaxSections = document.querySelectorAll(".hero, .portfolio");

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5; // Vitesse du parallaxe

    parallaxSections.forEach((section, index) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const windowHeight = window.innerHeight;

      // Vérifier si la section est visible
      if (
        scrolled + windowHeight > sectionTop &&
        scrolled < sectionTop + sectionHeight
      ) {
        section.style.backgroundPosition = `center ${rate}px`;
      }
    });
  });
}

// Animation d'apparition progressive des sections
function initSectionReveal() {
  const sections = document.querySelectorAll("section");

  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -100px 0px",
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("section-reveal", "visible");
      }
    });
  }, revealOptions);

  sections.forEach((section) => {
    section.classList.add("section-reveal");
    revealObserver.observe(section);
  });
}

// Transition fluide entre sections avec différents backgrounds
function initSectionTransitions() {
  const sections = document.querySelectorAll("section[id]");

  const transitionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Ajouter une classe pour identifier la section active
          document.body.setAttribute("data-current-section", entry.target.id);
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  sections.forEach((section) => {
    transitionObserver.observe(section);
  });
}

// Optimisation des performances pour les effets de scroll
let ticking = false;

function requestTick() {
  if (!ticking) {
    requestAnimationFrame(() => {
      ticking = false;
    });
    ticking = true;
  }
}

// Initialiser tous les effets
document.addEventListener("DOMContentLoaded", () => {
  // Vos fonctions existantes...

  // Nouvelles fonctions pour les backgrounds
  initParallax();
  initSectionReveal();
  initSectionTransitions();
});

// Gestion responsive du parallaxe
function handleResize() {
  const isMobile = window.innerWidth <= 768;
  const parallaxSections = document.querySelectorAll(".hero, .portfolio");

  parallaxSections.forEach((section) => {
    if (isMobile) {
      section.style.backgroundAttachment = "scroll";
    } else {
      section.style.backgroundAttachment = "fixed";
    }
  });
}

window.addEventListener("resize", handleResize);
handleResize(); // Appel initial
