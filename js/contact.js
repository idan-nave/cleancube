document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        console.log('Form Submitted:', data);

        alert('Your request has been submitted successfully! Thank you for reaching out.');
        contactForm.reset();
    });
});
