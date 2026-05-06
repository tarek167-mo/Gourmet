// Toggle Mobile Menu
function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

// Notification system
function showNotification(msg) {
    let alertBox = document.getElementById('mainAlert');
    if (!alertBox) {
        alertBox = document.createElement('div');
        alertBox.id = 'mainAlert';
        Object.assign(alertBox.style, {
            position: 'fixed',
            top: '-100px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#D4A373',
            color: '#1a1208',
            padding: '15px 40px',
            zIndex: '2000',
            transition: '0.5s',
            textTransform: 'uppercase',
            fontSize: '11px',
            letterSpacing: '2px'
        });
        document.body.appendChild(alertBox);
    }
    alertBox.textContent = msg;
    alertBox.style.top = '20px';
    setTimeout(() => { alertBox.style.top = '-100px'; }, 3000);
}

// Login Check
function checkLoginBeforeReserve() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        window.location.href = 'reservation.html';
    } else {
        localStorage.setItem('redirectAfterLogin', 'reservation.html');
        showNotification("Please login to reserve a table");
        setTimeout(() => { window.location.href = 'login.html'; }, 1500);
    }
}

// Form Handlers
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = this.querySelector('button');
            btn.textContent = 'Sending...';
            setTimeout(() => {
                btn.textContent = 'Message Sent!';
                this.reset();
                setTimeout(() => btn.textContent = 'Send Message', 2000);
            }, 1500);
        });
    }
});