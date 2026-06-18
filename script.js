// Gallery Images Data - UPDATED WITH YOUR DRIVE LINKS
// Updated Image Array with all 5 photos
const galleryData = [
    'https://drive.google.com/thumbnail?sz=w1920&id=1DXi5UUsJGdjQT2SymIbXpcYdkLxtqmu-',
    'https://drive.google.com/thumbnail?sz=w1920&id=1nCqNpyiNmUeTKdEfXe1gb2YKfmeXkrxS',
    'https://drive.google.com/thumbnail?sz=w1920&id=1vSNErTasHa6z1WDniQmAPgiCUhPd_i_q',
    'https://drive.google.com/thumbnail?sz=w1920&id=1Zs6H1CMl4_D2at6eCoPT_-WgRB-drH1n',
    'https://drive.google.com/thumbnail?sz=w1920&id=18nEs9zOMogKlqSZqWKZY7aHZFklEXoPV'
    
];

let currentImageIndex = 0;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initScrollReveal();
    initTiltCards();
    initSmoothScroll();
});

// Particle System for Hero Background
function initParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;

    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        container.appendChild(particle);
    }
}

// Intersection Observer for Scroll Reveal
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// 3D Tilt Effect for Cards
function initTiltCards() {
    const cards = document.querySelectorAll('.tilt-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// Smooth Scroll for Anchor Links
function initSmoothScroll() {
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
}

// Lightbox Functions
function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    const counter = document.getElementById('lightbox-counter');
    
    if(!lightbox || !img) return; // Guard clause

    img.src = galleryImages[index].src;
    counter.textContent = `${index + 1} / ${galleryImages.length}`;
    
    lightbox.classList.remove('hidden');
    setTimeout(() => {
        lightbox.classList.add('active');
    }, 10);
    
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if(!lightbox) return;

    lightbox.classList.remove('active');
    
    setTimeout(() => {
        lightbox.classList.add('hidden');
        document.body.style.overflow = '';
    }, 300);
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    updateLightboxImage();
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightboxImage();
}

function updateLightboxImage() {
    const img = document.getElementById('lightbox-img');
    const counter = document.getElementById('lightbox-counter');
    
    img.style.opacity = '0';
    setTimeout(() => {
        img.src = galleryImages[currentImageIndex].src;
        counter.textContent = `${currentImageIndex + 1} / ${galleryImages.length}`;
        img.style.opacity = '1';
    }, 200);
}

// Keyboard Navigation for Lightbox
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox || lightbox.classList.contains('hidden')) return;
    
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
});

// Touch/Swipe Support for Mobile Gallery
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox || lightbox.classList.contains('hidden')) return;
    
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            nextImage();
        } else {
            prevImage();
        }
    }
}

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-cube');
    
    parallaxElements.forEach((el, index) => {
        const speed = 0.5 + (index * 0.1);
        el.style.transform = `translateY(${scrolled * speed}px) rotate(${45 + scrolled * 0.1}deg)`;
    });
});

// Mobile Menu Toggle
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if(menu) menu.classList.toggle('active');
}

// Close mobile menu when clicking on a link
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        const menu = document.getElementById('mobile-menu');
        if(menu) menu.classList.remove('active');
    });
});
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const serviceID = 'service_4uoflwc';
    const templateID = 'template_gxgyu7c';
    const statusDiv = document.getElementById('form-status');

    // Show a temporary loading message
    statusDiv.className = 'status-message'; 
    statusDiv.style.display = 'block';
    statusDiv.style.color = '#ffffff';
    statusDiv.innerText = 'Sending...';

    emailjs.sendForm(serviceID, templateID, this)
        .then(function() {
            // Success styling
            statusDiv.className = 'status-message success';
            statusDiv.innerText = 'Message sent successfully! ✓';
            document.getElementById('contact-form').reset(); // Clear form
        }, function(error) {
            // Error styling
            statusDiv.className = 'status-message error';
            statusDiv.innerText = 'Failed to send message. Please try again.';
            console.log('EmailJS Error:', error);
        });
});
document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('scroll-autoplay-video');
    
    if (video) {
        // Create an observer to watch when the video enters the screen
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Video is on screen -> Play it!
                    video.play().catch(error => {
                        console.log("Autoplay prevented by browser, waiting for user click:", error);
                    });
                } else {
                    // Video went off screen -> Pause it to save performance
                    video.pause();
                }
            });
        }, {
            threshold: 0.3 // Starts playing when 30% of the video is visible
        });

        observer.observe(video);
    }
});
// Threads Preloader Controller
window.addEventListener('load', () => {
  const loader = document.querySelector('.loader-wrap');
  
  setTimeout(() => {
    loader.style.transition = 'opacity 0.4s ease';
    loader.style.opacity = '0';
    loader.style.pointerEvents = 'none'; // Unlocks page interactions instantly
    
    setTimeout(() => {
      loader.style.display = 'none';
    }, 400);
  }, 2000); // Keeps the spinning sequence active for a crisp 2-second experience
});