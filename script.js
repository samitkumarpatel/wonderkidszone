// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    
    // Add a small delay before scrolling to ensure menu is closed
    setTimeout(() => {
        const target = document.querySelector(n.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }, 100);
}));

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Activities Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.activity-slide');
const totalSlides = slides.length;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
}

function changeSlide(direction) {
    currentSlide += direction;
    
    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }
    
    showSlide(currentSlide);
}

// Auto-advance slides
setInterval(() => {
    changeSlide(1);
}, 5000);

// Enhanced Form Handling
document.getElementById('inquiryForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    
    // Show success message
    showNotification('Thank you for your inquiry! We will contact you soon.', 'success');
    
    // Reset form
    this.reset();
});

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show success message
    showNotification('Message sent successfully! We will get back to you soon.', 'success');
    
    // Reset form
    this.reset();
});

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
}

// Gallery Filter Enhancement
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.feature-item, .program-card, .gallery-item');
    animateElements.forEach(element => {
        observer.observe(element);
    });
});

// Enhanced Statistics Counter
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + (target >= 100 ? '%' : '+');
    }, 20);
}

// Start counter animation when stats section is visible
const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-item h3');
                statNumbers.forEach(stat => {
                    const text = stat.textContent;
                    const number = parseInt(text.replace(/\D/g, ''));
                    if (number) {
                        stat.textContent = '0';
                        animateCounter(stat, number);
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// Enhanced Scroll Effects
let ticking = false;

function updateScrollEffects() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
    
    ticking = false;
}

function requestScrollUpdate() {
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
}

window.addEventListener('scroll', requestScrollUpdate);

// Enhanced Mobile Experience
function initMobileOptimizations() {
    // Add touch feedback for buttons
    const buttons = document.querySelectorAll('.btn, .filter-btn, .carousel-btn');
    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
    
    // Optimize carousel for touch
    let isDown = false;
    let startX;
    let scrollLeft;
    
    const carousel = document.querySelector('.hero-carousel');
    if (carousel) {
        carousel.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        });
        
        carousel.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.touches[0].pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2;
            carousel.scrollLeft = scrollLeft - walk;
        });
        
        carousel.addEventListener('touchend', () => {
            isDown = false;
        });
    }
}

// Initialize mobile optimizations
if ('ontouchstart' in window) {
    initMobileOptimizations();
}

// Video overlay functionality
document.addEventListener('DOMContentLoaded', () => {
    const videoContainer = document.querySelector('.video-container');
    
    // Check if video container exists
    if (!videoContainer) return;
    
    const video = videoContainer.querySelector('video');
    const overlay = videoContainer.querySelector('.video-overlay');
    
    // Only add event listeners if video element exists
    if (video && overlay) {
        overlay.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                overlay.style.opacity = '0';
            } else {
                video.pause();
                overlay.style.opacity = '1';
            }
        });
        
        video.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                overlay.style.opacity = '0';
            } else {
                video.pause();
                overlay.style.opacity = '1';
            }
        });
        
        video.addEventListener('ended', () => {
            overlay.style.opacity = '1';
        });
    } else if (overlay) {
        // If there's no video but there's an overlay, make it clickable for placeholder
        overlay.addEventListener('click', () => {
            // Show a placeholder message or do nothing
            console.log('Video placeholder clicked - replace with actual video element');
        });
    }
});

// Hero Carousel JavaScript
let heroCurrentSlide = 0;
let heroSlides = [];
let heroDots = [];
let heroAutoSlideInterval;
let heroProgressBar;

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initHeroCarousel();
});

function initHeroCarousel() {
    heroSlides = document.querySelectorAll('.carousel-slide');
    heroDots = document.querySelectorAll('.carousel-dots .dot');
    
    // Create progress bar
    heroProgressBar = document.createElement('div');
    heroProgressBar.className = 'carousel-progress';
    document.querySelector('.hero-carousel').appendChild(heroProgressBar);
    
    // Start auto-scroll
    startHeroAutoSlide();
    
    // Pause on hover
    const carousel = document.querySelector('.hero-carousel');
    carousel.addEventListener('mouseenter', stopHeroAutoSlide);
    carousel.addEventListener('mouseleave', startHeroAutoSlide);
}

function heroCarouselGoTo(slideIndex) {
    // Remove active classes
    heroSlides[heroCurrentSlide].classList.remove('active');
    heroDots[heroCurrentSlide].classList.remove('active');
    
    // Update current slide
    heroCurrentSlide = slideIndex;
    
    // Add active classes
    heroSlides[heroCurrentSlide].classList.add('active');
    heroDots[heroCurrentSlide].classList.add('active');
    
    // Reset auto-slide timer
    resetHeroAutoSlide();
}

function heroCarouselNext() {
    const nextSlide = (heroCurrentSlide + 1) % heroSlides.length;
    heroCarouselGoTo(nextSlide);
}

function heroCarouselPrev() {
    const prevSlide = (heroCurrentSlide - 1 + heroSlides.length) % heroSlides.length;
    heroCarouselGoTo(prevSlide);
}

