/* ==========================================================================
   GLOBAL INTERACTIONS (main.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // === 1. Splash Screen Loader ===
    const loader = document.getElementById('loader');
    if (loader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('fade-out');
            }, 2000); // 2 second delay for branding
        });
    }

    // === 2. Scroll-To-Top Button ===
    const scrollUp = document.querySelector('.scroll-up');
    if (scrollUp) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollUp.classList.add('show');
            } else {
                scrollUp.classList.remove('show');
            }
        });

        scrollUp.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // === 3. Typing Text Animation ===
    const typingText = document.querySelector('.role');
    const phrases = ["Flutter & Full-Stack Developer", "Mobile App Specialist", "UI/UX Enthusiast"];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        if (!typingText) return;

        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, charIndex--);
            typeSpeed = 50;
        } else {
            typingText.textContent = currentPhrase.substring(0, charIndex++);
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex > currentPhrase.length) {
            isDeleting = true;
            typeSpeed = 2000;
        } else if (isDeleting && charIndex < 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            charIndex = 0;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();

    // === 4. Dynamic Stats Counter (Animated on View) ===
    let animationActive = false; // Flag to prevent multiple simultaneous animations

    function animateCounter(id, target) {
        const obj = document.getElementById(id);
        if (!obj) return;

        let startTimestamp = null;
        const duration = 1000; // Reduced from 2000 to 1000 for faster animation
        const startValue = 0;

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerText = Math.floor(progress * (target - startValue) + startValue) + "+";
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                animationActive = false; // Animation finished
            }
        };
        window.requestAnimationFrame(step);
    }

    function runStatsUpdate() {
        if (animationActive) return; // Don't start if already running
        animationActive = true;

        // Experience Years Calculation
        const startDate = new Date('2021-09-01');
        const today = new Date();
        let years = today.getFullYear() - startDate.getFullYear();
        const monthDiff = today.getMonth() - startDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < startDate.getDate())) {
            years--;
        }

        // Count Projects from DOM
        const projectsCount = document.querySelectorAll('.project-item').length;

        // Start animations
        animateCounter('exp-years', years);
        animateCounter('project-count', projectsCount);
    }

    // Set up Intersection Observer
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    runStatsUpdate();
                } else {
                    // Reset text only if not currently animating
                    if (!animationActive) {
                        const expYears = document.getElementById('exp-years');
                        const projectCount = document.getElementById('project-count');
                        if (expYears) expYears.textContent = "0+";
                        if (projectCount) projectCount.textContent = "0+";
                    }
                }
            });
        }, { threshold: 0.2 }); // Trigger slightly earlier for smoother feel

        observer.observe(aboutSection);
    }

    // === 5. Fast Scroll for all links ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const targetPos = targetElement.offsetTop - 80;

                // Fast scroll behavior
                window.scrollTo({
                    top: targetPos,
                    behavior: 'smooth'
                });
            }
        });
    });

    // === 6. Automatic Copyright Year ===
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // === 7. Copy Email Functionality ===
    window.copyEmail = function() {
        const email = "fuadkalaroa2002@gmail.com";
        navigator.clipboard.writeText(email).then(() => {
            const copyBtn = document.querySelector('.copy-btn');
            const originalIcon = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i>';
            copyBtn.classList.add('copied');

            setTimeout(() => {
                copyBtn.innerHTML = originalIcon;
                copyBtn.classList.remove('copied');
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    };

    // === AOS Initialization ===
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 300,
            once: true,
            offset: 0,
            easing: 'ease-out-quad',
            disable: 'mobile'
        });
    }

    // === 10. "See More" Projects Toggle ===
    const projectItems = document.querySelectorAll('.project-item');
    const toggleBtn = document.getElementById('toggle-projects-btn');
    const initialVisibleCount = 6;

    if (projectItems.length > initialVisibleCount && toggleBtn) {
        // Hide projects beyond the initial count
        projectItems.forEach((item, index) => {
            if (index >= initialVisibleCount) {
                item.classList.add('hidden');
            }
        });

        toggleBtn.addEventListener('click', () => {
            const isExpanded = toggleBtn.classList.contains('active');

            if (isExpanded) {
                // Hide extra projects
                projectItems.forEach((item, index) => {
                    if (index >= initialVisibleCount) {
                        item.classList.add('hidden');
                    }
                });
                toggleBtn.innerHTML = 'See More <i class="fas fa-chevron-down"></i>';
                toggleBtn.classList.remove('active');

                // Scroll back to projects section smoothly
                const projectsSection = document.getElementById('projects');
                if (projectsSection) {
                    window.scrollTo({
                        top: projectsSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            } else {
                // Show all projects
                projectItems.forEach(item => item.classList.remove('hidden'));
                toggleBtn.innerHTML = 'See Less <i class="fas fa-chevron-up"></i>';
                toggleBtn.classList.add('active');
            }

            // Refresh AOS animations to handle newly visible items
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        });
    } else if (toggleBtn) {
        // Hide button if not enough projects
        toggleBtn.style.display = 'none';
    }
});
