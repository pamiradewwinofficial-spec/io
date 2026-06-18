// ---------- Ember particle field ----------
const canvas = document.getElementById('embers');
const ctx = canvas.getContext('2d');

let particles = [];
const PARTICLE_COUNT = 70;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Ember {
  constructor() {
    this.reset(true);
  }
  reset(initial = false) {
    this.x = Math.random() * canvas.width;
    this.y = initial ? Math.random() * canvas.height : canvas.height + 10;
    this.size = Math.random() * 2.2 + 0.6;
    this.speedY = Math.random() * 0.6 + 0.15;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.life = Math.random() * 0.6 + 0.4;
    this.flicker = Math.random() * 0.02 + 0.01;
    this.hue = Math.random() * 25 + 14; // orange range
    this.opacity = Math.random() * 0.5 + 0.3;
  }
  update() {
    this.y -= this.speedY;
    this.x += this.speedX + Math.sin(this.y * 0.01) * 0.3;
    this.life -= this.flicker * 0.05;
    if (this.y < -10 || this.life <= 0) {
      this.reset();
    }
  }
  draw() {
    ctx.beginPath();
    const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 4);
    grad.addColorStop(0, `hsla(${this.hue}, 100%, 60%, ${this.opacity})`);
    grad.addColorStop(1, `hsla(${this.hue}, 100%, 50%, 0)`);
    ctx.fillStyle = grad;
    ctx.arc(this.x, this.y, this.size * 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = `hsla(${this.hue}, 100%, 75%, ${this.opacity})`;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Ember());
  }
}
initParticles();

let animationActive = true;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function animate() {
  if (!animationActive) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}

if (!reduceMotion) {
  animate();
} else {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// pause animation when tab is hidden, for performance
document.addEventListener('visibilitychange', () => {
  animationActive = document.visibilityState === 'visible' && !reduceMotion;
  if (animationActive) animate();
});

// ---------- Scroll reveal ----------
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => observer.observe(el));
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
// Wait for the entire window/page to finish loading
window.addEventListener('load', function() {
    // Find the loader element on the page
    const loader = document.querySelector('.loader-wrap');
    
    if (loader) {
        // Add a smooth fade-out effect using CSS transitions
        loader.style.transition = "opacity 0.5s ease";
        loader.style.opacity = "0";
        
        // Completely remove it from the page layout after it fades out
        setTimeout(() => {
            loader.style.display = "none";
        }, 500); 
    }
});
// Hide the loader as soon as the HTML layout is ready
document.addEventListener('DOMContentLoaded', function() {
    const loader = document.querySelector('.loader-wrap');
    if (loader) {
        loader.style.transition = "opacity 0.4s ease";
        loader.style.opacity = "0";
        setTimeout(() => {
            loader.style.display = "none";
        }, 400);
    }
});

