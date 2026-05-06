
    let overallRating = 0;

    document.getElementById('starPicker').addEventListener('click', e => {
      if (!e.target.classList.contains('sp')) return;
      overallRating = +e.target.dataset.v;
      document.querySelectorAll('#starPicker .sp').forEach(s => {
        s.classList.toggle('active', +s.dataset.v <= overallRating);
      });
    });

    document.querySelectorAll('.mini-s').forEach(container => {
      container.addEventListener('click', e => {
        if (!e.target.classList.contains('ms')) return;
        const cat = e.target.dataset.cat;
        const val = +e.target.dataset.v;
        const box = document.getElementById('box-' + cat);
        if (box) box.classList.add('rated');
        container.querySelectorAll('.ms').forEach(s => {
          s.classList.toggle('active', +s.dataset.v <= val);
        });
      });
    });

    function submitReview() {
      const name = document.getElementById('uname').value.trim();
      const text = document.getElementById('revText').value.trim();
      if (!name || !text || overallRating === 0) {
        alert('Please fill in your name, select a rating, and write a review.');
        return;
      }
      document.getElementById('formWrap').style.display = 'none';
      document.getElementById('successWrap').style.display = 'block';
    }
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
// Mobile Menu Toggle Logic
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Switch between hamburger and X icon
        navToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });
}

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.textContent = '☰';
    });
});
