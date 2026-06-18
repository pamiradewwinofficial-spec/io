class NeonFooter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    background: #0a0a0a;
                    border-top: 1px solid rgba(255, 107, 53, 0.2);
                }
                
                footer {
                    max-width: 7xl;
                    margin: 0 auto;
                    padding: 3rem 2rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 2rem;
                }
                
                .footer-logo {
                    font-family: 'Orbitron', sans-serif;
                    font-size: 1.5rem;
                    font-weight: 900;
                    color: #FF6B35;
                    text-decoration: none;
                    letter-spacing: 0.05em;
                    text-shadow: 0 0 20px rgba(255, 107, 53, 0.3);
                }
                
                .footer-text {
                    color: #666;
                    font-family: 'Inter', sans-serif;
                    font-size: 0.9rem;
                    text-align: center;
                }
                
                .footer-links {
                    display: flex;
                    gap: 2rem;
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                
                .footer-links a {
                    color: #999;
                    text-decoration: none;
                    font-family: 'Inter', sans-serif;
                    font-size: 0.9rem;
                    transition: color 0.3s ease;
                    position: relative;
                }
                
                .footer-links a::after {
                    content: '';
                    position: absolute;
                    bottom: -4px;
                    left: 0;
                    width: 0;
                    height: 1px;
                    background: #FF6B35;
                    transition: width 0.3s ease;
                }
                
                .footer-links a:hover {
                    color: #FF6B35;
                }
                
                .footer-links a:hover::after {
                    width: 100%;
                }
                
                .copyright {
                    color: #444;
                    font-family: 'Inter', sans-serif;
                    font-size: 0.8rem;
                    margin-top: 1rem;
                }
                
                .back-to-top {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    border: 1px solid rgba(255, 107, 53, 0.3);
                    background: transparent;
                    color: #FF6B35;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                }
                
                .back-to-top:hover {
                    background: rgba(255, 107, 53, 0.1);
                    border-color: #FF6B35;
                    transform: translateY(-3px);
                    box-shadow: 0 5px 20px rgba(255, 107, 53, 0.3);
                }
                
                @media (max-width: 768px) {
                    .footer-links {
                        flex-direction: column;
                        gap: 1rem;
                        text-align: center;
                    }
                }
            </style>
            
            <footer>
                <a href="#hero" class="footer-logo">NEON PRISM</a>
                
                <ul class="footer-links">
                    <li><a href="#about">About</a></li>
                    <li><a href="#gallery">Gallery</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
                
                <p class="footer-text">Crafting digital experiences at the speed of light.</p>
                
                <button class="back-to-top" onclick="window.scrollTo({top: 0, behavior: 'smooth'})" aria-label="Back to top">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="18 15 12 9 6 15"></polyline>
                    </svg>
                </button>
                
                <p class="copyright">© 2024 Neon Prism Portfolio. All rights reserved.</p>
            </footer>
        `;
    }
}

customElements.define('neon-footer', NeonFooter);