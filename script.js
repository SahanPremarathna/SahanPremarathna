/* ─────────────────────────────────────────
   MATRIX RAIN
───────────────────────────────────────── */
const canvas  = document.getElementById('matrix');
const ctx     = canvas.getContext('2d');
const chars   = 'アイウエオカキクケコサシスセソタチツテトナニヌネノABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,./<>?';
let cols, drops;
const fontSize = 14;

function initMatrix() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  cols  = Math.floor(canvas.width / fontSize);
  drops = Array(cols).fill(1);
}

function drawMatrix() {
  ctx.fillStyle = 'rgba(6,9,16,0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#00ff88';
  ctx.font      = `${fontSize}px 'Fira Code', monospace`;

  for (let i = 0; i < drops.length; i++) {
    const ch = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(ch, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
}

initMatrix();
setInterval(drawMatrix, 50);
window.addEventListener('resize', initMatrix);

/* ─────────────────────────────────────────
   TYPEWRITER
───────────────────────────────────────── */
const phrases = [
  'Ethical Hacker',
  'Penetration Tester',
  'Security Researcher',
  'CTF Player',
  'Sampath Bank Intern',
  'Bug Hunter',
];

let phraseIndex = 0, charIndex = 0, deleting = false;
const el = document.getElementById('typewriter');

function type() {
  const current = phrases[phraseIndex];
  if (!deleting) {
    el.textContent = current.slice(0, ++charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(type, 2000);
      return;
    }
  } else {
    el.textContent = current.slice(0, --charIndex);
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }
  setTimeout(type, deleting ? 45 : 85);
}
type();

/* ─────────────────────────────────────────
   NAV SCROLL
───────────────────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ─────────────────────────────────────────
   MOBILE MENU
───────────────────────────────────────── */
const burger     = document.getElementById('burger');
let   menuOpen   = false;

const mobileMenu = document.createElement('div');
mobileMenu.className = 'mobile-menu';
mobileMenu.innerHTML = `
  <ul>
    <li><a href="#about">about</a></li>
    <li><a href="#skills">skills</a></li>
    <li><a href="#projects">projects</a></li>
    <li><a href="#certs">certs</a></li>
    <li><a href="#contact">contact</a></li>
  </ul>
`;

const mStyle = document.createElement('style');
mStyle.textContent = `
  .mobile-menu {
    position: fixed; top: 64px; left: 0; right: 0; z-index: 99;
    background: rgba(6,9,16,.97);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(0,255,136,.1);
    padding: 20px;
    transform: translateY(-110%);
    transition: transform .3s ease;
  }
  .mobile-menu.open { transform: translateY(0); }
  .mobile-menu ul   { display: flex; flex-direction: column; gap: 4px; list-style: none; }
  .mobile-menu a {
    display: block; padding: 11px 14px;
    font-family: 'Fira Code', monospace;
    font-size: .9rem;
    color: #5a7a5a;
    border-radius: 6px;
    transition: background .2s, color .2s;
    text-decoration: none;
  }
  .mobile-menu a:hover { background: rgba(0,255,136,.08); color: #00ff88; }
`;
document.head.appendChild(mStyle);
document.body.appendChild(mobileMenu);

burger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
  const spans = burger.querySelectorAll('span');
  if (menuOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    menuOpen = false;
    mobileMenu.classList.remove('open');
    burger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

/* ─────────────────────────────────────────
   SCROLL REVEAL
───────────────────────────────────────── */
const revealEls = document.querySelectorAll(
  '.skill-card, .project-card, .cert-card, .about__grid, .contact__grid, ' +
  '.section-title, .section-label, .about__stats, .about__terminal'
);
revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
    const idx      = siblings.indexOf(entry.target);
    setTimeout(() => entry.target.classList.add('visible'), idx * 75);
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.1 });

revealEls.forEach(el => revealObserver.observe(el));

/* ─────────────────────────────────────────
   ACTIVE NAV HIGHLIGHT
───────────────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__links a');

const sectionObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.style.color = '');
      const active = document.querySelector(`.nav__links a[href="#${entry.target.id}"]`);
      if (active) active.style.color = '#00ff88';
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObs.observe(s));

/* ─────────────────────────────────────────
   CONTACT FORM
───────────────────────────────────────── */
function handleSubmit(e) {
  e.preventDefault();
  const btn     = e.target.querySelector('button[type="submit"]');
  const success = document.getElementById('form-success');

  btn.textContent = '> Sending...';
  btn.disabled    = true;

  setTimeout(() => {
    success.style.display = 'block';
    success.textContent   = '> Message sent successfully. I\'ll get back to you shortly.';
    e.target.reset();
    btn.textContent = '> Send Message';
    btn.disabled    = false;
    setTimeout(() => { success.style.display = 'none'; }, 5000);
  }, 1200);
}

/* ─────────────────────────────────────────
   GLITCH EFFECT on hero name (subtle)
───────────────────────────────────────── */
const heroName = document.querySelector('.hero__name');
if (heroName) {
  setInterval(() => {
    if (Math.random() > 0.94) {
      heroName.style.textShadow = `2px 0 #00ff88, -2px 0 #00c8ff`;
      setTimeout(() => { heroName.style.textShadow = ''; }, 100);
    }
  }, 2000);
}
