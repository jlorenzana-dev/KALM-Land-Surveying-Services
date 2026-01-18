// ==================== DOM Elements ====================
const header = document.getElementById('header');
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const themeToggle = document.getElementById('theme-toggle');
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const contactForm = document.getElementById('contact-form');

// ==================== Theme Toggle ====================
function initTheme() {
  const savedTheme = localStorage.getItem('kalm-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
  }
}

function toggleTheme() {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('kalm-theme', isDark ? 'dark' : 'light');
}

// Initialize theme on load
initTheme();

// Theme toggle event listener
if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
}

// ==================== Header Scroll Effect ====================
function handleScroll() {
  // Header background change
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  // Update active section
  updateActiveSection();
}

function updateActiveSection() {
  const sections = ['home', 'about', 'services', 'contact'];

  for (let i = sections.length - 1; i >= 0; i--) {
    const section = document.getElementById(sections[i]);
    if (section) {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 150) {
        setActiveLink(sections[i]);
        break;
      }
    }
  }
}

function setActiveLink(sectionId) {
  // Update desktop nav links
  navLinks.forEach(link => {
    if (link.getAttribute('href') === `#${sectionId}`) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Update mobile nav links
  mobileNavLinks.forEach(link => {
    if (link.getAttribute('href') === `#${sectionId}`) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', handleScroll);

// ==================== Mobile Menu Toggle ====================
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
}

// Close mobile menu when clicking a link
mobileNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// ==================== Smooth Scrolling ====================
function smoothScroll(e) {
  e.preventDefault();
  const targetId = this.getAttribute('href');
  const targetElement = document.querySelector(targetId);

  if (targetElement) {
    const headerHeight = header.offsetHeight;
    const targetPosition = targetElement.offsetTop - headerHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
}

// Add smooth scroll to all navigation links
navLinks.forEach(link => link.addEventListener('click', smoothScroll));
mobileNavLinks.forEach(link => link.addEventListener('click', smoothScroll));

// Logo click
document.querySelectorAll('.logo').forEach(logo => {
  logo.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

// Footer links
document.querySelectorAll('.footer-links a').forEach(link => {
  link.addEventListener('click', smoothScroll);
});

// Hero CTA buttons
document.querySelectorAll('.hero-buttons .btn').forEach(btn => {
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      const headerHeight = header.offsetHeight;
      const targetPosition = targetElement.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ==================== Contact Form ====================
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value.trim();

    // Basic validation
    if (!name || !email || !message) {
      showNotification('Please fill in all required fields.', 'error');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showNotification('Please enter a valid email address.', 'error');
      return;
    }

    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    /* Simulate API call delay
    setTimeout(() => {
      showNotification(`Thank you, ${name}! Your message has been sent successfully. We will contact you soon.`, 'success');
      contactForm.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 1500);*/
  });
}

// Notification function
function showNotification(message, type = 'success') {
  // Remove existing notification
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span>${message}</span>
      <button class="notification-close">&times;</button>
    </div>
  `;

  // Add styles
  notification.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    max-width: 400px;
    padding: 1rem 1.5rem;
    background: ${type === 'success' ? '#10b981' : '#ef4444'};
    color: white;
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    z-index: 9999;
    animation: slideInRight 0.3s ease-out;
  `;

  // Add keyframes for animation
  if (!document.querySelector('#notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
      @keyframes slideInRight {
        from {
          opacity: 0;
          transform: translateX(100px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      .notification-content {
        display: flex;
        align-items: center;
        gap: 1rem;
      }
      .notification-close {
        background: transparent;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        line-height: 1;
        opacity: 0.8;
        transition: opacity 0.2s;
      }
      .notification-close:hover {
        opacity: 1;
      }
    `;
    document.head.appendChild(style);
  }

  document.body.appendChild(notification);

  // Close button functionality
  notification.querySelector('.notification-close').addEventListener('click', () => {
    notification.remove();
  });

  // Auto remove after 5 seconds
  contactForm.addEventListener('submit', function () {
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
  });
}

// ==================== Intersection Observer for Animations ====================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Add staggered delay based on index
      setTimeout(() => {
        entry.target.classList.add('animate-fade-in');
      }, index * 100);
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .contact-card, .feature-item, .other-service-item').forEach(el => {
  observer.observe(el);
});

// ==================== Initial Setup ====================
// Set initial active link
handleScroll();

// Add loaded class to body for initial animations
document.body.classList.add('loaded');

// AJAX Submission

const form = document.getElementById('contact-form');
const successBox = document.getElementById('form-success');
const successText = document.getElementById('success-text');
const errorMessage = document.getElementById('form-error');
const submitBtn = form.querySelector('button[type="submit"]');
const closeSuccess = document.querySelector('.close-success');

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  const formData = new FormData(form);
  const name = formData.get('name');

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      form.reset();

      successText.textContent = `Thank you, ${name}! Your message has been sent successfully. We will contact you shortly.`;
      successBox.style.display = 'block';

      /* Auto-hide after 9 seconds */
      setTimeout(() => {
        successBox.style.animation = 'fadeOut 0.3s ease forwards';
        setTimeout(() => {
          successBox.style.display = 'none';
          successBox.style.animation = 'fadeInUp 0.4s ease';
        }, 300);
      }, 9000);


      errorMessage.style.display = 'none';
    } else {
      throw new Error('Submission failed');
    }
  } catch (error) {
    errorMessage.style.display = 'block';
    successBox.style.display = 'none';
  } finally {
    submitBtn.textContent = 'Send Message';
    submitBtn.disabled = false;
  }
});

/* Close success message */
closeSuccess.addEventListener('click', () => {
  successBox.style.display = 'none';
});


