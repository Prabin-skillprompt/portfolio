// DOM Elements
const navbar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".nav-link");
const menuToggle = document.getElementById("menuToggle");
const navLinksContainer = document.querySelector(".nav-links");
const scrollTopBtn = document.getElementById("scrollTop");
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const skillProgressBars = document.querySelectorAll(".skill-progress");
const contactForm = document.getElementById("contactForm");

// Navbar scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Show/hide scroll to top button
  if (window.scrollY > 500) {
    scrollTopBtn.classList.add("visible");
  } else {
    scrollTopBtn.classList.remove("visible");
  }

  // Update active nav link based on scroll position
  updateActiveNavLink();
});

// Mobile menu toggle
menuToggle.addEventListener("click", () => {
  navLinksContainer.classList.toggle("active");
  menuToggle.querySelector("i").classList.toggle("fa-bars");
  menuToggle.querySelector("i").classList.toggle("fa-times");
});

// Close mobile menu when clicking a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinksContainer.classList.remove("active");
    menuToggle.querySelector("i").classList.add("fa-bars");
    menuToggle.querySelector("i").classList.remove("fa-times");
  });
});

// Scroll to top functionality
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Projects filter functionality
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    filterButtons.forEach((btn) => btn.classList.remove("active"));

    // Add active class to clicked button
    button.classList.add("active");

    const filterValue = button.getAttribute("data-filter");

    // Show/hide projects based on filter
    projectCards.forEach((card) => {
      const category = card.getAttribute("data-category");

      if (filterValue === "all" || filterValue === category) {
        card.style.display = "block";
        setTimeout(() => {
          card.style.opacity = "1";
          card.style.transform = "scale(1)";
        }, 10);
      } else {
        card.style.opacity = "0";
        card.style.transform = "scale(0.8)";
        setTimeout(() => {
          card.style.display = "none";
        }, 300);
      }
    });
  });
});

// Animate skill bars when they come into view
const observerOptions = {
  threshold: 0.5,
};

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const progressBar = entry.target;
      const width = progressBar.getAttribute("data-width");

      setTimeout(() => {
        progressBar.style.width = `${width}%`;
      }, 300);

      skillObserver.unobserve(progressBar);
    }
  });
}, observerOptions);

// Observe each skill progress bar
skillProgressBars.forEach((bar) => {
  skillObserver.observe(bar);
});

// Form submission
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form values
  const name = contactForm.querySelector('input[type="text"]').value;
  const email = contactForm.querySelector('input[type="email"]').value;
  const subject = contactForm.querySelector(
    'input[placeholder="Subject"]'
  ).value;
  const message = contactForm.querySelector("textarea").value;

  // In a real application, you would send this data to a server
  // For this demo, we'll just show a success message
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;

  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  // Simulate API call
  setTimeout(() => {
    alert(
      `Thank you, ${name}! Your message has been sent. I'll get back to you soon.`
    );
    contactForm.reset();
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }, 1500);
});

// Update active nav link based on scroll position
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section");
  const scrollPosition = window.scrollY + 100;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

// Initialize animations on page load
document.addEventListener("DOMContentLoaded", () => {
  // Animate hero title
  const heroTitle = document.querySelector(".hero-title");
  heroTitle.style.opacity = "0";
  heroTitle.style.transform = "translateY(30px)";

  setTimeout(() => {
    heroTitle.style.transition = "opacity 1s ease, transform 1s ease";
    heroTitle.style.opacity = "1";
    heroTitle.style.transform = "translateY(0)";
  }, 300);

  // Initialize skill bars with 0 width
  skillProgressBars.forEach((bar) => {
    bar.style.width = "0%";
  });
});

// Add hover effect to project cards
projectCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)";
  });
});

// Add typing animation effect to hero subtitle (optional enhancement)
function initTypingEffect() {
  const subtitle = document.querySelector(".hero-subtitle");
  const originalText = subtitle.textContent;
  const texts = [
    "Frontend Developer & UI/UX Designer",
    "Passionate about Clean Code",
    "Creating Digital Experiences",
  ];

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isPaused = false;

  function type() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      subtitle.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      subtitle.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
      isPaused = true;
      setTimeout(() => {
        isPaused = false;
        isDeleting = true;
        type();
      }, 2000);
      return;
    }

    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
    }

    const speed = isDeleting ? 50 : 100;
    setTimeout(type, isPaused ? 1000 : speed);
  }

  // Uncomment the line below to enable typing effect
  // setTimeout(type, 1000);
}

// Initialize typing effect (optional)
// initTypingEffect();
