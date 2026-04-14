/* ─────────────────────────────────────────
   NAV — scroll state + mobile menu
───────────────────────────────────────── */

// ── Scroll shadow ──────────────────────
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ── Active link highlight ───────────────
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav__links a');

const sectionObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(l => l.style.color = '');
    const active = document.querySelector(`.nav__links a[href="#${entry.target.id}"]`);
    if (active) active.style.color = '#00ff88';
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObs.observe(s));

// ── Mobile burger ───────────────────────
const burger = document.getElementById('burger');
let menuOpen = false;

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
document.body.appendChild(mobileMenu);

// Inline styles for the mobile menu overlay
const style = document.createElement('style');
style.textContent = `
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
  .mobile-menu ul   { list-style: none; display: flex; flex-direction: column; gap: 4px; }
  .mobile-menu a {
    display: block; padding: 11px 14px;
    font-family: 'Fira Code', monospace; font-size: .9rem;
    color: #5a7a5a; border-radius: 6px;
    text-decoration: none;
    transition: background .2s, color .2s;
  }
  .mobile-menu a:hover { background: rgba(0,255,136,.08); color: #00ff88; }
`;
document.head.appendChild(style);

function setBurgerState(open) {
  const spans = burger.querySelectorAll('span');
  if (open) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
}

burger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
  setBurgerState(menuOpen);
});

mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    menuOpen = false;
    mobileMenu.classList.remove('open');
    setBurgerState(false);
  });
});