function startHeroAutoSlide() {
    let progress = 0;
    const duration = 4000; // 4 seconds per slide
    const interval = 50; // Update progress every 50ms
    
    heroAutoSlideInterval = setInterval(() => {
        progress += interval;
        const progressPercent = (progress / duration) * 100;
        heroProgressBar.style.width = progressPercent + '%';
        
        if (progress >= duration) {
            heroCarouselNext();
            progress = 0;
            heroProgressBar.style.width = '0%';
        }
    }, interval);
}

function stopHeroAutoSlide() {
    if (heroAutoSlideInterval) {
        clearInterval(heroAutoSlideInterval);
        heroProgressBar.style.width = '0%';
    }
}

function resetHeroAutoSlide() {
    stopHeroAutoSlide();
    setTimeout(startHeroAutoSlide, 100);
}

// Touch/swipe support for mobile
let heroTouchStartX = 0;
let heroTouchEndX = 0;

document.querySelector('.hero-carousel').addEventListener('touchstart', (e) => {
    heroTouchStartX = e.changedTouches[0].screenX;
});

document.querySelector('.hero-carousel').addEventListener('touchend', (e) => {
    heroTouchEndX = e.changedTouches[0].screenX;
    handleHeroSwipe();
});

function handleHeroSwipe() {
    const swipeThreshold = 50;
    const diff = heroTouchStartX - heroTouchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            heroCarouselNext(); // Swipe left - next slide
        } else {
            heroCarouselPrev(); // Swipe right - previous slide
        }
    }
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const parallaxSpeed = 0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
});

// Add smooth hover effects for cards
document.querySelectorAll('.program-card, .fee-card, .feature-item').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
        this.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation
const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .btn {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(rippleStyles);

// Back to top button functionality
const backToTopButton = document.getElementById('backToTop');

if (backToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Floating Admission Button Functionality
document.addEventListener('DOMContentLoaded', function() {
    initFloatingAdmissionButton();
});

function initFloatingAdmissionButton() {
    const floatingBtn = document.getElementById('floatingAdmissionBtn');
    const modal = document.getElementById('admissionModal');
    
    // Show floating button after page loads
    setTimeout(() => {
        floatingBtn.style.opacity = '1';
        floatingBtn.style.transform = 'translateY(-50%) scale(1)';
    }, 2000);
    
    // Handle floating button click
    floatingBtn.addEventListener('click', openAdmissionModal);
    
    // Handle admission option clicks
    document.querySelectorAll('.admission-option').forEach(option => {
        option.addEventListener('click', function() {
            const program = this.getAttribute('data-program');
            handleAdmissionSelection(program, this);
        });
    });
    
    // Handle option button clicks
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const option = this.closest('.admission-option');
            const program = option.getAttribute('data-program');
            handleApplicationSubmission(program);
        });
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === this || e.target.classList.contains('modal-overlay')) {
            closeAdmissionModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeAdmissionModal();
        }
    });
}

function openAdmissionModal() {
    const modal = document.getElementById('admissionModal');
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Add analytics or tracking
    trackEvent('admission_modal_opened');
}

function closeAdmissionModal() {
    const modal = document.getElementById('admissionModal');
    modal.classList.remove('show');
    
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }, 300);
    
    // Reset any selected options
    document.querySelectorAll('.admission-option.selected').forEach(option => {
        option.classList.remove('selected');
    });
}

function handleAdmissionSelection(program, optionElement) {
    // Remove previous selections
    document.querySelectorAll('.admission-option.selected').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Add selected class
    optionElement.classList.add('selected');
    
    // Add selection styles
    optionElement.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    optionElement.style.color = 'white';
    optionElement.style.transform = 'scale(1.02)';
    
    // Reset after a moment
    setTimeout(() => {
        if (!optionElement.classList.contains('selected')) return;
        optionElement.style.background = '';
        optionElement.style.color = '';
        optionElement.style.transform = '';
    }, 2000);
    
    // Show program details
    showProgramDetails(program);
    
    // Track selection
    trackEvent('program_selected', { program: program });
}

function handleApplicationSubmission(program) {
    // Show confirmation
    showNotification(`Application initiated for ${formatProgramName(program)}! 🎉`, 'success');
    
    // Close modal after a delay
    setTimeout(() => {
        closeAdmissionModal();
    }, 1500);
    
    // Redirect to admission form with pre-filled program
    setTimeout(() => {
        redirectToAdmissionForm(program);
    }, 2000);
    
    // Track application start
    trackEvent('application_started', { program: program });
}

