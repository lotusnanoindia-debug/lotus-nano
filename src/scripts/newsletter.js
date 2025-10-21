// Global newsletter handler - runs once, handles all forms
if (!window.newsletterHandlerInitialized) {
  window.newsletterHandlerInitialized = true;

  document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('[data-newsletter-form]');

    forms.forEach((form) => {
      const timestampInput = form.querySelector('[name="timestamp"]');
      if (timestampInput) {
        timestampInput.value = Date.now();
      }

      form.addEventListener('submit', handleSubmit);
    });
  });

  async function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    const form = e.target;
    if (form.dataset.submitting === 'true') return;
    form.dataset.submitting = 'true';

    const formData = new FormData(form);
    const email = formData.get('email')?.trim();
    const source = form.dataset.source;
    const honeypot = formData.get('honeypot');
    const timestamp = parseInt(formData.get('timestamp'));

    const submitBtn = form.querySelector('[type="submit"]');
    const messageEl = document.getElementById(`msg-${form.id}`);
    const originalMsg = messageEl?.textContent || '';
    const originalBtnText = submitBtn?.textContent || 'Subscribe';

    if (!email || !email.includes('@')) {
      showMessage(
        messageEl,
        'Please enter a valid email',
        'error',
        originalMsg
      );
      form.dataset.submitting = 'false';
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Subscribing...';
    }

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source, honeypot, timestamp }),
      });

      const result = await response.json();

      if (response.ok) {
        showMessage(
          messageEl,
          'Successfully subscribed!',
          'success',
          originalMsg
        );
        form.reset();
        const ts = form.querySelector('[name="timestamp"]');
        if (ts) ts.value = Date.now();
      } else if (result.error === 'already_subscribed') {
        showMessage(
          messageEl,
          result.message || "You're already subscribed!",
          'info',
          null
        );
      } else {
        throw new Error(result.message || 'Subscription failed');
      }
    } catch (error) {
      console.error('Newsletter error:', error);
      showMessage(
        messageEl,
        'Something went wrong. Please try again.',
        'error',
        null
      );
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      }
      form.dataset.submitting = 'false';
    }
  }

  function showMessage(element, message, type, originalMessage) {
    if (!element) return;

    element.textContent = message;
    element.className = 'text-xs transition-colors duration-300';

    if (element.id.includes('intel')) {
      element.classList.add('mt-3');
    } else {
      element.classList.add('mt-2');
    }

    if (type === 'success') element.classList.add('text-green-500');
    else if (type === 'error') element.classList.add('text-red-400');
    else if (type === 'info') element.classList.add('text-blue-400');

    if (type === 'success' && originalMessage) {
      setTimeout(() => {
        element.textContent = originalMessage;
        element.className = 'text-xs text-stone-600';
        if (element.id.includes('intel')) element.classList.add('mt-3');
        else element.classList.add('mt-2');
      }, 5000);
    }
  }
}
