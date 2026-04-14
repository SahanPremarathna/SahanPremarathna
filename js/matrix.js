/* ─────────────────────────────────────────
   MATRIX RAIN
───────────────────────────────────────── */
const canvas = document.getElementById('matrix');
const ctx    = canvas.getContext('2d');

const CHARS    = 'アイウエオカキクケコサシスセソタチツテトABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,./<>?';
const FONTSIZE = 14;

let cols, drops;

function init() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  cols  = Math.floor(canvas.width / FONTSIZE);
  drops = Array(cols).fill(1);
}

function draw() {
  ctx.fillStyle = 'rgba(6,9,16,0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#00ff88';
  ctx.font      = `${FONTSIZE}px 'Fira Code', monospace`;

  for (let i = 0; i < drops.length; i++) {
    const ch = CHARS[Math.floor(Math.random() * CHARS.length)];
    ctx.fillText(ch, i * FONTSIZE, drops[i] * FONTSIZE);
    if (drops[i] * FONTSIZE > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

init();
setInterval(draw, 50);
window.addEventListener('resize', init);
