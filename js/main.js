/* ==========================================================================
   GLOBAL INTERACTIONS & PAGE ANIMATIONS (main.js)
   ========================================================================== */

// === Scroll-To-Top Button ===
const scrollUp = document.querySelector('.scroll-up');
if (scrollUp) {
  window.addEventListener('scroll', () => {
    scrollUp.style.display = window.scrollY > 300 ? 'flex' : 'none';
  });

  scrollUp.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// === Typing Text Animation ===
const typingText = document.querySelector('.text-section .role');
const phrases = ["Flutter & Full-Stack Developer", "Mobile App Enthusiast", "Node.js Backend Developer"];
let phraseIndex = 0;
let charIndex = 0;

function type() {
  if (!typingText) return;
  typingText.textContent = phrases[phraseIndex].substring(0, charIndex++);
  if (charIndex <= phrases[phraseIndex].length) {
    setTimeout(type, 100);
  } else {
    setTimeout(erase, 1800);
  }
}

function erase() {
  if (!typingText) return;
  typingText.textContent = phrases[phraseIndex].substring(0, charIndex--);
  if (charIndex >= 0) {
    setTimeout(erase, 50);
  } else {
    phraseIndex = (phraseIndex + 1) % phrases.length;
    setTimeout(type, 1000);
  }
}

// Run sequence instantly
type();

// === Education Tabs Activation ===
document.addEventListener('DOMContentLoaded', () => {
  const tabLinks = document.querySelectorAll('.educations-types .tab-link');
  const tabContents = document.querySelectorAll('.educations-contents .tab-content');

  if (tabLinks.length > 0) {
    tabLinks[0].classList.add('active');
    document.getElementById(tabLinks[0].dataset.tab)?.classList.add('active');
  }

  tabLinks.forEach(link => {
    link.addEventListener('click', () => {
      tabLinks.forEach(l => l.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      link.classList.add('active');
      document.getElementById(link.dataset.tab)?.classList.add('active');
    });
  });
});


// === Blog Modal Script Integration ===
document.querySelectorAll('.blog-read-more[data-target]').forEach(triggerButton => {
  triggerButton.addEventListener('click', (e) => {
    e.preventDefault();
    const modalId = triggerButton.getAttribute('data-target');
    document.getElementById(modalId)?.classList.add('open');
    document.body.style.overflow = 'hidden'; // Stop page scrolling background action
  });
});

// Close mechanism
document.querySelectorAll('.article-modal .close-modal-btn').forEach(closeButton => {
  closeButton.addEventListener('click', () => {
    closeButton.closest('.article-modal').classList.remove('open');
    document.body.style.overflow = 'auto'; // Reset viewport parameters
  });
});