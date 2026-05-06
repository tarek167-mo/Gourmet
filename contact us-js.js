// 1. GLOBAL FUNCTIONS (Accessible by HTML onclick attributes)
function showNotification(msg) {
    // Create the alert element if it doesn't exist
    let alertBox = document.getElementById('mainAlert');
    if (!alertBox) {
        alertBox = document.createElement('div');
        alertBox.id = 'mainAlert';
        // Applying styles directly to match your theme
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

function checkLoginBeforeReserve() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn === 'true') {
        window.location.href = 'reservation.html';
    } else {
        // Remember the intent for the login page redirect logic
        localStorage.setItem('redirectAfterLogin', 'reservation.html');
        
        showNotification("Please login to reserve a table");
        setTimeout(() => { 
            window.location.href = 'login.html'; 
        }, 1500);
    }
}

// 2. DOM CONTENT LOADED (Internal page logic)
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); 
            this.reset();

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.backgroundColor = '#9B2226'; 
            submitBtn.style.borderColor = '#9B2226';
            submitBtn.style.color = '#F8F9FA'; 

            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.backgroundColor = 'transparent';
                submitBtn.style.borderColor = '#D4A373';
                submitBtn.style.color = '#D4A373';
            }, 3000);
        });
    }
});