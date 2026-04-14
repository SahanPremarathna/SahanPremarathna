/* ─────────────────────────────────────────
   LOGIN  —  Hacker access gate
   - Shows full-screen overlay on load
   - 30-second session token with live countdown
   - Token expiry re-locks the site
   Password: ULTRA  (hinted in the UI)
───────────────────────────────────────── */
(() => {
  /* ── Config ── */
  const CORRECT_TOKEN = 'ULTRA';
  const SESSION_SECS  = 30;        // token lifetime in seconds
  const WARN_AT       = 10;        // orange warning threshold
  const CRIT_AT       = 5;         // red/pulse threshold

  /* ── DOM refs ── */
  const overlay      = document.getElementById('login-overlay');
  const badge        = document.getElementById('token-badge');
  const badgeTime    = document.getElementById('badge-time');
  const expiredAlert = document.getElementById('login-expired');
  const barStatus    = document.getElementById('login-bar-status');
  const tokenInput   = document.getElementById('login-token');
  const loginForm    = document.getElementById('login-form');
  const loginError   = document.getElementById('login-error');
  const submitBtn    = document.getElementById('login-submit');
  const revealBtn    = document.getElementById('login-reveal');
  const revealOff    = document.getElementById('reveal-icon-off');
  const revealOn     = document.getElementById('reveal-icon-on');

  /* ── State ── */
  let countdownTimer = null;
  let secondsLeft    = SESSION_SECS;
  let sessionActive  = false;

  /* ── Helpers ── */
  function fmt(s) {
    const m = String(Math.floor(s / 60)).padStart(2, '0');
    const sec = String(s % 60).padStart(2, '0');
    return `${m}:${sec}`;
  }

  function clearCountdown() {
    if (countdownTimer) { clearInterval(countdownTimer); countdownTimer = null; }
  }

  /* ── Start session token countdown ── */
  function startSession() {
    sessionActive = true;
    secondsLeft   = SESSION_SECS;

    badge.style.display = 'flex';
    badgeTime.textContent = fmt(secondsLeft);
    badge.classList.remove('warning', 'critical');

    clearCountdown();
    countdownTimer = setInterval(() => {
      secondsLeft--;

      badgeTime.textContent = fmt(secondsLeft);

      if (secondsLeft <= CRIT_AT) {
        badge.classList.add('critical');
        badge.classList.remove('warning');
      } else if (secondsLeft <= WARN_AT) {
        badge.classList.add('warning');
        badge.classList.remove('critical');
      }

      if (secondsLeft <= 0) {
        clearCountdown();
        sessionActive = false;
        expireSession();
      }
    }, 1000);
  }

  /* ── Expire: re-lock the site ── */
  function expireSession() {
    badge.classList.remove('warning', 'critical');
    badge.style.display = 'none';

    /* flicker effect on body before overlay appears */
    document.body.style.animation = 'none';
    overlay.classList.add('login-overlay--flicker');

    setTimeout(() => {
      overlay.classList.remove('login-overlay--flicker');

      /* reset form state */
      tokenInput.value = CORRECT_TOKEN;
      loginError.classList.remove('show');
      tokenInput.closest('.login-field__row').classList.remove('error');
      submitBtn.disabled = false;
      submitBtn.textContent = '> AUTHENTICATE';

      /* show expired alert */
      expiredAlert.classList.add('show');

      /* update status bar */
      barStatus.textContent  = 'REVOKED';
      barStatus.classList.remove('ok');

      /* show overlay */
      overlay.style.display  = 'flex';
      overlay.style.opacity  = '1';
      overlay.style.pointerEvents = 'all';
      overlay.querySelector('.login-card').style.animation = 'card-in .45s cubic-bezier(.22,1,.36,1) both';

      tokenInput.focus();
    }, 300);
  }

  /* ── Grant access ── */
  function grantAccess() {
    barStatus.textContent = 'GRANTED';
    barStatus.classList.add('ok');
    submitBtn.textContent = '> ACCESS GRANTED';

    overlay.classList.add('login-overlay--granted');

    setTimeout(() => {
      overlay.style.display      = 'none';
      overlay.style.opacity      = '0';
      overlay.style.pointerEvents = 'none';
      overlay.classList.remove('login-overlay--granted');
      expiredAlert.classList.remove('show');

      startSession();
    }, 550);
  }

  /* ── Form submission ── */
  loginForm.addEventListener('submit', e => {
    e.preventDefault();

    const val = tokenInput.value.trim().toUpperCase();
    const row  = tokenInput.closest('.login-field__row');

    if (val === CORRECT_TOKEN) {
      submitBtn.disabled    = true;
      submitBtn.textContent = '> Verifying...';
      loginError.classList.remove('show');
      row.classList.remove('error');

      /* short artificial delay for authenticity */
      setTimeout(grantAccess, 600);
    } else {
      row.classList.remove('error');
      /* force reflow to restart animation */
      void row.offsetWidth;
      row.classList.add('error');
      loginError.classList.add('show');
      tokenInput.value = '';
      tokenInput.focus();
    }
  });

  /* ── Keyboard: Enter on input triggers form submit ── */
  tokenInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') loginForm.dispatchEvent(new Event('submit'));
  });

  /* ── Reveal / hide token toggle ── */
  revealBtn.addEventListener('click', () => {
    const isHidden = tokenInput.type === 'password';
    tokenInput.type     = isHidden ? 'text' : 'password';
    revealOff.style.display = isHidden ? 'none'  : '';
    revealOn.style.display  = isHidden ? ''      : 'none';
    tokenInput.focus();
  });

  /* ── Typing clears error state ── */
  tokenInput.addEventListener('input', () => {
    loginError.classList.remove('show');
    tokenInput.closest('.login-field__row').classList.remove('error');
  });

  /* ── Initial show on page load ── */
  overlay.style.display      = 'flex';
  overlay.style.opacity      = '1';
  overlay.style.pointerEvents = 'all';

  /* Pre-fill the token so the user just hits Enter */
  tokenInput.value = CORRECT_TOKEN;

  /* Stagger boot log lines for typewriter feel */
  const bootLines = overlay.querySelectorAll('.login-boot span');
  bootLines.forEach((line, i) => {
    line.style.opacity = '0';
    setTimeout(() => {
      line.style.transition = 'opacity .3s ease';
      line.style.opacity    = '1';
    }, i * 160);
  });

  setTimeout(() => tokenInput.focus(), 800);
})();
