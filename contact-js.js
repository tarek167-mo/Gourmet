document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            // Toggle the menu visibility[cite: 21, 22]
            navLinks.classList.toggle('active');
        });
    }

    // Form Handling[cite: 21]
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert("Message Sent!");
            contactForm.reset();
        });
    }
});
