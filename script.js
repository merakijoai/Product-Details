/**
 * VibeCoding Program Details Page
 * Main JavaScript functionality
 */

(function() {
    'use strict';

    // ============================================
    // Language Toggle Functionality
    // ============================================
    
    const currentLang = localStorage.getItem('preferredLang') || 'en';
    const langButtons = document.querySelectorAll('.lang-btn');
    const htmlElement = document.documentElement;
    
    // Initialize language
    function initLanguage() {
        setLanguage(currentLang);
    }
    
    function setLanguage(lang) {
        // Update HTML direction
        htmlElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        htmlElement.setAttribute('lang', lang);
        
        // Update active button
        langButtons.forEach(btn => {
            if (btn.dataset.lang === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Update all translatable elements
        const translatableElements = document.querySelectorAll('[data-en][data-ar]');
        translatableElements.forEach(element => {
            const text = element.getAttribute(`data-${lang}`);
            if (text) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.value = text;
                } else if (element.tagName === 'IMG') {
                    element.alt = text;
                } else {
                    element.textContent = text;
                }
            }
        });
        
        // Update logo based on language
        const logoImg = document.getElementById('logo-img');
        if (logoImg) {
            logoImg.src = lang === 'ar' ? 'logo-light.svg' : 'logo-dark.svg';
        }
        
        // Save preference
        localStorage.setItem('preferredLang', lang);
    }
    
    // Language toggle event listeners
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            setLanguage(lang);
        });
    });
    
    // Initialize language on load
    initLanguage();
    
    // ============================================
    // Header Scroll Effect
    // ============================================
    
    const header = document.getElementById('header');
    let lastScroll = 0;
    
    function handleScroll() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // ============================================
    // Scroll Animations
    // ============================================
    
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
    
    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        observer.observe(element);
    });
    
    
    // ============================================
    // FAQ Accordion
    // ============================================
    
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const isExpanded = question.getAttribute('aria-expanded') === 'true';
            const faqItem = question.closest('.faq-item');
            
            // Close all other FAQs
            faqQuestions.forEach(q => {
                if (q !== question) {
                    q.setAttribute('aria-expanded', 'false');
                    q.closest('.faq-item').querySelector('.faq-answer').style.maxHeight = '0';
                }
            });
            
            // Toggle current FAQ
            if (isExpanded) {
                question.setAttribute('aria-expanded', 'false');
                faqItem.querySelector('.faq-answer').style.maxHeight = '0';
            } else {
                question.setAttribute('aria-expanded', 'true');
                const answer = faqItem.querySelector('.faq-answer');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
    
    // ============================================
    // Smooth Scroll for Anchor Links
    // ============================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ============================================
    // Sticky CTA Visibility
    // ============================================
    
    const stickyCTA = document.getElementById('sticky-cta');
    const ctaSection = document.getElementById('cta');
    
    if (stickyCTA && ctaSection) {
        const ctaObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    stickyCTA.style.display = 'none';
                } else {
                    stickyCTA.style.display = 'block';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px'
        });
        
        ctaObserver.observe(ctaSection);
    }
    
    // ============================================
    // External Link Tracking (Optional)
    // ============================================
    
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Add target="_blank" and rel for security
            if (!this.hasAttribute('target')) {
                this.setAttribute('target', '_blank');
                this.setAttribute('rel', 'noopener noreferrer');
            }
        });
    });
    
    // ============================================
    // Performance: Lazy Load Images
    // ============================================
    
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }
    
    // ============================================
    // Form Validation (if form is embedded)
    // ============================================
    
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!this.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            }
            this.classList.add('was-validated');
        }, false);
    });
    
    // ============================================
    // Console Welcome Message
    // ============================================
    
    console.log('%cVibeCoding Program', 'color: #006cfd; font-size: 20px; font-weight: bold;');
    console.log('%cLearn Coding Through AI - From Zero to Professional', 'color: #142237; font-size: 14px;');
    console.log('%cReady to start your coding journey? Register now!', 'color: #666; font-size: 12px;');
    
})();

