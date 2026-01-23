document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        const icon = this.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Accordion functionality
    const accordionToggles = document.querySelectorAll('.accordion-toggle');
    accordionToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            // Close other accordion items
            accordionToggles.forEach(otherToggle => {
                if (otherToggle !== this) {
                    otherToggle.nextElementSibling.classList.remove('active');
                    otherToggle.querySelector('i').classList.remove('rotate-180');
                }
            });
            
            // Toggle current accordion item
            content.classList.toggle('active');
            icon.classList.toggle('rotate-180');
        });
    });

    // Calendar tabs
    const calendarTabs = document.querySelectorAll('.calendar-tab');
    const seasonContents = document.querySelectorAll('.season-content');

    calendarTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const season = this.getAttribute('data-season');
            
            // Update tab styles
            calendarTabs.forEach(t => {
                t.classList.remove('bg-[#8B7355]', 'text-white');
                t.classList.add('bg-gray-100', 'text-gray-700');
            });
            this.classList.remove('bg-gray-100', 'text-gray-700');
            this.classList.add('bg-[#8B7355]', 'text-white');
            
            // Show corresponding season content
            seasonContents.forEach(content => {
                content.classList.add('hidden');
            });
            document.getElementById(season).classList.remove('hidden');
            document.getElementById(season).classList.add('active');
        });
    });

    // Menu tabs
    const menuTabs = document.querySelectorAll('.menu-tab');
    const weekContents = document.querySelectorAll('.week-content');

    menuTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const week = this.getAttribute('data-week');
            
            // Update tab styles
            menuTabs.forEach(t => {
                t.classList.remove('bg-[#8B7355]', 'text-white');
                t.classList.add('bg-gray-100', 'text-gray-700');
            });
            this.classList.remove('bg-gray-100', 'text-gray-700');
            this.classList.add('bg-[#8B7355]', 'text-white');
            
            // Show corresponding week content
            weekContents.forEach(content => {
                content.classList.add('hidden');
            });
            document.getElementById(week).classList.remove('hidden');
            document.getElementById(week).classList.add('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    const icon = mobileMenuBtn.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });

    // Intersection Observer for fade-in animations
    const fadeElements = document.querySelectorAll('.fade-in');
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

    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // Active section highlighting in nav
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('a.nav-link');

    const observerOptionsSection = {
        threshold: 0.5,
        rootMargin: '-100px 0px -50% 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptionsSection);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Parallax effect on hero
    window.addEventListener('scroll', function() {
        const parallax = document.querySelector('.parallax');
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (parallax) {
            parallax.style.transform = `translateY(${rate}px)`;
        }
    });

    // WhatsApp floating button
    const whatsappBtn = document.createElement('a');
    whatsappBtn.href = 'https://wa.me/40722123456';
    whatsappBtn.className = 'fixed bottom-24 right-6 z-50 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center text-white text-3xl shadow-2xl hover:shadow-3xl transition-all floating';
    whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
    document.body.appendChild(whatsappBtn);

    // Add hover effect to cards
    const cards = document.querySelectorAll('.card-hover');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Initialize testimonial carousel (simple version)
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial-card');

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? 'block' : 'none';
        });
    }

    // Auto-rotate testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);
});
