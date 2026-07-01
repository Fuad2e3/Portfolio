// themeToggle.js

const toggleButton = document.getElementById('themeToggle');
const themeLogo = document.getElementById('theme-logo');
const savedTheme = localStorage.getItem('theme');
const systemSettingDark = window.matchMedia('(prefers-color-scheme: dark)');

// Function to set the theme
function applyTheme(isDark) {
    if (isDark) {
        document.body.classList.add('dark-theme');
        if (toggleButton) toggleButton.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.body.classList.remove('dark-theme');
        if (toggleButton) toggleButton.innerHTML = '<i class="fas fa-moon"></i>';
    }

    // Update Particles to match theme
    if (typeof loadParticles === 'function') {
        loadParticles(isDark);
    }

    // Save preference to localStorage
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// 1. Initial Load Logic
if (savedTheme) {
    // If user previously chose a theme manually, use it
    applyTheme(savedTheme === 'dark');
} else {
    // Otherwise, follow system setting
    applyTheme(systemSettingDark.matches);
}

// 2. Manual Toggle Click
if (toggleButton) {
    toggleButton.addEventListener('click', () => {
        const isDark = !document.body.classList.contains('dark-theme');
        applyTheme(isDark);
    });
}

// 3. Listen for System Theme Changes
systemSettingDark.addEventListener('change', (e) => {
    // Only auto-change if the user HAS NOT set a manual preference
    if (!localStorage.getItem('theme')) {
        applyTheme(e.matches);
    }
});