function showProgramDetails(program) {
    const programDetails = {
        playgroup: {
            name: 'Play Group',
            age: '18 months - 2.5 years',
            duration: 'Half Day (3 hours)',
            features: ['Sensory play', 'Basic motor skills', 'Social interaction'],
            fee: '₹2,000/month'
        },
        nursery: {
            name: 'Nursery',
            age: '2.5 - 3.5 years',
            duration: 'Half Day (4 hours)',
            features: ['Pre-academic skills', 'Creative activities', 'Language development'],
            fee: '₹2,500/month'
        },
        lkg: {
            name: 'L.K.G',
            age: '3.5 - 4.5 years',
            duration: 'Full Day (6 hours)',
            features: ['Academic foundation', 'Reading readiness', 'Mathematical concepts'],
            fee: '₹3,000/month'
        },
        ukg: {
            name: 'U.K.G',
            age: '4.5 - 6 years',
            duration: 'Full Day (7 hours)',
            features: ['School readiness', 'Advanced learning', 'Life skills'],
            fee: '₹3,500/month'
        },
        dance: {
            name: 'Dance Classes',
            age: '3+ years',
            duration: '1 hour/session',
            features: ['Classical dance', 'Modern dance', 'Performance skills'],
            fee: '₹1,000/month'
        },
        drawing: {
            name: 'Art & Drawing',
            age: '3+ years',
            duration: '1 hour/session',
            features: ['Creative expression', 'Different mediums', 'Art appreciation'],
            fee: '₹800/month'
        },
        music: {
            name: 'Music Classes',
            age: '4+ years',
            duration: '45 minutes/session',
            features: ['Vocal training', 'Instrumental', 'Music theory basics'],
            fee: '₹1,200/month'
        },
        drama: {
            name: 'Drama & Theatre',
            age: '4+ years',
            duration: '1 hour/session',
            features: ['Acting skills', 'Confidence building', 'Story telling'],
            fee: '₹900/month'
        },
        swimming: {
            name: 'Swimming',
            age: '4+ years',
            duration: '45 minutes/session',
            features: ['Water safety', 'Swimming techniques', 'Physical fitness'],
            fee: '₹1,500/month'
        },
        karate: {
            name: 'Karate Classes',
            age: '5+ years',
            duration: '1 hour/session',
            features: ['Self-defense', 'Discipline', 'Physical strength'],
            fee: '₹1,000/month'
        },
        football: {
            name: 'Football Training',
            age: '4+ years',
            duration: '1 hour/session',
            features: ['Team work', 'Physical fitness', 'Sports skills'],
            fee: '₹800/month'
        }
    };
    
    const details = programDetails[program];
    if (details) {
        // Create and show program details tooltip or update UI
        console.log(`Program selected: ${details.name}`, details);
    }
}

function formatProgramName(program) {
    const names = {
        playgroup: 'Play Group',
        nursery: 'Nursery',
        lkg: 'L.K.G',
        ukg: 'U.K.G',
        dance: 'Dance Classes',
        drawing: 'Art & Drawing',
        music: 'Music Classes',
        drama: 'Drama & Theatre',
        swimming: 'Swimming',
        karate: 'Karate Classes',
        football: 'Football Training'
    };
    return names[program] || program;
}

function redirectToAdmissionForm(program) {
    // Scroll to admission section with pre-filled program
    const admissionSection = document.getElementById('admission');
    if (admissionSection) {
        admissionSection.scrollIntoView({ behavior: 'smooth' });
        
        // Pre-fill program in form if exists
        setTimeout(() => {
            const programSelect = document.getElementById('program');
            if (programSelect) {
                programSelect.value = program;
                programSelect.dispatchEvent(new Event('change'));
            }
        }, 1000);
    }
}

function openGeneralAdmissionForm() {
    closeAdmissionModal();
    setTimeout(() => {
        const admissionSection = document.getElementById('admission');
        if (admissionSection) {
            admissionSection.scrollIntoView({ behavior: 'smooth' });
        }
    }, 300);
}

function trackEvent(eventName, properties = {}) {
    // Add your analytics tracking here
    console.log(`Event: ${eventName}`, properties);
    
    // Example: Google Analytics 4
    // gtag('event', eventName, properties);
    
    // Example: Facebook Pixel
    // fbq('track', eventName, properties);
}

// Hide floating button when in admission section
window.addEventListener('scroll', function() {
    const floatingBtn = document.getElementById('floatingAdmissionBtn');
    const admissionSection = document.getElementById('admission');
    
    if (admissionSection && floatingBtn) {
        const admissionRect = admissionSection.getBoundingClientRect();
        const isInAdmissionSection = admissionRect.top <= window.innerHeight && admissionRect.bottom >= 0;
        
        if (isInAdmissionSection) {
            floatingBtn.style.opacity = '0.3';
            floatingBtn.style.transform = 'translateY(-50%) scale(0.8)';
        } else {
            floatingBtn.style.opacity = '1';
            floatingBtn.style.transform = 'translateY(-50%) scale(1)';
        }
    }
});

// Enhanced option selection with visual feedback
function addOptionSelectionEffects() {
    document.querySelectorAll('.admission-option').forEach(option => {
        option.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        option.addEventListener('mouseleave', function() {
            if (!this.classList.contains('selected')) {
                this.style.transform = '';
            }
        });
    });
}

// Initialize enhanced effects when DOM is ready
document.addEventListener('DOMContentLoaded', addOptionSelectionEffects);
