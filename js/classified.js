/* ─────────────────────────────────────────
   CLASSIFIED — Redacted reveals & access ref
───────────────────────────────────────── */

// ── Random access case reference in banner ──
const refEl = document.getElementById('acc-ref');
if (refEl) {
  const hex = () => Math.floor(Math.random() * 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
  refEl.textContent = `LK-${hex()}-${hex()}`;
}

// ── Hover-to-reveal redacted elements ──
document.querySelectorAll('.redacted[data-reveal]').forEach(el => {
  const original = el.textContent;
  const revealed = el.dataset.reveal;

  el.addEventListener('mouseenter', () => {
    el.textContent = revealed;
  });
  el.addEventListener('mouseleave', () => {
    el.textContent = original;
  });
});
