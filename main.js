    // Inisialisasi AOS
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle) {
      menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show');
      });
    }

    // Close menu when clicking a link
    document.querySelectorAll('#navMenu a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('show');
      });
    });

    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });

      document.querySelectorAll('#navMenu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });

    // Scroll to Top Button
    const scrollTopBtn = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        scrollTopBtn.style.display = 'flex';
      } else {
        scrollTopBtn.style.display = 'none';
      }
    });

    function scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

// ===== LIGHTBOX FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('lightboxModal');
  const modalImg = document.getElementById('lightboxImage');
  const captionText = document.getElementById('lightboxCaption');
  const closeBtn = document.querySelector('.lightbox-close');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');
  
  const galleryItems = document.querySelectorAll('.model-item');
  let currentIndex = 0;
  
  // Kumpulkan semua sumber gambar
  const images = [];
  galleryItems.forEach((item, index) => {
    const imgSrc = item.getAttribute('data-src') || item.querySelector('img').src;
    const imgCaption = item.getAttribute('data-caption') || item.querySelector('img').alt || 'Model Batik';
    
    images.push({
      src: imgSrc,
      caption: imgCaption,
      element: item
    });
    
    // Tambahkan event listener ke setiap item
    item.addEventListener('click', function() {
      currentIndex = index;
      openLightbox(currentIndex);
    });
  });
  
  // Fungsi membuka lightbox
  function openLightbox(index) {
    if (!modal || !modalImg) return;
    
    modal.classList.add('show');
    modalImg.src = images[index].src;
    captionText.textContent = images[index].caption;
    document.body.style.overflow = 'hidden'; // Mencegah scroll
  }
  
  // Fungsi menutup lightbox
  function closeLightbox() {
    modal.classList.remove('show');
    document.body.style.overflow = ''; // Kembalikan scroll
  }
  
  // Fungsi navigasi
  function navigateLightbox(direction) {
    currentIndex = (currentIndex + direction + images.length) % images.length;
    modalImg.src = images[currentIndex].src;
    captionText.textContent = images[currentIndex].caption;
  }
  
  // Event listeners
  if (closeBtn) {
    closeBtn.addEventListener('click', closeLightbox);
  }
  
  if (prevBtn) {
    prevBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      navigateLightbox(-1);
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      navigateLightbox(1);
    });
  }
  
  // Klik di luar gambar untuk menutup
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeLightbox();
    }
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (!modal.classList.contains('show')) return;
    
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      navigateLightbox(-1);
    } else if (e.key === 'ArrowRight') {
      navigateLightbox(1);
    }
  });
});