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

// ===========================
// LIQUID ETHER — Blue cursor effect
// ===========================
(function () {
  const canvas = document.getElementById('ethCanvas');
  if (!canvas) return;
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if (!gl) { return; }

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);
  }
  window.addEventListener('resize', resize);
  resize();

  const VS = `attribute vec2 a_pos; void main(){ gl_Position=vec4(a_pos,0.,1.); }`;

  const FS = `
    precision highp float;
    uniform vec2  u_res;
    uniform float u_time;
    uniform vec2  u_mouse;
    uniform float u_active;

    vec2 hash2(vec2 p){
      p=vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3)));
      return -1.0+2.0*fract(sin(p)*43758.5453123);
    }
    float sn(vec2 p){
      const float K1=0.366025404,K2=0.211324865;
      vec2 i=floor(p+(p.x+p.y)*K1);
      vec2 a=p-i+(i.x+i.y)*K2;
      vec2 o=(a.x>a.y)?vec2(1.,0.):vec2(0.,1.);
      vec2 b=a-o+K2, c=a-1.0+2.0*K2;
      vec3 h=max(0.5-vec3(dot(a,a),dot(b,b),dot(c,c)),0.);
      vec3 n=h*h*h*h*vec3(dot(a,hash2(i)),dot(b,hash2(i+o)),dot(c,hash2(i+1.)));
      return dot(n,vec3(70.));
    }
    float fbm(vec2 p){
      float v=0.,a=.5;
      for(int i=0;i<6;i++){v+=a*sn(p);p=p*2.1+vec2(1.7,9.2);a*=.5;}
      return v;
    }
    void main(){
      vec2 uv=gl_FragCoord.xy/u_res;
      uv.y=1.0-uv.y;
      float dist=length(uv-u_mouse);

      /* Circular mask — liquid only near cursor */
      float mask=smoothstep(0.22,0.03,dist);
      mask=mask*mask*(3.0-2.0*mask);
      mask*=u_active;

      vec3 bg=vec3(0.024,0.024,0.040);
      float t=u_time*0.22;

      vec2 pull=(u_mouse-uv)*mask*0.45;
      vec2 p=(uv+pull)*2.8;

      vec2 q=vec2(fbm(p+t),fbm(p+vec2(6.2,1.3)+t*0.9));
      vec2 r=vec2(fbm(p+2.0*q+vec2(1.7,9.2)+t*0.6),
                  fbm(p+2.0*q+vec2(8.3,2.8)+t*0.5));
      float f=fbm(p+2.5*r+t*0.35);
      f=0.5+0.5*f;
      f=clamp(f,0.0,1.0);

      /* Blue palette */
      vec3 col=mix(vec3(0.01,0.02,0.10),vec3(0.02,0.08,0.30),smoothstep(0.0,0.5,f));
      col=mix(col,vec3(0.04,0.20,0.65),smoothstep(0.35,0.65,f));
      col=mix(col,vec3(0.10,0.45,0.95),smoothstep(0.55,0.80,f));
      col=mix(col,vec3(0.55,0.82,1.00),smoothstep(0.75,0.96,f));

      /* Bright core at cursor */
      float core=smoothstep(0.07,0.0,dist)*u_active;
      col+=vec3(0.18,0.45,0.95)*core*0.7;
      col+=vec3(0.55,0.75,1.00)*core*core*0.35;

      col=mix(bg,col,mask);

      float vig=1.0-0.45*pow(length(uv-0.5)*1.7,2.0);
      col*=vig;

      gl_FragColor=vec4(col,mask*0.55);
    }
  `;

  function mkShader(type,src){
    const s=gl.createShader(type);
    gl.shaderSource(s,src); gl.compileShader(s); return s;
  }
  const prog=gl.createProgram();
  gl.attachShader(prog,mkShader(gl.VERTEX_SHADER,VS));
  gl.attachShader(prog,mkShader(gl.FRAGMENT_SHADER,FS));
  gl.linkProgram(prog); gl.useProgram(prog);

  const buf=gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER,buf);
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
  const aPos=gl.getAttribLocation(prog,'a_pos');
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos,2,gl.FLOAT,false,0,0);

  const uRes=gl.getUniformLocation(prog,'u_res');
  const uTime=gl.getUniformLocation(prog,'u_time');
  const uMouse=gl.getUniformLocation(prog,'u_mouse');
  const uActive=gl.getUniformLocation(prog,'u_active');

  let tx=0.5,ty=0.5,sx=0.5,sy=0.5,active=0,tActive=0;

  const hero=document.getElementById('home');
  hero.addEventListener('mouseenter',()=>{tActive=1;});
  hero.addEventListener('mouseleave',()=>{tActive=0;});
  hero.addEventListener('mousemove',e=>{
    const r=hero.getBoundingClientRect();
    tx=(e.clientX-r.left)/r.width;
    ty=(e.clientY-r.top)/r.height;
  });
  hero.addEventListener('touchmove',e=>{
    e.preventDefault();
    const r=hero.getBoundingClientRect();
    tx=(e.touches[0].clientX-r.left)/r.width;
    ty=(e.touches[0].clientY-r.top)/r.height;
    tActive=1;
  },{passive:false});
  hero.addEventListener('touchend',()=>{tActive=0;});

  let start=null;
  function frame(ts){
    if(!start)start=ts;
    const t=(ts-start)*0.001;
    sx+=(tx-sx)*0.05; sy+=(ty-sy)*0.05;
    active+=(tActive-active)*0.05;
    resize();
    gl.uniform2f(uRes,canvas.width,canvas.height);
    gl.uniform1f(uTime,t);
    gl.uniform2f(uMouse,sx,sy);
    gl.uniform1f(uActive,active);
    gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();