// ===========================================================
// Usman Dental Studio — script.js
// ===========================================================

// ---------- Signature Feature: Animated stats counter ----------
// Numbers count up only when the stats section scrolls into view.
const statEls = document.querySelectorAll('.uds-stat');

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const target = +entry.target.dataset.target;
      const suffix = entry.target.dataset.suffix || '+';
      let count = 0;
      const step = Math.max(1, Math.ceil(target / 60));

      const timer = setInterval(() => {
        count += step;
        if (count >= target) {
          entry.target.textContent = target + suffix;
          clearInterval(timer);
        } else {
          entry.target.textContent = count + suffix;
        }
      }, 25);

      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statEls.forEach((el) => statsObserver.observe(el));


// ---------- Signature Feature: Before & After compare slider ----------
// Each .uds-compare block has a hidden range input driving a clip-path.
document.querySelectorAll('.uds-compare').forEach((compareEl) => {
  const range = compareEl.querySelector('.uds-compare-range');
  const beforeLayer = compareEl.querySelector('.uds-compare-before');
  const handle = compareEl.querySelector('.uds-compare-handle');

  function updateSlider(value) {
    beforeLayer.style.clipPath = `inset(0 ${100 - value}% 0 0)`;
    handle.style.left = value + '%';
  }

  range.addEventListener('input', (e) => updateSlider(e.target.value));

  // Allow dragging anywhere on the image, not just on the invisible range input
  let dragging = false;
  compareEl.addEventListener('pointerdown', () => { dragging = true; });
  window.addEventListener('pointerup', () => { dragging = false; });
  compareEl.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const rect = compareEl.getBoundingClientRect();
    let percent = ((e.clientX - rect.left) / rect.width) * 100;
    percent = Math.min(100, Math.max(0, percent));
    range.value = percent;
    updateSlider(percent);
  });

  updateSlider(range.value);
});


// ---------- Appointment form validation ----------
const appointmentForm = document.getElementById('appointmentForm');

if (appointmentForm) {
  appointmentForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('patientName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const date = document.getElementById('apptDate').value;
    const time = document.getElementById('apptTime').value;

    const phoneOK = /^[0-9+\-\s]{7,15}$/.test(phone);
    const errorBox = document.getElementById('formError');
    const successBox = document.getElementById('formSuccess');

    if (!name || !phoneOK || !date || !time) {
      errorBox.classList.remove('d-none');
      successBox.classList.add('d-none');
      return;
    }

    errorBox.classList.add('d-none');
    successBox.classList.remove('d-none');
    appointmentForm.reset();
  });
}

// ---------- Prevent selecting a date in the past ----------
const apptDateInput = document.getElementById('apptDate');
if (apptDateInput) {
  const today = new Date().toISOString().split('T')[0];
  apptDateInput.setAttribute('min', today);
}

// ---------- Close mobile nav after clicking a link ----------
document.querySelectorAll('#mainNav .nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    const nav = document.getElementById('mainNav');
    if (nav.classList.contains('show')) {
      bootstrap.Collapse.getOrCreateInstance(nav).hide();
    }
  });
});
