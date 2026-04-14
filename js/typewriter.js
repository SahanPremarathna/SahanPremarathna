/* ─────────────────────────────────────────
   TYPEWRITER
───────────────────────────────────────── */
const PHRASES = [
  'Ethical Hacker',
  'Penetration Tester',
  'Security Researcher',
  'CTF Player',
  'Sampath Bank Intern',
  'Bug Hunter',
];

const TYPING_SPEED  = 85;   // ms per character (typing)
const ERASE_SPEED   = 45;   // ms per character (erasing)
const PAUSE_AFTER   = 2000; // ms to pause at full phrase

let phraseIndex = 0;
let charIndex   = 0;
let deleting    = false;

const el = document.getElementById('typewriter');

function tick() {
  const current = PHRASES[phraseIndex];

  if (!deleting) {
    el.textContent = current.slice(0, ++charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(tick, PAUSE_AFTER);
      return;
    }
  } else {
    el.textContent = current.slice(0, --charIndex);
    if (charIndex === 0) {
      deleting    = false;
      phraseIndex = (phraseIndex + 1) % PHRASES.length;
    }
  }

  setTimeout(tick, deleting ? ERASE_SPEED : TYPING_SPEED);
}

tick();
