/* ==========================================================================
   PORTFOLIO NAVIGATION MECHANICS (navbar.js)
   ========================================================================== */

// === Mobile Menu Toggle ===
function toggleMenuBar() {
  document.querySelector('.navbar .menu-list')?.classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', () => {
  // Close menu on link selection
  document.querySelectorAll('.navbar .menu-list a').forEach(link => {
    link.addEventListener('click', () =>
      document.querySelector('.navbar .menu-list')?.classList.remove('active')
    );
  });

  // === Dynamic Navbar Highlighting ===
  function activateNavLink() {
    const navLinks = document.querySelectorAll('.navbar .menu-list a');

    // Fallback single page tracking for sections (index.html / home)
    const sections = document.querySelectorAll('section');
    let current = '';

    sections.forEach(section => {
      const top = section.offsetTop - 120; // Increased cushion for crisp offset handling
      const height = section.clientHeight;
      if (window.scrollY >= top && window.scrollY < top + height) {
        current = section.id;
      }
    });

    // Special absolute top fallback tracking (forces 'Home' anchor active)
    if (window.scrollY < 50) {
      current = 'home';
    }

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href.includes(`#${current}`));
    });
  }

  // Bind evaluation listeners
  window.addEventListener('scroll', activateNavLink);
  activateNavLink(); // Fire initial pass instantly on layout parse
});

// === Navbar Scroll Shadow Effect ===
window.addEventListener('scroll', () => {
  document.querySelector('.navbar')?.classList.toggle('scrolled', window.scrollY > 60);
});