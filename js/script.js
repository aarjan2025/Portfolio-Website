 // Theme Toggle
        let darkMode = localStorage.getItem('darkMode') === 'true';

        function toggleTheme() {
            darkMode = !darkMode;
            document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
            document.getElementById('theme-icon').className = darkMode ? 'fas fa-sun' : 'fas fa-moon';
            localStorage.setItem('darkMode', darkMode);
        }

        // Initialize theme
        function initTheme() {
            document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
            document.getElementById('theme-icon').className = darkMode ? 'fas fa-sun' : 'fas fa-moon';
        }

        // Active navbar link highlighting
        function updateActiveLink() {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }

        // Scroll animations
        function handleScrollAnimations() {
            const sections = document.querySelectorAll('section');
            
            sections.forEach(section => {
                const sectionTop = section.getBoundingClientRect().top;
                const triggerBottom = window.innerHeight / 5 * 4;
                
                if (sectionTop < triggerBottom) {
                    section.classList.add('visible');
                }
            });
        }

        // Smooth scroll for navbar links
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

        // Contact form submission
        document.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Simulate form submission
            alert('Thank you for your message! I\'ll get back to you soon.');
            this.reset();
        });

        // Event listeners
        window.addEventListener('scroll', () => {
            updateActiveLink();
            handleScrollAnimations();
        });

        // Initialize on page load
        document.addEventListener('DOMContentLoaded', () => {
            initTheme();
            handleScrollAnimations();
            
            // Add fade-in animation to home section
            document.getElementById('home').classList.add('visible');
        });

        // Navbar background on scroll
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.style.background = darkMode ? 
                    'rgba(15, 23, 42, 0.98)' : 
                    'rgba(255, 255, 255, 0.98)';
            } else {
                navbar.style.background = darkMode ? 
                    'rgba(15, 23, 42, 0.95)' : 
                    'rgba(255, 255, 255, 0.95)';
            }
        });

        // Add ripple effect to buttons
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // Add CSS for ripple effect
        const style = document.createElement('style');
        style.textContent = `
            .btn {
                position: relative;
                overflow: hidden;
            }
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                pointer-events: none;
            }
            @keyframes ripple-animation {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);