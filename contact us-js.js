document.addEventListener('DOMContentLoaded', () => {
    // Find the contact form on the page
    const contactForm = document.querySelector('.contact-form');

    // Make sure the form exists before running the code
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            // 1. Prevent the page from instantly refreshing
            event.preventDefault(); 

            // 2. Reset all the text boxes to blank
            this.reset();

            // 3. Give the user a premium visual confirmation
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Change button to look like a success message
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.backgroundColor = '#9B2226'; // Your gold Accent color
            submitBtn.style.borderColor = '#9B2226';
            submitBtn.style.color = '#F8F9FA'; // White text

            // 4. Revert the button back to normal after 3 seconds
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.backgroundColor = 'transparent';
                submitBtn.style.borderColor = '#D4A373';
                submitBtn.style.color = '#D4A373';
            }, 3000);
        });
    }
});