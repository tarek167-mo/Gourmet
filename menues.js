/* ═══════════════════════════════════════════════════════════════
   AURUM Fine Dining — script.js
   Handles: navbar scroll · category filter · card animations
            · "View Details" modal
═══════════════════════════════════════════════════════════════ */

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

document.addEventListener('DOMContentLoaded', () => {

    /* ── 1. Navbar: shrink on scroll ─────────────────────────── */
    const navbar = document.getElementById('navbar');
    const onScroll = () =>
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
  
  
    /* ── 2. Mobile nav toggle ────────────────────────────────── */
    const navToggle = document.getElementById('navToggle');
    const navLinks  = document.querySelector('.nav-links');
    navToggle?.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    // Close if a link is tapped
    navLinks?.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => navLinks.classList.remove('open'))
    );
  
  
    /* ── 3. Category filter ──────────────────────────────────── */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const menuCards  = document.querySelectorAll('.menu-card');
  
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active state
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
  
        const filter = btn.dataset.filter;
  
        menuCards.forEach((card, i) => {
          const match = filter === 'all' || card.dataset.category === filter;
  
          if (match) {
            card.classList.remove('hidden');
            card.style.transitionDelay = `${i * 0.045}s`;
            // Force reflow then add visible
            requestAnimationFrame(() => {
              requestAnimationFrame(() => card.classList.add('visible'));
            });
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  
  
    /* ── 4. Intersection Observer: animate cards on scroll ───── */
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const card  = entry.target;
            const index = [...menuCards].indexOf(card);
            card.style.transitionDelay = `${(index % 4) * 0.08}s`;
            card.classList.add('visible');
            observer.unobserve(card);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -30px 0px' }
    );
    menuCards.forEach(card => observer.observe(card));
  
    /* Fallback: make all cards visible after 800ms in case observer
       never fires (e.g. page already scrolled past them on load) */
    setTimeout(() => {
      menuCards.forEach((card, i) => {
        if (!card.classList.contains('visible') && !card.classList.contains('hidden')) {
          card.style.transitionDelay = `${(i % 4) * 0.08}s`;
          card.classList.add('visible');
        }
      });
    }, 300);
  
  
    /* ── 5. View Details Modal ───────────────────────────────── */
    const overlay    = document.getElementById('modalOverlay');
    const modal      = document.getElementById('modal');
    const modalClose = document.getElementById('modalClose');
  
    // Elements to populate
    const modalImg   = document.getElementById('modalImg');
    const modalName  = document.getElementById('modalName');
    const modalDesc  = document.getElementById('modalDesc');
    const modalPrice = document.getElementById('modalPrice');
    const modalTags  = document.getElementById('modalTags');
  
    function openModal(btn) {
      // Populate modal from data attributes
      modalImg.src          = btn.dataset.img   || '';
      modalImg.alt          = btn.dataset.name  || '';
      modalName.textContent = btn.dataset.name  || '';
      modalDesc.textContent = btn.dataset.desc  || '';
      modalPrice.textContent= btn.dataset.price || '';
  
      // Build tags as spaced dots
      const rawTags = (btn.dataset.tags || '').split('·').map(t => t.trim()).filter(Boolean);
      modalTags.innerHTML = rawTags
        .map(t => `<span>${t}</span>`)
        .join(' <span style="opacity:.4">·</span> ');
  
      // Show
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  
    function closeModal() {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  
    // Attach to all View Details buttons
    document.querySelectorAll('.btn-details').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation(); // don't bubble to card
        openModal(btn);
      });
    });
  
    // Also allow clicking the whole card to open modal
    menuCards.forEach(card => {
      card.addEventListener('click', () => {
        const btn = card.querySelector('.btn-details');
        if (btn) openModal(btn);
      });
    });
  
    // Close via × button
    modalClose.addEventListener('click', closeModal);
  
    // Close via overlay click (outside modal box)
    overlay.addEventListener('click', (e) => {
      if (!modal.contains(e.target)) closeModal();
    });
  
    // Close via Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  
  });