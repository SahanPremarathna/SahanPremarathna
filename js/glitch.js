/* ─────────────────────────────────────────
   GLITCH EFFECT
   Randomly applies a brief RGB-split shadow
   on the hero name to simulate a glitch.
───────────────────────────────────────── */
const GLITCH_INTERVAL = 2000; // ms between checks
const GLITCH_CHANCE   = 0.06; // probability per tick
const GLITCH_DURATION = 100;  // ms the glitch lasts

const heroName = document.querySelector('.hero__name');

if (heroName) {
  setInterval(() => {
    if (Math.random() > 1 - GLITCH_CHANCE) {
      heroName.style.textShadow = '2px 0 #00ff88, -2px 0 #00c8ff';
      setTimeout(() => {
        heroName.style.textShadow = '';
      }, GLITCH_DURATION);
    }
  }, GLITCH_INTERVAL);
}
