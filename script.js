// ====================================
// MODERN PORTFOLIO - JAVASCRIPT
// ====================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initProjectFilter();
    initScrollAnimations();
    initSmoothScroll();
    initCodeCardControls();
    initBackToTop();
});

// ====================================
// NAVIGATION
// ====================================
function initNavigation() {
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect for navbar
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add scrolled class when scrolled down
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') &&
            !navMenu.contains(e.target) &&
            !navToggle.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    });
}

// ====================================
// SMOOTH SCROLL
// ====================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Skip if it's just "#"
            if (href === '#') return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                const offsetTop = target.offsetTop - 80;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ====================================
// PROJECT FILTERING
// ====================================
function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (!filterBtns.length || !projectCards.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');

            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter projects
            let visibleIndex = 0;
            projectCards.forEach((card) => {
                const category = card.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    // Show card with stagger effect
                    card.classList.remove('hidden');
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';

                    setTimeout(() => {
                        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, visibleIndex * 100);

                    visibleIndex++;
                } else {
                    // Hide card
                    card.style.transition = 'opacity 0.3s ease';
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });
}

// ====================================
// SCROLL ANIMATIONS
// ====================================
function initScrollAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('fade-in', 'animated');
                // Stop observing after animation to prevent re-triggering
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements
    const animatedElements = document.querySelectorAll(
        '.glass-card, .skill-category, .project-card, .interest-item, .section-header'
    );

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Parallax effect for gradient orbs
    const orbs = document.querySelectorAll('.gradient-orb');

    if (orbs.length) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const speed = 0.5;

            orbs.forEach((orb, index) => {
                const yPos = -(scrolled * speed * (index + 1) * 0.5);
                orb.style.transform = `translate3d(0, ${yPos}px, 0)`;
            });
        });
    }
}

// ====================================
// UTILITY FUNCTIONS
// ====================================

// Debounce function for performance
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ====================================
// FORM HANDLING (if needed)
// ====================================
function initFormHandling() {
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            // Form validation or custom handling can go here
            // Default formspree handling will work as-is
            console.log('Form submitted');
        });
    }
}

// ====================================
// PERFORMANCE OPTIMIZATIONS
// ====================================

// Lazy load images (if you want to add more images later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Preload critical resources
function preloadCriticalResources() {
    const criticalImages = [
        'images/db-logo.png',
        // Add more critical images here
    ];

    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Initialize preloading
preloadCriticalResources();

// ====================================
// ACCESSIBILITY ENHANCEMENTS
// ====================================

// Skip to main content (keyboard navigation)
document.addEventListener('keydown', (e) => {
    // Press '/' to focus search or main content
    if (e.key === '/' && !e.target.matches('input, textarea')) {
        e.preventDefault();
        const mainContent = document.querySelector('main') || document.querySelector('.hero');
        if (mainContent) {
            mainContent.scrollIntoView({ behavior: 'smooth' });
            mainContent.setAttribute('tabindex', '-1');
            mainContent.focus();
        }
    }
});

// Announce dynamic content changes to screen readers
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);

    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// ====================================
// ANALYTICS (optional - add if needed)
// ====================================

// Track button clicks
function trackEvent(category, action, label) {
    if (window.gtag) {
        window.gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
}

// Track CTA clicks
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const text = btn.textContent.trim();
        trackEvent('Button', 'Click', text);
    });
});

