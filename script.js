// ===========================
// NAVBAR — Scroll + Hamburger
// ===========================
const navbar   = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  highlightActiveNav();
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===========================
// ACTIVE NAV LINK on Scroll
// ===========================
function highlightActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY  = window.scrollY + 120;
  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      link.classList.toggle('active', scrollY >= top && scrollY < top + height);
    }
  });
}

// ===========================
// SCROLL REVEAL
// ===========================
const revealEls = document.querySelectorAll(
  '.about-card, .skill-group, .project-card, .contact-item, .contact-form'
);

revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealEls.forEach(el => observer.observe(el));

// ===========================
// SKILL BAR ANIMATION
// ===========================
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill  = entry.target;
        const width = fill.getAttribute('data-width');
        fill.style.width = width + '%';
        skillObserver.unobserve(fill);
      }
    });
  },
  { threshold: 0.3 }
);

skillFills.forEach(fill => skillObserver.observe(fill));

// ===========================
// CONTACT FORM
// ===========================
function sendMessage(e) {
  e.preventDefault();
  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const status  = document.getElementById('form-status');

  if (!name || !email || !message) {
    status.style.color = '#fc814a';
    status.textContent = 'Please fill in all required fields.';
    return;
  }

  // Simulate sending (replace with your backend / EmailJS / Formspree)
  status.style.color = '#68d391';
  status.textContent = '✅ Message sent! I\'ll get back to you soon.';
  document.getElementById('contactForm').reset();

  setTimeout(() => { status.textContent = ''; }, 5000);
}

// ===========================
// SMOOTH SCROLL for all links
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===========================
// TYPING EFFECT (Hero title)
// ===========================
const titles = [
  'Java Full Stack Developer',
  'Spring Boot Specialist',
  'REST API Engineer',
  'Microservices Enthusiast'
];
let titleIdx = 0;
let charIdx  = 0;
let deleting = false;
const titleEl = document.querySelector('.hero-title');

function typeEffect() {
  const current = titles[titleIdx];
  if (!titleEl) return;

  if (!deleting) {
    titleEl.textContent = current.substring(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(typeEffect, 1800);
      return;
    }
  } else {
    titleEl.textContent = current.substring(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      deleting  = false;
      titleIdx  = (titleIdx + 1) % titles.length;
    }
  }
  setTimeout(typeEffect, deleting ? 50 : 90);
}

typeEffect();
