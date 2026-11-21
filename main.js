(function () {
    'use strict';
    // Initialize EmailJS
    emailjs.init({
        publicKey: 'Uu_85L9k_TgTBwhxB'
    });

    // ============================================
    // DOM Elements
    // ============================================
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const body = document.body;
    const navLinks = document.querySelectorAll('.mobile-nav a');
    const navbar = document.getElementById('navbar');
    const scrollProgress = document.getElementById('scrollProgress');
    const revealElements = document.querySelectorAll('.reveal');
    const faqItems = document.querySelectorAll('.faq-item');
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const formError = document.getElementById('formError');
    const contactInfo = document.getElementById('contactInfo');
    const submitBtn = document.getElementById('submitBtn');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ============================================
    // Mobile Menu
    // ============================================
    function closeMenu() {
        mobileNav.classList.remove('active');
        mobileBtn.classList.remove('active');
        mobileBtn.setAttribute('aria-expanded', 'false');
        mobileBtn.setAttribute('aria-label', 'Open menu');
        mobileNav.setAttribute('aria-hidden', 'true');
        body.classList.remove('no-scroll');
    }

    function openMenu() {
        mobileNav.classList.add('active');
        mobileBtn.classList.add('active');
        mobileBtn.setAttribute('aria-expanded', 'true');
        mobileBtn.setAttribute('aria-label', 'Close menu');
        mobileNav.setAttribute('aria-hidden', 'false');
        body.classList.add('no-scroll');
    }

    mobileBtn.addEventListener('click', () => {
        if (mobileNav.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    window.addEventListener('click', (e) => {
        if (mobileNav.classList.contains('active') && e.target === mobileNav) {
            closeMenu();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
            closeMenu();
        }
    });

    // ============================================
    // Smooth Scroll with Offset
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === "#" || href === "#home") return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: prefersReducedMotion ? 'auto' : 'smooth'
                });
            }
        });
    });

    // ============================================
    // Back to Top
    // ============================================
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        backToTop.style.opacity = '0';
        backToTop.style.pointerEvents = 'none';
        backToTop.style.transition = 'opacity 0.3s ease, transform 0.25s ease, background 0.25s ease, border-color 0.25s ease, color 0.25s ease, box-shadow 0.25s ease';

        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTop.style.opacity = '1';
                backToTop.style.pointerEvents = 'auto';
            } else {
                backToTop.style.opacity = '0';
                backToTop.style.pointerEvents = 'none';
            }
        });
    }

    // ============================================
    // Scroll Progress
    // ============================================
    if (scrollProgress && !prefersReducedMotion) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            scrollProgress.style.width = scrollPercent + '%';
        });
    }

    // ============================================
    // Reveal Animations (IntersectionObserver fallback)
    // ============================================
    if (!prefersReducedMotion && revealElements.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -60px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealElements.forEach(el => observer.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add('visible'));
    }

    // ============================================
    // GSAP Animations (if available)
    // ============================================
    if (typeof gsap !== 'undefined' && !prefersReducedMotion) {
        gsap.registerPlugin(ScrollTrigger);

        // Hero animation timeline
        const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
        heroTimeline
            .from('.hero-content h1', { y: 40, opacity: 0, duration: 0.8 })
            .from('.hero-subtitle', { y: 30, opacity: 0, duration: 0.7 }, '-=0.5')
            .from('.hero-actions', { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
            .from('.trust-strip', { y: 20, opacity: 0, duration: 0.6 }, '-=0.3')
            .from('.hero-visual', { x: 40, opacity: 0, duration: 0.8 }, '-=0.6');

        // Scroll-triggered animations for sections
        gsap.utils.toArray('.cards-grid .card').forEach((card, i) => {
            if (card.classList.contains('reveal')) return;
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                y: 30,
                opacity: 0,
                duration: 0.6,
                delay: i * 0.05,
                ease: 'power2.out'
            });
        });

        // Process steps animation
        gsap.utils.toArray('.process-step').forEach((step, i) => {
            gsap.from(step, {
                scrollTrigger: {
                    trigger: step,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                y: 20,
                opacity: 0,
                duration: 0.5,
                delay: i * 0.1,
                ease: 'power2.out'
            });
        });

        // Pricing cards animation
        gsap.utils.toArray('.pricing-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                y: 30,
                opacity: 0,
                duration: 0.6,
                delay: i * 0.08,
                ease: 'power2.out'
            });
        });
    }

    // ============================================
    // Active Navigation
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const desktopNavLinks = document.querySelectorAll('.nav-links a');

    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        desktopNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();

    // ============================================
    // Navbar Scroll State
    // ============================================
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // ============================================
    // FAQ Accordion
    // ============================================
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');

            faqItems.forEach(i => {
                i.classList.remove('open');
                i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                i.querySelector('.faq-answer').style.maxHeight = '0';
            });

            if (!isOpen) {
                item.classList.add('open');
                question.setAttribute('aria-expanded', 'true');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // ============================================
    // Contact Form
    // ============================================
    if (contactForm) {
        const requiredFields = contactForm.querySelectorAll('[required]');

        function showError(field, errorId) {
            field.classList.add('error');
            const errorEl = document.getElementById(errorId);
            if (errorEl) errorEl.classList.add('visible');
        }

        function clearError(field, errorId) {
            field.classList.remove('error');
            const errorEl = document.getElementById(errorId);
            if (errorEl) errorEl.classList.remove('visible');
        }

        function validateEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }

        function validatePhone(phone) {
            if (!phone) return true;
            return /^[\d\s\-\+\(\)]{10,}$/.test(phone);
        }

        // Real-time validation on blur
        requiredFields.forEach(field => {
            field.addEventListener('blur', () => {
                if (field.hasAttribute('required') && !field.value.trim()) {
                    const errorId = field.id + 'Error';
                    showError(field, errorId);
                } else {
                    const errorId = field.id + 'Error';
                    clearError(field, errorId);
                }

                if (field.type === 'email' && field.value && !validateEmail(field.value)) {
                    showError(field, 'emailError');
                }

                if (field.type === 'tel' && field.value && !validatePhone(field.value)) {
                    showError(field, 'phoneError');
                }
            });

            field.addEventListener('input', () => {
                const errorId = field.id + 'Error';
                clearError(field, errorId);
            });
        });

        // Form submission
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            let isValid = true;

            requiredFields.forEach(field => {
                const errorId = field.id + 'Error';
                if (!field.value.trim()) {
                    showError(field, errorId);
                    isValid = false;
                } else {
                    clearError(field, errorId);
                }

                if (field.type === 'email' && field.value && !validateEmail(field.value)) {
                    showError(field, 'emailError');
                    isValid = false;
                }

                if (field.type === 'tel' && field.value && !validatePhone(field.value)) {
                    showError(field, 'phoneError');
                    isValid = false;
                }
            });

            if (!isValid) return;

            // Loading state
            if (submitBtn) {
                submitBtn.classList.add('loading');
                submitBtn.disabled = true;
                submitBtn.innerHTML = 'Sending <span class="spinner"></span>';
            }

            // Submit form data using EmailJS
            emailjs.sendForm(
                'D2B_79',
                'template_govf9l6',
                contactForm
            )
                .then(() => {
                    contactForm.style.display = 'none';
                    if (formSuccess) formSuccess.classList.add('visible');
                    if (contactInfo) contactInfo.style.display = 'none';
                })
                .catch(error => {
                    console.error('EmailJS submission failed:', error);
                    if (formError) formError.classList.add('visible');
                    if (contactInfo) contactInfo.style.display = 'none';
                })
                .finally(() => {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.classList.remove('loading');
                        submitBtn.innerHTML = 'Send Project Enquiry';
                    }
                });
        });
    }

    // ============================================
    // WhatsApp Click Tracking (optional)
    // ============================================
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        link.addEventListener('click', function () {
            // Add analytics tracking here if needed
            console.log('WhatsApp click tracked');
        });
    });

// Newsletter Subscription
const newsletterForm = document.getElementById('newsletterForm');
const newsletterMessage = document.getElementById('newsletterMessage');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const button = newsletterForm.querySelector('button');
        const originalText = button.textContent;

        button.disabled = true;
        button.textContent = 'Subscribing...';

        emailjs.sendForm(
            'D2B_79',
            'template_64507pp',
            newsletterForm
        )
        .then(() => {
            newsletterMessage.textContent = 'Thank you for subscribing!';
            newsletterForm.reset();
        })
        .catch((error) => {
            console.error('Newsletter error:', error);
            newsletterMessage.textContent = 'Subscription failed. Please try again.';
        })
        .finally(() => {
            button.disabled = false;
            button.textContent = originalText;
        });
    });
}


})();
