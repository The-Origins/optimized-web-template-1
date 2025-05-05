//desktop nav underline
const underline = document.querySelector(".nav-underline");

function setUnderline(el) {
  const rect = el.getBoundingClientRect();
  const navRect = el.closest(".desktop-nav").getBoundingClientRect();

  underline.style.width = `${rect.width}px`;
  underline.style.left = `${rect.left - navRect.left}px`;
}

// Scroll spy: update active nav on scroll
const sections = document.querySelectorAll("section[id]");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        const newActiveLink = document.querySelector(
          `.desktop-nav a[href="#${id}"]`
        );
        const prevActiveLink = document.querySelector(".desktop-nav a.active");

        const newActiveMobileLink = document.querySelector(
          `.mobile-nav a[href="#${id}"]`
        );
        const prevActiveMobileLink = document.querySelector(
          ".mobile-nav a.active"
        );

        if (!newActiveLink) return;

        // Update active class
        prevActiveLink.classList.remove("active");
        newActiveLink.classList.add("active");

        prevActiveMobileLink.classList.remove("active");
        newActiveMobileLink.classList.add("active");

        // Move underline
        setUnderline(newActiveLink);
      }
    });
  },
  {
    rootMargin: "0px 0px -60% 0px",
    threshold: 0.2,
  }
);

sections.forEach((section) => observer.observe(section));

// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");

mobileMenuToggle?.addEventListener("click", () => {
  mobileNav.classList.toggle("active");
});

// Close mobile menu when clicking outside
document?.addEventListener("click", (e) => {
  if (
    !mobileNav.contains(e.target) &&
    !mobileMenuToggle.contains(e.target) &&
    mobileNav.classList.contains("active")
  ) {
    mobileNav.classList.remove("active");
  }
});

//close mobile menu when clicking on a link
mobileNav.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    mobileNav.classList.remove("active");
  }
});

// Process Accordion
const processItems = document.querySelectorAll(".process-item");

processItems.forEach((item) => {
  const header = item.querySelector(".process-header");
  const toggleBtn = item.querySelector(".toggle-btn");
  const content = item.querySelector(".process-content");

  header?.addEventListener("click", () => {
    // Close previously open items
    const prevActiveItem = document.querySelector(".process-item.active");
    prevActiveItem?.classList.remove("active");
    const btn = prevActiveItem?.querySelector(".toggle-btn i");
    btn.className = "fas fa-plus";

    // Toggle current item
    const isActive = item.classList.toggle("active");
    const icon = toggleBtn.querySelector("i");
    icon.className = isActive ? "fas fa-minus" : "fas fa-plus";
  });
});

// Testimonial Carousel
const testimonialSlides = document.querySelectorAll(".testimonial-slide");
const prevButton = document.querySelector(".testimonial-prev");
const nextButton = document.querySelector(".testimonial-next");
const indicators = document.querySelectorAll(".indicator");
let currentSlide = 0;

// Function to update slides
function updateSlides() {
  const prevActiveSlide = document.querySelector(".testimonial-slide.active");
  prevActiveSlide?.classList.remove("active");

  const prevActiveIndicator = document.querySelector(".indicator.active");
  prevActiveIndicator?.classList.remove("active");

  testimonialSlides[currentSlide]?.classList.add("active");
  indicators[currentSlide]?.classList.add("active");
}

// Next slide
nextButton?.addEventListener("click", () => {
  currentSlide = (currentSlide + 1) % testimonialSlides?.length;
  updateSlides();
});

// Previous slide
prevButton?.addEventListener("click", () => {
  currentSlide =
    (currentSlide - 1 + testimonialSlides?.length) % testimonialSlides?.length;
  updateSlides();
});

// Indicator clicks
indicators?.forEach((indicator, index) => {
  indicator?.addEventListener("click", () => {
    currentSlide = index;
    updateSlides();
  });
});

// Auto-rotate testimonials (every 5 seconds)
let testimonialInterval = setInterval(() => {
  currentSlide = (currentSlide + 1) % testimonialSlides?.length;
  updateSlides();
}, 5000);

// Stop auto-rotation when user interacts with carousel
document
  .querySelector(".testimonial-carousel")
  ?.addEventListener("mouseenter", () => {
    clearInterval(testimonialInterval);
  });

// Resume auto-rotation when user stops interacting
document
  .querySelector(".testimonial-carousel")
  ?.addEventListener("mouseleave", () => {
    testimonialInterval = setInterval(() => {
      currentSlide = (currentSlide + 1) % testimonialSlides?.length;
      updateSlides();
    }, 5000);
  });

// Form Validation
const contactForm = document.querySelector(".contact-form");

contactForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const nameInput = contactForm.querySelector('input[type="text"]');
  const emailInput = contactForm.querySelector('input[type="email"]');
  const messageInput = contactForm.querySelector("textarea");

  let isValid = true;

  // Simple validation - check if fields are empty
  if (!nameInput.value.trim()) {
    markInvalid(nameInput);
    isValid = false;
  } else {
    markValid(nameInput);
  }

  if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
    markInvalid(emailInput);
    isValid = false;
  } else {
    markValid(emailInput);
  }

  if (!messageInput.value.trim()) {
    markInvalid(messageInput);
    isValid = false;
  } else {
    markValid(messageInput);
  }

  if (isValid) {
    // Here you would typically send the form data to a server
    // For demonstration, we'll just show a success message
    const successMessage = document.createElement("div");
    successMessage.className = "success-message";
    successMessage.textContent = "Your message has been sent successfully!";

    contactForm.innerHTML = "";
    contactForm.appendChild(successMessage);
  }
});

// Helper functions for form validation
function markInvalid(input) {
  input.classList.add("invalid");
}

function markValid(input) {
  input.classList.remove("invalid");
}

function isValidEmail(email) {
  // Simple email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Input event listeners to remove error styling when user types
const formInputs = document.querySelectorAll(
  ".contact-form input, .contact-form textarea"
);

formInputs.forEach((input) => {
  input?.addEventListener("input", () => {
    input.classList.remove("invalid");
  });
});

// Newsletter form submission
const newsletterForm = document.querySelector(".newsletter-form");

newsletterForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const emailInput = newsletterForm.querySelector('input[type="email"]');

  if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
    emailInput.classList.add("invalid");
  } else {
    emailInput.value = "";

    // Show success message
    const button = newsletterForm.querySelector("button");
    const originalText = button.textContent;

    button.textContent = "Subscribed!";
    button.disabled = true;

    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
    }, 3000);
  }
});
