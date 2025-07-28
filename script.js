document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // 1. Mobile Navigation
    // ======================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-times');
        });
    }

    // ======================
    // 2. Smooth Scrolling
    // ======================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') return;
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks) navLinks.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            }
        });
    });

    // ======================
    // 3. DNA Helix Animation
    // ======================
    const createDNA = () => {
        const helix = document.querySelector('.helix-strand');
        if (!helix) return;
        
        for (let i = 0; i < 12; i++) {
            const base = document.createElement('div');
            base.className = 'base-pair';
            base.style.setProperty('--i', i);
            base.style.setProperty('--color', i % 2 ? '#FF4F7B' : '#48BB78');
            helix.appendChild(base);
        }
    };
    createDNA();

    // ======================
    // 4. Team Specialties Hover
    // ======================
    document.querySelectorAll('.team-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            const specialty = this.dataset.specialty;
            const badge = this.querySelector('.specialty-badge');
            if (badge) {
                badge.textContent = specialty;
                badge.style.opacity = '1';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const badge = this.querySelector('.specialty-badge');
            if (badge) badge.style.opacity = '0';
        });
    });

    // ======================
    // 5. Product Countdown
    // ======================
    const updateCountdown = () => {
        const countdownEl = document.querySelector('.countdown');
        if (!countdownEl) return;
        
        const targetDate = new Date(countdownEl.dataset.date);
        const now = new Date();
        const diff = targetDate - now;
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        
        if (days > 0) {
            document.getElementById('days').textContent = days;
        } else {
            countdownEl.innerHTML = 'DSM-6 Update Available Now!';
        }
    };
    updateCountdown();
    setInterval(updateCountdown, 86400000); // Update daily

    // ======================
    // 6. AI Form Assistant
    // ======================
    const initAIAssistant = () => {
        const assistant = document.querySelector('.ai-assistant');
        if (!assistant) return;
        
        const prompts = [
            "How does POPIA affect report storage?",
            "Can I customize assessment templates?",
            "What's the average time savings?"
        ];
        
        let currentPrompt = 0;
        
        assistant.addEventListener('click', function() {
            const promptEl = this.querySelector('p');
            currentPrompt = (currentPrompt + 1) % prompts.length;
            promptEl.textContent = prompts[currentPrompt];
            
            // Add pulse animation
            this.classList.add('pulse');
            setTimeout(() => this.classList.remove('pulse'), 500);
        });
    };
    initAIAssistant();

    // ======================
    // 7. Enhanced Contact Form
    // ======================
    const contactForm = document.getElementById('medicotech-contact');
    const formConfirmation = document.getElementById('form-confirmation');
    
    if (contactForm) {
        // Character counter
        const textarea = contactForm.querySelector('textarea');
        const charCounter = contactForm.querySelector('.char-counter span');
        
        if (textarea && charCounter) {
            textarea.addEventListener('input', function() {
                charCounter.textContent = this.value.length;
                if (this.value.length > 450) {
                    charCounter.style.color = '#FF4F7B';
                } else {
                    charCounter.style.color = '#48BB78';
                }
            });
        }
        
        // Form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Generate random tracking code
            const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
            if (document.getElementById('random-code')) {
                document.getElementById('random-code').textContent = randomCode;
            }
            
            // Show confirmation
            if (formConfirmation) formConfirmation.classList.add('active');
            
            // Reset form
            this.reset();
            if (charCounter) charCounter.textContent = '0';
            
            // Hide confirmation after 5 seconds
            setTimeout(() => {
                if (formConfirmation) formConfirmation.classList.remove('active');
            }, 5000);
        });
    }

    // ======================
    // 8. Lazy Loading Images
    // ======================
    const lazyLoadImages = () => {
        const lazyImages = [].slice.call(document.querySelectorAll('img.lazy'));
        
        if ('IntersectionObserver' in window) {
            let lazyImageObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        let lazyImage = entry.target;
                        lazyImage.src = lazyImage.dataset.src;
                        lazyImage.classList.remove('lazy');
                        lazyImageObserver.unobserve(lazyImage);
                    }
                });
            });

            lazyImages.forEach(function(lazyImage) {
                lazyImageObserver.observe(lazyImage);
            });
        }
    };
    lazyLoadImages();

    // ======================
    // 9. FAQ Search Functionality
    // ======================
    const initFAQSearch = () => {
        const faqSearch = document.querySelector('.faq-search input');
        if (!faqSearch) return;
        
        faqSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            document.querySelectorAll('.faq-item').forEach(item => {
                const question = item.querySelector('h3').textContent.toLowerCase();
                item.style.display = question.includes(searchTerm) ? 'block' : 'none';
            });
        });
    };
    initFAQSearch();

    // ======================
    // 10. Dark Mode Toggle
    // ======================
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        });
        
        // Check for saved preference
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
        }
    }
});

// ======================
// Animation Helpers
// ======================
function animateCheckmark() {
    const checkmark = document.querySelector('.checkmark');
    if (checkmark) {
        checkmark.style.animation = 'fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both';
        document.querySelector('.checkmark-circle').style.animation = 'stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards';
        document.querySelector('.checkmark-check').style.animation = 'stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards';
    }
}

// Initialize animations when confirmation appears
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.attributeName === 'class' && 
            mutation.target.classList.contains('active')) {
            animateCheckmark();
        }
    });
});

const config = { attributes: true };
if (document.getElementById('form-confirmation')) {
    observer.observe(document.getElementById('form-confirmation'), config);
}

const track = document.getElementById('carousel-track');
const items = Array.from(track.children);

// Duplicate items to create the illusion of an infinite loop
items.forEach(item => {
const clone = item.cloneNode(true);
track.appendChild(clone);
});
