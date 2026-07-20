document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form[name="aarca-enquiry"]');
  if (!form) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = new URLSearchParams();

    for (const [key, value] of formData.entries()) {
      data.append(key, value);
    }

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: data,
      });

      if (response.ok) {
        window.location.href = '/success.html';
      } else {
        const result = await response.json();
        alert(result.error || 'Unable to submit the form. Please try again.');
      }
    } catch (error) {
      console.error('Form submission failed:', error);
      alert('A network error occurred. Please try again later.');
    }
  });
});
