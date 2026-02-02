document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Sticky Header
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('py-2', 'shadow-md', 'bg-white/80');
            header.classList.remove('py-4', 'border-white/20');
        } else {
            header.classList.remove('py-2', 'shadow-md', 'bg-white/80');
            header.classList.add('py-4', 'border-white/20');
        }
    });

    // 2. Mobile Menu
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        });
        document.querySelectorAll('#mobileMenu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            });
        });
    }

    // 3. Tabs Logic (Curriculum & Calendar)
    const setupTabs = (btnClass, contentClass) => {
        const btns = document.querySelectorAll(btnClass);
        const contents = document.querySelectorAll(contentClass);

        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                btns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                contents.forEach(c => {
                    c.classList.add('hidden');
                    c.classList.remove('active');
                });
                
                const target = document.getElementById(btn.dataset.target);
                if (target) {
                    target.classList.remove('hidden');
                    target.classList.add('active');
                }
            });
        });
    };

    setupTabs('.tab-btn:not(.season-btn)', '.tab-content'); // Curriculum
    setupTabs('.season-btn', '.season-content'); // Calendar

    // 4. Accordion (FAQ)
    document.querySelectorAll('.accordion-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector('.accordion-icon');
            const isExpanded = this.getAttribute('aria-expanded') === 'true';

            // Close all
            document.querySelectorAll('.accordion-btn').forEach(otherBtn => {
                otherBtn.setAttribute('aria-expanded', 'false');
                otherBtn.nextElementSibling.classList.remove('open');
                otherBtn.nextElementSibling.style.maxHeight = null;
                otherBtn.querySelector('.accordion-icon').style.transform = 'rotate(0deg)';
            });

            // Toggle current
            if (!isExpanded) {
                this.setAttribute('aria-expanded', 'true');
                content.classList.add('open');
                content.style.maxHeight = content.scrollHeight + "px";
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });

    // 5. Modal
    const modal = document.getElementById('visitModal');
    const modalContent = modal.querySelector('div.relative');
    
    window.openModal = () => {
        modal.classList.remove('opacity-0', 'pointer-events-none');
        setTimeout(() => {
            modalContent.classList.remove('scale-95');
            modalContent.classList.add('scale-100');
        }, 10);
        document.body.style.overflow = 'hidden';
    };
    
    window.closeModal = () => {
        modalContent.classList.remove('scale-100');
        modalContent.classList.add('scale-95');
        setTimeout(() => {
            modal.classList.add('opacity-0', 'pointer-events-none');
        }, 300);
        document.body.style.overflow = '';
        document.getElementById('modalSuccess').classList.add('hidden');
    };

    // 6. Form Handling
    const setupForm = (formId, successId) => {
        const form = document.getElementById(formId);
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                document.getElementById(successId).classList.remove('hidden');
                form.reset();
                if (formId === 'modalForm') setTimeout(closeModal, 2500);
            });
        }
    };
    setupForm('contactForm', 'contactSuccess');
    setupForm('modalForm', 'modalSuccess');

    // 7. Scroll Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});