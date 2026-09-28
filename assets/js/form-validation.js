/* =========================================================
   Knowledge Resources — form-validation.js
   Client-side form validation
   ========================================================= */
(function () {
  'use strict';

  const forms = document.querySelectorAll('form[data-validate]');
  if (!forms.length) return;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[+0-9 ()-]{9,20}$/;

  function setError(field, message) {
    field.classList.add('is-invalid');
    const err = field.querySelector('.field__error');
    if (err) err.textContent = message || 'This field is required.';
  }
  function clearError(field) {
    field.classList.remove('is-invalid');
    const err = field.querySelector('.field__error');
    if (err) err.textContent = '';
  }

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      form.querySelectorAll('input, select, textarea').forEach(input => {
        const field = input.closest('.field');
        if (!field) return;
        const value = input.value.trim();

        if (input.required && !value) {
          setError(field, 'This field is required.');
          valid = false;
          return;
        }
        if (input.type === 'email' && value && !emailRegex.test(value)) {
          setError(field, 'Please enter a valid email address.');
          valid = false;
          return;
        }
        if (input.type === 'tel' && value && !phoneRegex.test(value)) {
          setError(field, 'Please enter a valid phone number.');
          valid = false;
          return;
        }
        clearError(field);
      });

      if (!valid) return;

      // Simulated submission
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending…';
      }

      setTimeout(() => {
        const success = form.querySelector('.form__success');
        if (success) {
          success.hidden = false;
          success.textContent = '✔ Thank you. Your message has been received — we will be in touch shortly.';
        }
        form.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }
      }, 900);
    });

    // Live clear on input
    form.querySelectorAll('input, select, textarea').forEach(input => {
      input.addEventListener('input', () => {
        const field = input.closest('.field');
        if (field) clearError(field);
      });
    });
  });
})();