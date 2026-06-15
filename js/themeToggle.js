// themeToggle.js

const toggleButton = document.getElementById('themeToggle');
const themeLogo = document.getElementById('theme-logo'); // Get the logo element
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Function to set the theme and update the logo
function applyTheme(isDark) {
    if (isDark) {
        document.body.classList.add('dark-theme');
        toggleButton.innerHTML = '<i class="fas fa-sun"></i>';
        themeLogo.src = 'assets/logo-dark.png'; // Set dark logo
    } else {
        document.body.classList.remove('dark-theme');
        toggleButton.innerHTML = '<i class="fas fa-moon"></i>';
        themeLogo.src = 'assets/logo-light.png'; // Set light logo
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Apply initial theme
if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    applyTheme(true);
} else {
    applyTheme(false);
}

// Toggle theme on click
toggleButton.addEventListener('click', () => {
    const isDark = !document.body.classList.contains('dark-theme');
    applyTheme(isDark);
});