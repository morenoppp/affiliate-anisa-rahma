/**
 * AFFILIATE BY ANISA - MAIN JAVASCRIPT
 * Interactive functionality, Smooth Animations, Video Modal, Accordion & WhatsApp Integration
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileMenu();
  initScrollSpy();
  initFaqAccordion();
  initScrollReveal();
  initNumberCounters();
  initVideoModal();
  initImageLightbox();
  initWhatsAppButtons();
});

/* --------------------------------------------------------------------------
   1. NAVBAR SCROLL EFFECT & SCROLL SPY
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
  const header = document.querySelector('.header-wrapper');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* --------------------------------------------------------------------------
   2. MOBILE MENU DRAWER TOGGLE
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.nav-mobile-toggle');
  const drawer = document.querySelector('.mobile-menu-drawer');
  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    drawer.classList.toggle('open');
    const icon = toggleBtn.querySelector('.material-symbols-outlined');
    if (icon) {
      icon.textContent = drawer.classList.contains('open') ? 'close' : 'menu';
    }
  });

  // Close drawer on link click
  const drawerLinks = drawer.querySelectorAll('a');
  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      const icon = toggleBtn.querySelector('.material-symbols-outlined');
      if (icon) icon.textContent = 'menu';
    });
  });

  // Close drawer on outside click
  document.addEventListener('click', (e) => {
    if (!drawer.contains(e.target) && !toggleBtn.contains(e.target)) {
      drawer.classList.remove('open');
      const icon = toggleBtn.querySelector('.material-symbols-outlined');
      if (icon) icon.textContent = 'menu';
    }
  });
}

/* --------------------------------------------------------------------------
   3. FAQ ACCORDION INTERACTIVITY
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other accordion items for clean UX
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });

      // Toggle current item
      if (isActive) {
        item.classList.remove('active');
      } else {
        item.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   4. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));
}

/* --------------------------------------------------------------------------
   5. NUMBER COUNTER ANIMATION
   -------------------------------------------------------------------------- */
function initNumberCounters() {
  const counters = document.querySelectorAll('[data-counter-target]');
  if (!counters.length) return;

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-counter-target'));
        const prefix = el.getAttribute('data-counter-prefix') || '';
        const suffix = el.getAttribute('data-counter-suffix') || '';
        const duration = parseInt(el.getAttribute('data-counter-duration') || '1500', 10);
        const decimals = parseInt(el.getAttribute('data-counter-decimals') || '0', 10);

        animateValue(el, 0, target, duration, prefix, suffix, decimals);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.2 });

  counters.forEach(counter => counterObserver.observe(counter));
}

function animateValue(obj, start, end, duration, prefix, suffix, decimals) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    // Ease out cubic
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    const currentVal = (start + (end - start) * easeProgress);

    let formattedNum;
    if (decimals > 0) {
      formattedNum = currentVal.toLocaleString('id-ID', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    } else {
      formattedNum = Math.floor(currentVal).toLocaleString('id-ID');
    }

    obj.innerHTML = `${prefix}${formattedNum}${suffix}`;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

/* --------------------------------------------------------------------------
   6. VIDEO MODAL PLAYER
   -------------------------------------------------------------------------- */
function initVideoModal() {
  const modalOverlay = document.getElementById('video-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const modalVideoContainer = document.getElementById('modal-video-container');
  const openButtons = document.querySelectorAll('[data-video-open]');

  if (!modalOverlay || !closeBtn || !modalVideoContainer) return;

  const openModal = (videoTitle, videoId = 'NWuDF6AIxEI') => {
    modalVideoContainer.innerHTML = `
      <iframe
        src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0"
        title="${videoTitle || 'Video pembuktian Affiliate by Anisa'}"
        style="width:100%; height:100%; border:0;"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowfullscreen>
      </iframe>
    `;
    modalOverlay.classList.add('active');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modalOverlay.classList.remove('active');
    modalOverlay.setAttribute('aria-hidden', 'true');
    modalVideoContainer.innerHTML = '';
    document.body.style.overflow = '';
  };

  openButtons.forEach(btn => {
    const handleOpen = (e) => {
      e.preventDefault();
      const title = btn.getAttribute('data-video-title');
      const videoId = btn.getAttribute('data-video-id') || 'NWuDF6AIxEI';
      openModal(title, videoId);
    };

    btn.addEventListener('click', handleOpen);
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        handleOpen(e);
      }
    });
  });

  closeBtn.addEventListener('click', closeModal);

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   7. DIRECT WHATSAPP ORDER / INQUIRY LINK GENERATOR
   -------------------------------------------------------------------------- */
function initWhatsAppButtons() {
  const waPhone = '6285742001335';

  const waButtons = document.querySelectorAll('[data-wa-package]');
  waButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const packageName = btn.getAttribute('data-wa-package');
      const price = btn.getAttribute('data-wa-price') || '';
      
      const text = `Halo Kak Anisa, saya tertarik untuk mendaftar *${packageName}* (${price}). Boleh minta info cara pendaftaran dan rekening pembayarannya? Terima kasih!`;
      const encodedText = encodeURIComponent(text);
      const url = `https://wa.me/${waPhone}?text=${encodedText}`;
      
      window.open(url, '_blank');
    });
  });

  // General consultation button
  const generalWaBtns = document.querySelectorAll('[data-wa-consult]');
  generalWaBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const text = `Halo Kak Anisa, saya mau konsultasi program kelas Affiliate Shopee Tanpa Ngonten.`;
      const encodedText = encodeURIComponent(text);
      const url = `https://wa.me/${waPhone}?text=${encodedText}`;
      window.open(url, '_blank');
    });
  });
}

/* --------------------------------------------------------------------------
   8. IMAGE LIGHTBOX (LIQUID GLASS)
   -------------------------------------------------------------------------- */
function initImageLightbox() {
  const lightboxOverlay = document.getElementById('image-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.getElementById('lightbox-close-btn');
  const zoomableImages = document.querySelectorAll('[data-zoomable]');

  if (!lightboxOverlay || !lightboxImg || !closeBtn) return;

  const openLightbox = (imgSrc) => {
    lightboxImg.src = imgSrc;
    lightboxOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightboxOverlay.classList.remove('active');
    setTimeout(() => { lightboxImg.src = ''; }, 300); // Clear image after transition
    document.body.style.overflow = '';
  };

  zoomableImages.forEach(img => {
    img.addEventListener('click', () => {
      openLightbox(img.src);
    });
  });

  closeBtn.addEventListener('click', closeLightbox);

  lightboxOverlay.addEventListener('click', (e) => {
    if (e.target === lightboxOverlay) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxOverlay.classList.contains('active')) {
      closeLightbox();
    }
  });
}
