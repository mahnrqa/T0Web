// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
toggle?.addEventListener('click', () => {
  if (!nav) return;
  const open = getComputedStyle(nav).display !== 'none';
  nav.style.display = open ? 'none' : 'flex';
});

// Smooth anchor scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (!id || id === '#') return;
    const el = document.querySelector(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Review navigation (since we're using grid layout, just highlight active review)
(function () {
  const reviews = document.querySelectorAll('.review');
  const prev = document.querySelector('.review-controls .prev');
  const next = document.querySelector('.review-controls .next');
  if (!reviews.length || !prev || !next) return;
  
  let currentIndex = 0;
  
  function updateActiveReview() {
    reviews.forEach((review, index) => {
      if (index === currentIndex) {
        review.style.opacity = '1';
        review.style.transform = 'translateY(-3px) scale(1.02)';
      } else {
        review.style.opacity = '0.6';
        review.style.transform = 'translateY(0) scale(1)';
      }
    });
    
    // Update button states
    prev.disabled = currentIndex === 0;
    next.disabled = currentIndex === reviews.length - 1;
    
    prev.style.opacity = currentIndex === 0 ? '0.5' : '1';
    next.style.opacity = currentIndex === reviews.length - 1 ? '0.5' : '1';
  }
  
  function go(dir) {
    currentIndex = Math.max(0, Math.min(reviews.length - 1, currentIndex + dir));
    updateActiveReview();
  }
  
  prev.addEventListener('click', () => go(-1));
  next.addEventListener('click', () => go(1));
  
  // Initialize
  updateActiveReview();
})();