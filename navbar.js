class NeonNavbar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 1000;
                }
                
                nav {
                    background: rgba(10, 10, 10, 0.8);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border-bottom: 1px solid rgba(255, 107, 53, 0.2);
                    transition: all 0.3s ease;
                }
                
                .nav-container {
                    max-width: 7xl;
                    margin: 0 auto;
                    padding: 1rem 2rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .logo {
                    font-family: 'Orbitron', sans-serif;
                    font-size: 1.5rem;
                    font-weight: 900;
                    color: #FF6B35;
                    text-decoration: none;
                    letter-spacing: 0.05em;
                    text-shadow: 0 0 20px rgba(255, 107, 53, 0.5);
                    transition: all 0.3s ease;
                }
                
                .logo:hover {
                    text-shadow: 0 0 30px rgba(255, 107, 53, 0.8);
                    transform: scale(1.05);
                }
                
                .nav-links {
                    display: flex;
                    gap: 2rem;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                }
                
                .nav-links a {
                    color: #e5e5e5;
                    text-decoration: none;
                    font-family: 'Inter', sans-serif;
                    font-weight: 500;
                    font-size: 0.95rem;
                    position: relative;
                    padding: 0.5rem 0;
                    transition: color 0.3s ease;
                }
                
                .nav-links a::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 0;
                    height: 2px;
                    background: linear-gradient(90deg, #FF6B35, #FF4500);
                    transition: width 0.3s ease;
                    box-shadow: 0 0 10px rgba(255, 107, 53, 0.5);
                }
                
                .nav-links a:hover {
                    color: #FF6B35;
                }
                
                .nav-links a:hover::after {
                    width: 100%;
                }
                
                .mobile-menu-btn {
                    display: none;
                    background: none;
                    border: none;
                    color: #FF6B35;
                    cursor: pointer;
                    padding: 0.5rem;
                }
                
                @media (max-width: 768px) {
                    .nav-links {
                        display: none;
                    }
                    
                    .mobile-menu-btn {
                        display: block;
                    }
                }
                
                /* Mobile Menu Overlay */
                .mobile-menu {
                    position: fixed;
                    top: 0;
                    right: -100%;
                    width: 80%;
                    max-width: 300px;
                    height: 100vh;
                    background: rgba(10, 10, 10, 0.98);
                    backdrop-filter: blur(20px);
                    border-left: 1px solid rgba(255, 107, 53, 0.3);
                    transition: right 0.3s ease;
                    padding: 5rem 2rem 2rem;
                    z-index: 999;
                }
                
                .mobile-menu.active {
                    right: 0;
                }
                
                .mobile-menu ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }
                
                .mobile-menu a {
                    color: #e5e5e5;
                    text-decoration: none;
                    font-family: 'Orbitron', sans-serif;
                    font-size: 1.2rem;
                    display: block;
                    padding: 0.5rem 0;
                    border-bottom: 1px solid rgba(255, 107, 53, 0.2);
                    transition: all 0.3s ease;
                }
                
                .mobile-menu a:hover {
                    color: #FF6B35;
                    padding-left: 1rem;
                    border-bottom-color: #FF6B35;
                    text-shadow: 0 0 10px rgba(255, 107, 53, 0.5);
                }
                
                .close-menu {
                    position: absolute;
                    top: 1.5rem;
                    right: 1.5rem;
                    background: none;
                    border: none;
                    color: #FF6B35;
                    cursor: pointer;
                }
                
                .overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.8);
                    opacity: 0;
                    pointer-events: none;
                    transition: opacity 0.3s ease;
                    z-index: 998;
                }
                
                .overlay.active {
                    opacity: 1;
                    pointer-events: all;
                }
            </style>
            
            <nav>
                <div class="nav-container">
                    <a href="#hero" class="logo">NEON PRISM</a>
                    
                    <ul class="nav-links">
                        <li><a href="#about">About</a></li>
                        <li><a href="#gallery">Gallery</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                    
                    <button class="mobile-menu-btn" onclick="toggleMobileMenu()" aria-label="Toggle menu">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </button>
                </div>
            </nav>
            
            <div class="overlay" id="overlay" onclick="toggleMobileMenu()"></div>
            
            <div class="mobile-menu" id="mobile-menu">
                <button class="close-menu" onclick="toggleMobileMenu()" aria-label="Close menu">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
                <ul>
                    <li><a href="#about" onclick="toggleMobileMenu()">About</a></li>
                    <li><a href="#gallery" onclick="toggleMobileMenu()">Gallery</a></li>
                    <li><a href="#contact" onclick="toggleMobileMenu()">Contact</a></li>
                </ul>
            </div>
        `;
    }
}

customElements.define('neon-navbar', NeonNavbar);

// Mobile menu toggle function needs to be global
window.toggleMobileMenu = function() {
    const menu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('overlay');
    
    if (menu && overlay) {
        menu.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    }
};