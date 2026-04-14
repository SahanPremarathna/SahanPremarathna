/* ─────────────────────────────────────────
   SCROLL REVEAL
   Adds .reveal to target elements, then
   animates them in with staggered delay
   when they enter the viewport.
───────────────────────────────────────── */
const REVEAL_SELECTORS = [
  '.skill-card',
  '.project-card',
  '.cert-card',
  '.about__grid',
  '.contact__grid',
  '.section-title',
  '.section-label',
  '.about__stats',
  '.about__terminal',
].join(', ');

const STAGGER_MS  = 75;
const THRESHOLD   = 0.1;

const targets = document.querySelectorAll(REVEAL_SELECTORS);
targets.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    // Stagger siblings inside the same parent
    const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
    const idx      = siblings.indexOf(entry.target);

    setTimeout(() => {
      entry.target.classList.add('visible');
    }, idx * STAGGER_MS);

    observer.unobserve(entry.target);
  });
}, { threshold: THRESHOLD });

targets.forEach(el => observer.observe(el));
