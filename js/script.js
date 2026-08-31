// ===========================================================
// Clearwater Dental — script.js
// ===========================================================

// ---------- Signature Feature: Animated stats counter ----------
const statEls = document.querySelectorAll('.clw-stat');

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

// ---------- Set minimum date on the appointment date picker to today ----------
const apptDateInput = document.getElementById('apptDate');
if (apptDateInput) {
  const today = new Date().toISOString().split('T')[0];
  apptDateInput.setAttribute('min', today);
}

// ---------- Smooth-close mobile nav after clicking a link ----------
document.querySelectorAll('#mainNav .nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    const nav = document.getElementById('mainNav');
    if (nav.classList.contains('show')) {
      bootstrap.Collapse.getOrCreateInstance(nav).hide();
    }
  });
});
