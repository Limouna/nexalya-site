/* Nexalya — global behaviors
 * Extracted from index.html (originally inlined at end of body).
 * Handles: hamburger menu, fade-in animations, smooth scroll,
 * contact form submission (homepage only), Lucide icon init.
 */


// Hamburger menu toggle
function toggleMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

// Close menu when clicking a nav link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements that need animation
document.querySelectorAll('.section-header, .service-card, .platform-card, .feature-card, .project-card, .tech-item, .about-content, .contact-container, .process-step, .cta-block').forEach(el => {
    observer.observe(el);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Form submission handler with EmailJS
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {

        e.preventDefault();
        const btn = e.target.querySelector('.submit-btn');
        const originalText = btn.textContent;
        const originalBg = btn.style.background;

        // Show loading state
        btn.textContent = 'Envoi en cours...';
        btn.disabled = true;
        btn.style.opacity = '0.7';

        // Send email via EmailJS
        emailjs.sendForm('service_vlj5dco', 'template_6898dyg', e.target)
            .then(() => {
                // Success
                gtag_report_conversion('/thank-you.html');
                btn.textContent = 'Message Envoyé! ✓';
                btn.style.background = 'linear-gradient(135deg, #14b8a6 0%, #10b981 100%)';
                btn.style.opacity = '1';

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = originalBg;
                    btn.disabled = false;
                    e.target.reset();
                }, 3000);
            }, (error) => {
                // Error
                console.error('EmailJS Error:', error);
                btn.textContent = 'Erreur! Réessayez';
                btn.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
                btn.style.opacity = '1';

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = originalBg;
                    btn.disabled = false;
                }, 3000);
            });
    });
}


// Initialize Lucide icons
lucide.createIcons();