// ====================================
// CODE CARD INTERACTIVE CONTROLS
// ====================================
function initCodeCardControls() {
    const codeCard = document.getElementById('code-card');
    const statsCard = document.getElementById('stats-card');
    const codeTab = document.getElementById('code-tab');
    const statsTab = document.getElementById('stats-tab');
    const codeModal = document.getElementById('code-modal');
    const statsModal = document.getElementById('stats-modal');
    const easterEggMessage = document.getElementById('easter-egg-message');

    let easterEggShown = false;

    // Check if both cards are hidden and show easter egg
    function checkAndShowEasterEgg() {
        const bothHidden = codeCard.classList.contains('hidden') && statsCard.classList.contains('hidden');

        if (bothHidden && !easterEggShown) {
            easterEggMessage.classList.remove('hidden');
            easterEggShown = true;
        }
    }

    // Bring a card to the front
    function bringToFront(card) {
        if (card === codeCard) {
            codeCard.style.zIndex = '2';
            statsCard.style.zIndex = '1';
        } else if (card === statsCard) {
            statsCard.style.zIndex = '2';
            codeCard.style.zIndex = '1';
        }
    }

    // Swipe detection variables
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    const swipeThreshold = 50; // Minimum distance for a swipe

    // Swipe handler for cards
    function handleSwipe(card) {
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;

        // Only process if horizontal swipe is more significant than vertical
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > swipeThreshold) {
            // Determine which card is currently on top
            const codeIsOnTop = parseInt(codeCard.style.zIndex || 2) > parseInt(statsCard.style.zIndex || 1);

            // Swipe in either direction swaps to the other card
            if (codeIsOnTop) {
                // Show stats card on top
                swapToCard(statsCard, codeCard, deltaX > 0 ? 'right' : 'left');
            } else {
                // Show code card on top
                swapToCard(codeCard, statsCard, deltaX > 0 ? 'right' : 'left');
            }
        }
    }

    // Swap cards with animation
    function swapToCard(topCard, bottomCard, direction) {
        // Add swipe animation classes
        const translateDirection = direction === 'left' ? '-' : '';

        topCard.style.transition = 'all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)';
        topCard.style.transform = `translate(${translateDirection}2rem, 2rem)`;
        topCard.style.zIndex = '2';
        topCard.style.opacity = '1';

        bottomCard.style.transition = 'all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)';
        bottomCard.style.transform = 'translate(0, 0)';
        bottomCard.style.zIndex = '1';
        bottomCard.style.opacity = '0.7';

        // Reset transitions after animation
        setTimeout(() => {
            topCard.style.transition = '';
            bottomCard.style.transition = '';
            bottomCard.style.opacity = '';
        }, 400);
    }

    // Touch event listeners for swipe
    [codeCard, statsCard].forEach(card => {
        if (!card) return;

        card.addEventListener('touchstart', (e) => {
            // Don't interfere with control buttons
            if (e.target.closest('[data-action]')) return;

            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });

        card.addEventListener('touchend', (e) => {
            // Don't interfere with control buttons
            if (e.target.closest('[data-action]')) return;

            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            handleSwipe(card);
        }, { passive: true });
    });

    // Click cards to bring them to front
    codeCard?.addEventListener('click', (e) => {
        // Only bring to front if not clicking a control button
        if (!e.target.closest('[data-action]')) {
            bringToFront(codeCard);
        }
    });

    statsCard?.addEventListener('click', (e) => {
        // Only bring to front if not clicking a control button
        if (!e.target.closest('[data-action]')) {
            bringToFront(statsCard);
        }
    });

    // Handle all window control clicks
    document.addEventListener('click', (e) => {
        const action = e.target.dataset.action;
        if (!action) return;

        switch(action) {
            case 'close':
                handleClose();
                break;
            case 'close-stats':
                handleCloseStats();
                break;
            case 'minimize':
                handleMinimize();
                break;
            case 'minimize-stats':
                handleMinimizeStats();
                break;
            case 'maximize':
                handleMaximize();
                break;
            case 'maximize-stats':
                handleMaximizeStats();
                break;
            case 'restore-code':
                handleRestoreCode();
                break;
            case 'close-modal':
                handleCloseModal();
                break;
            case 'minimize-modal':
                handleMinimizeFromModal();
                break;
            case 'restore-size':
                handleRestoreSize();
                break;
            case 'close-stats-modal':
                handleCloseStatsModal();
                break;
            case 'minimize-stats-modal':
                handleMinimizeFromStatsModal();
                break;
            case 'restore-stats-size':
                handleRestoreStatsSize();
                break;
        }
    });

    // Restore from code tab
    codeTab?.addEventListener('click', (e) => {
        if (!e.target.closest('.tab-restore')) {
            handleRestoreCodeFromTab();
        }
    });

    codeTab?.querySelector('.tab-restore')?.addEventListener('click', (e) => {
        e.stopPropagation();
        handleRestoreCodeFromTab();
    });

    // Restore from stats tab
    statsTab?.addEventListener('click', (e) => {
        if (!e.target.closest('.tab-restore')) {
            handleRestoreStats();
        }
    });

    statsTab?.querySelector('.tab-restore')?.addEventListener('click', (e) => {
        e.stopPropagation();
        handleRestoreStats();
    });

    // Close modals when clicking backdrop
    codeModal?.querySelector('.modal-backdrop')?.addEventListener('click', handleCloseModal);
    statsModal?.querySelector('.modal-backdrop')?.addEventListener('click', handleCloseStatsModal);

    // Close Button - Hide code card completely (no tab)
    function handleClose() {
        codeCard.style.transition = 'all 0.4s ease-out';
        codeCard.style.transform = 'scale(0.8)';
        codeCard.style.opacity = '0';

        setTimeout(() => {
            codeCard.classList.add('hidden');
            codeCard.style.transform = '';
            codeCard.style.opacity = '';
            codeCard.style.transition = '';
            checkAndShowEasterEgg();
        }, 400);
    }

    // Close Stats Button - Hide stats card completely (no tab)
    function handleCloseStats() {
        statsCard.style.transition = 'all 0.4s ease-out';
        statsCard.style.transform = 'scale(0.8)';
        statsCard.style.opacity = '0';

        setTimeout(() => {
            statsCard.classList.add('hidden');
            statsCard.style.transform = '';
            statsCard.style.opacity = '';
            statsCard.style.transition = '';
            checkAndShowEasterEgg();
        }, 400);
    }

    // Restore Code Button - Restore code card from green button on stats
    function handleRestoreCode() {
        codeCard.classList.remove('hidden');
        codeCard.style.transform = 'scale(0.95)';
        codeCard.style.opacity = '0';
        bringToFront(codeCard);

        requestAnimationFrame(() => {
            codeCard.style.transition = 'all 0.3s ease-out';
            codeCard.style.transform = '';
            codeCard.style.opacity = '1';

            setTimeout(() => {
                codeCard.style.transition = '';
            }, 300);
        });
    }

    // Restore Stats from tab
    function handleRestoreStats() {
        statsTab.classList.add('hidden');

        statsCard.classList.remove('hidden');
        statsCard.style.transform = 'scale(0.8)';
        statsCard.style.opacity = '0';
        bringToFront(statsCard);

        requestAnimationFrame(() => {
            statsCard.style.transition = 'all 0.4s ease-out';
            statsCard.style.transform = '';
            statsCard.style.opacity = '1';

            setTimeout(() => {
                statsCard.style.transition = '';
            }, 400);
        });
    }

    // Minimize Button - Hide only code card, show tab, reveal stats behind
    function handleMinimize() {
        codeCard.style.transition = 'all 0.4s ease-out';
        codeCard.style.transform = 'scale(0.8)';
        codeCard.style.opacity = '0';

        setTimeout(() => {
            codeCard.classList.add('hidden');
            codeCard.style.transform = '';
            codeCard.style.opacity = '';
            codeCard.style.transition = '';
            codeTab.classList.remove('hidden');
            checkAndShowEasterEgg();
        }, 400);
    }

    // Minimize Stats Button - Hide only stats card, show tab
    function handleMinimizeStats() {
        statsCard.style.transition = 'all 0.4s ease-out';
        statsCard.style.transform = 'scale(0.8)';
        statsCard.style.opacity = '0';

        setTimeout(() => {
            statsCard.classList.add('hidden');
            statsCard.style.transform = '';
            statsCard.style.opacity = '';
            statsCard.style.transition = '';
            statsTab.classList.remove('hidden');
            checkAndShowEasterEgg();
        }, 400);
    }

    // Restore Code from tab
    function handleRestoreCodeFromTab() {
        codeTab.classList.add('hidden');

        codeCard.classList.remove('hidden');
        codeCard.style.transform = 'scale(0.8)';
        codeCard.style.opacity = '0';
        bringToFront(codeCard);

        requestAnimationFrame(() => {
            codeCard.style.transition = 'all 0.4s ease-out';
            codeCard.style.transform = '';
            codeCard.style.opacity = '1';

            setTimeout(() => {
                codeCard.style.transition = '';
            }, 400);
        });
    }

    // Maximize Button - Show modal
    function handleMaximize() {
        codeModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    // Close Modal
    function handleCloseModal() {
        codeModal.classList.add('hidden');
        document.body.style.overflow = '';
    }

    // Minimize from Modal
    function handleMinimizeFromModal() {
        codeModal.classList.add('hidden');
        document.body.style.overflow = '';
        codeCard.classList.add('hidden');
        codeTab.classList.remove('hidden');
        checkAndShowEasterEgg();
    }

    // Restore Size (from maximized to normal)
    function handleRestoreSize() {
        codeModal.classList.add('hidden');
        document.body.style.overflow = '';
    }

    // Stats Modal Handlers

    // Maximize Stats Button - Show stats modal
    function handleMaximizeStats() {
        statsModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    // Close Stats Modal
    function handleCloseStatsModal() {
        statsModal.classList.add('hidden');
        document.body.style.overflow = '';
    }

    // Minimize from Stats Modal
    function handleMinimizeFromStatsModal() {
        statsModal.classList.add('hidden');
        document.body.style.overflow = '';
        statsCard.classList.add('hidden');
        statsTab.classList.remove('hidden');
        checkAndShowEasterEgg();
    }

    // Restore Stats Size (from maximized to normal)
    function handleRestoreStatsSize() {
        statsModal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

// ====================================
// BACK TO TOP BUTTON
// ====================================
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');

    if (!backToTopBtn) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ====================================
// CONSOLE MESSAGE
// ====================================
console.log('%c👋 Hi there!', 'font-size: 20px; font-weight: bold; color: #7780F8;');
console.log('%cInterested in the code? Check out my GitHub!', 'font-size: 14px; color: #b8b8d1;');
console.log('%chttps://github.com/DBray33', 'font-size: 14px; color: #44DCDF;');
console.log('%c💡 Psst... the code card might be more interactive than you think', 'font-size: 12px; color: #7780F8; font-style: italic;');
