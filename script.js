document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }

    // Modal functionality
    window.openModal = function() {
        document.getElementById('visitModal').classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window.closeModal = function() {
        document.getElementById('visitModal').classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    document.getElementById('visitModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && document.getElementById('visitModal').classList.contains('active')) {
            closeModal();
        }
    });

    // Accordion functionality (FIXED FOR FAQ)
    const accordionToggles = document.querySelectorAll('.accordion-toggle');
    accordionToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            if (content.classList.contains('active')) {
                content.classList.remove('active');
                icon.classList.remove('rotate-180');
            } else {
                accordionToggles.forEach(otherToggle => {
                    otherToggle.nextElementSibling.classList.remove('active');
                    otherToggle.querySelector('i').classList.remove('rotate-180');
                });
                
                content.classList.add('active');
                icon.classList.add('rotate-180');
            }
        });
    });

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                if (window.innerWidth < 768) {
                    mobileMenu.classList.add('hidden');
                    const icon = mobileMenuBtn.querySelector('i');
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.classList.remove('text-gray-800');
                btn.classList.remove('border-orange-500');
                btn.classList.add('text-gray-600');
                btn.classList.add('border-transparent');
            });
            
            tabContents.forEach(content => {
                content.classList.remove('active');
            });
            
            this.classList.add('active');
            this.classList.add('text-gray-800');
            this.classList.add('border-orange-500');
            this.classList.remove('text-gray-600');
            this.classList.remove('border-transparent');
            
            const targetTab = document.getElementById(tabName);
            if (targetTab) {
                targetTab.classList.add('active');
            }
        });
    });

    // Scroll animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        observer.observe(element);
    });

    const stickerElements = document.querySelectorAll('.sticker-animate');
    stickerElements.forEach(element => {
        observer.observe(element);
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Form submission
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Mulțumim pentru mesaj! V vom contacta în scurt timp.');
            this.reset();
        });
    }

    const bookingForm = document.querySelector('#visitModal form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Programare confirmată! V vom contacta pentru confirmare.');
            closeModal();
            this.reset();
        });
    }
});
