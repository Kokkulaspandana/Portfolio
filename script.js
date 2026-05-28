window.history.scrollRestoration = "manual";

window.onload = () => {
  window.scrollTo(0, 0);
};
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
  '.about-card, .project-card, .skill-group'
);

revealEls.forEach(el =>  {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 150);  
        
      } else {

        entry.target.style.opacity = '0';
        entry.target.style.transform = 'translateY(30px)';

      }
    });
  },
  { threshold: 0.10 }
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

      const navbarHeight = 80;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.pageYOffset -
        navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
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
      titleEl.textContent = titles[titleIdx].substring(0, 1);
      charIdx = 1;
    }
  }
  setTimeout(typeEffect, deleting ? 50 : 90);
}

typeEffect();
const canvas = document.getElementById("smokeCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let t = 0;

function wave(yOffset, color, alpha, amp, freq, speed) {

    ctx.beginPath();

    for (let x = 0; x <= canvas.width; x++) {

        const y =
            yOffset +
            Math.sin(x * freq + t * speed) * amp;

        ctx.lineTo(x, y);
    }

    ctx.strokeStyle = color;
    ctx.globalAlpha = alpha;
    ctx.lineWidth = 3.0;

    ctx.shadowBlur = 50;
    ctx.shadowColor = color;

    ctx.stroke();
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    wave(
    canvas.height * 0.12,
    "rgba(123, 0, 255, 0.19)",
    0.4,
    40,
    0.012,
    0.4
);

wave(
    canvas.height * 0.20,
    "rgba(76, 0, 255, 0.25)",
    0.5,
    55,
    0.011,
    0.5
);

wave(
    canvas.height * 0.30,
    "rgba(34, 0, 255, 0.31)",
    0.6,
    70,
    0.010,
    0.7
);

wave(
    canvas.height * 0.40,
    "rgba(4, 0, 255, 0.27)",
    0.7,
    90,
    0.008,
    0.9
);

wave(
    canvas.height * 0.50,
    "rgba(0,100,255,0.25)",
    0.8,
    110,
    0.007,
    1.1
);

wave(
    canvas.height * 0.60,
    "rgba(100,50,255,0.22)",
    0.7,
    95,
    0.006,
    1.3
);

wave(
    canvas.height * 0.70,
    "rgba(212, 0, 255, 0.18)",
    0.6,
    75,
    0.009,
    1.5
);

wave(
    canvas.height * 0.80,
    "rgba(72, 0, 255, 0.15)",
    0.5,
    60,
    0.011,
    1.7
);

wave(
    canvas.height * 0.90,
    "rgba(0,120,255,0.12)",
    0.4,
    45,
    0.013,
    2.0
);
    t += 0.015;
    requestAnimationFrame(animate);
}

animate();
