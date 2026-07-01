/* ==========================================================================
   PARTICLES.JS CONFIGURATION (Theme-Aware Mesh)
   ========================================================================== */

function loadParticles(isDark) {
    const color = isDark ? "#ffffff" : "#2563eb"; // White for dark, Blue for light
    const opacity = isDark ? 0.4 : 0.6; // Increased opacity for light mode visibility

    particlesJS("particles-js", {
        "particles": {
            "number": {
                "value": 100, // Slightly increased density
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": color
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                }
            },
            "opacity": {
                "value": isDark ? 0.5 : 0.7, // Higher opacity in light mode
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 1,
                    "opacity_min": 0.2,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": color,
                "opacity": opacity,
                "width": 1.5 // Slightly thicker lines for visibility
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "window",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "push": {
                    "particles_nb": 4
                }
            }
        },
        "retina_detect": true
    });
}
