/* ─────────────────────────────────────────
   CONTACT FORM
───────────────────────────────────────── */
function handleSubmit(e) {
  e.preventDefault();

  const btn     = e.target.querySelector('button[type="submit"]');
  const success = document.getElementById('form-success');
  const original = btn.textContent;

  btn.textContent = '> Sending...';
  btn.disabled    = true;

  // Replace with a real API call (e.g. EmailJS / Formspree)
  setTimeout(() => {
    success.style.display = 'block';
    success.textContent   = '> Message sent. I\'ll get back to you shortly.';
    e.target.reset();
    btn.textContent = original;
    btn.disabled    = false;
    setTimeout(() => { success.style.display = 'none'; }, 5000);
  }, 1200);
}
