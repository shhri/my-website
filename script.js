// Krishna Tiles - Inspired by NITCO.in
// Custom JS for navigation and stats animation

document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('nav.nav-links');
  menuToggle.addEventListener('click', function() {
    navLinks.classList.toggle('active');
  });

  // Header transparency on scroll
  const header = document.querySelector('header');
  function handleHeaderScroll() {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleHeaderScroll);
  handleHeaderScroll();

  // Stats counter animation
  const statValues = document.querySelectorAll('.stat-value');
  const animateStats = () => {
    statValues.forEach(stat => {
      const endValue = parseInt(stat.getAttribute('data-value'), 10);
      let current = 0;
      const duration = 1200;
      const step = Math.ceil(endValue / (duration / 16));
      const update = () => {
        current += step;
        if (current > endValue) current = endValue;
        stat.textContent = current.toLocaleString();
        if (current < endValue) {
          requestAnimationFrame(update);
        }
      };
      update();
    });
  };

  // Only animate when stats section is in view
  let statsAnimated = false;
  function onScroll() {
    const statsSection = document.querySelector('.stats-section');
    if (!statsAnimated && statsSection) {
      const rect = statsSection.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        animateStats();
        statsAnimated = true;
        window.removeEventListener('scroll', onScroll);
      }
    }
  }
  window.addEventListener('scroll', onScroll);
  onScroll();
});
