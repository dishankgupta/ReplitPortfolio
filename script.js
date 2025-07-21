// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar');

// Theme Management
class ThemeManager {
  constructor() {
    this.currentTheme = localStorage.getItem('theme') || this.getAutoTheme();
    this.init();
  }

  init() {
    this.setTheme(this.currentTheme);
    this.updateThemeIcon();
    themeToggle.addEventListener('click', () => this.toggleTheme());
    
    // Set up auto theme switching based on time
    this.setupAutoTheme();
  }

  getAutoTheme() {
    const hour = new Date().getHours();
    // Dark theme from 6 PM to 6 AM (18:00 to 06:00)
    return (hour >= 18 || hour < 6) ? 'dark' : 'light';
  }

  setupAutoTheme() {
    // Check every minute if theme should auto-switch
    setInterval(() => {
      const autoTheme = this.getAutoTheme();
      if (!localStorage.getItem('theme-manual-override')) {
        if (autoTheme !== this.currentTheme) {
          this.setTheme(autoTheme);
          this.updateThemeIcon();
        }
      }
    }, 60000); // Check every minute
  }

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    this.currentTheme = theme;
    localStorage.setItem('theme', theme);
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
    this.updateThemeIcon();
    
    // Set manual override flag when user manually changes theme
    localStorage.setItem('theme-manual-override', 'true');
    
    // Add a subtle animation effect
    document.body.style.transition = 'all 0.3s ease';
    setTimeout(() => {
      document.body.style.transition = '';
    }, 300);
  }

  updateThemeIcon() {
    const themeIcon = document.querySelector('.theme-icon');
    themeIcon.textContent = this.currentTheme === 'light' ? '🌙' : '☀️';
    
    // Add rotation animation
    themeIcon.style.transform = 'rotate(360deg)';
    setTimeout(() => {
      themeIcon.style.transform = 'rotate(0deg)';
    }, 300);
  }
}

// Navigation Management
class NavigationManager {
  constructor() {
    this.init();
  }

  init() {
    // Mobile menu toggle
    hamburger.addEventListener('click', () => this.toggleMobileMenu());
    
    // Close mobile menu when clicking nav links
    navLinks.forEach(link => {
      link.addEventListener('click', () => this.closeMobileMenu());
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) {
        this.closeMobileMenu();
      }
    });

    // Navbar scroll effect
    this.handleNavbarScroll();
  }

  toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  }

  closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  }

  handleNavbarScroll() {
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      
      // Add/remove scrolled class for styling
      if (currentScrollY > 100) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      
      // Hide/show navbar on scroll
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        navbar.style.transform = 'translateY(-100%)';
      } else {
        navbar.style.transform = 'translateY(0)';
      }
      
      lastScrollY = currentScrollY;
    });
  }
}

// Smooth Scrolling
class SmoothScroll {
  constructor() {
    this.init();
  }

  init() {
    // Handle navigation links
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => this.handleClick(e));
    });

    // Handle hero buttons
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    heroButtons.forEach(button => {
      if (button.getAttribute('href').startsWith('#')) {
        button.addEventListener('click', (e) => this.handleClick(e));
      }
    });
  }

  handleClick(e) {
    const href = e.target.getAttribute('href');
    
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
        
        // Update active nav link
        this.updateActiveNavLink(href);
      }
    }
  }

  updateActiveNavLink(activeHref) {
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === activeHref) {
        link.classList.add('active');
      }
    });
  }
}

// Intersection Observer for animations and active navigation
class ScrollAnimations {
  constructor() {
    this.observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px',
      threshold: 0.1
    };
    this.init();
  }

  init() {
    this.createObserver();
    this.observeElements();
  }

  createObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          
          // Update active navigation
          const sectionId = entry.target.id;
          if (sectionId) {
            this.updateActiveNavigation(sectionId);
          }
        }
      });
    }, this.observerOptions);
  }

  observeElements() {
    // Observe sections for navigation
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => this.observer.observe(section));

    // Observe elements for animations
    const animateElements = document.querySelectorAll('.project-card, .skill-item, .contact-item');
    animateElements.forEach(element => this.observer.observe(element));
  }

  updateActiveNavigation(sectionId) {
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${sectionId}`) {
        link.classList.add('active');
      }
    });
  }
}

// Project Card Animations
class ProjectAnimations {
  constructor() {
    this.init();
  }

  init() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
      card.addEventListener('mouseenter', () => this.handleMouseEnter(card));
      card.addEventListener('mouseleave', () => this.handleMouseLeave(card));
    });
  }

  handleMouseEnter(card) {
    const projectImage = card.querySelector('.project-image svg');
    if (projectImage) {
      projectImage.style.transform = 'scale(1.05)';
      projectImage.style.transition = 'transform 0.3s ease';
    }
  }

  handleMouseLeave(card) {
    const projectImage = card.querySelector('.project-image svg');
    if (projectImage) {
      projectImage.style.transform = 'scale(1)';
    }
  }
}

// Utility Functions
class Utils {
  static debounce(func, wait) {
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

  static throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  static addLoadingAnimation() {
    // Add loading animation for any async operations
    document.body.classList.add('loading');
    setTimeout(() => {
      document.body.classList.remove('loading');
    }, 500);
  }
}

// Performance Optimization
class PerformanceOptimizer {
  constructor() {
    this.init();
  }

  init() {
    // Optimize scroll events
    const optimizedScrollHandler = Utils.throttle(() => {
      // Any scroll-related operations
    }, 16); // ~60fps

    window.addEventListener('scroll', optimizedScrollHandler);

    // Preload critical images
    this.preloadImages();

    // Add resize handler
    const optimizedResizeHandler = Utils.debounce(() => {
      this.handleResize();
    }, 250);

    window.addEventListener('resize', optimizedResizeHandler);
  }

  preloadImages() {
    // Preload any critical images
    const criticalImages = [
      // Add any critical image URLs here
    ];

    criticalImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }

  handleResize() {
    // Handle responsive behavior on resize
    const isMobile = window.innerWidth <= 768;
    document.body.classList.toggle('mobile', isMobile);
  }
}

// Form Validation (if contact form is added later)
class FormValidator {
  static validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static validateForm(formData) {
    const errors = [];
    
    if (!formData.name || formData.name.trim().length < 2) {
      errors.push('Name must be at least 2 characters long');
    }
    
    if (!this.validateEmail(formData.email)) {
      errors.push('Please enter a valid email address');
    }
    
    if (!formData.message || formData.message.trim().length < 10) {
      errors.push('Message must be at least 10 characters long');
    }
    
    return {
      isValid: errors.length === 0,
      errors: errors
    };
  }
}

// Main App Initialization
class PortfolioApp {
  constructor() {
    this.init();
  }

  init() {
    // Initialize all components
    this.themeManager = new ThemeManager();
    this.navigationManager = new NavigationManager();
    this.smoothScroll = new SmoothScroll();
    this.scrollAnimations = new ScrollAnimations();
    this.projectAnimations = new ProjectAnimations();
    this.performanceOptimizer = new PerformanceOptimizer();

    // Add custom CSS for animations
    this.addAnimationStyles();

    // Initialize page
    this.handlePageLoad();

    // Add accessibility enhancements
    this.enhanceAccessibility();
  }

  addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .animate-in {
        animation: slideInUp 0.6s ease-out forwards;
      }
      
      @keyframes slideInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .loading {
        cursor: wait;
      }
      
      .navbar.scrolled {
        background: rgba(var(--bg-color-rgb, 255, 255, 255), 0.95);
        backdrop-filter: blur(20px);
      }
    `;
    document.head.appendChild(style);
  }

  handlePageLoad() {
    // Add page load animation
    window.addEventListener('load', () => {
      document.body.classList.add('loaded');
      Utils.addLoadingAnimation();
    });

    // Handle initial active navigation
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }

  enhanceAccessibility() {
    // Add skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
      position: absolute;
      top: -40px;
      left: 6px;
      background: var(--accent-color);
      color: white;
      padding: 8px;
      text-decoration: none;
      border-radius: 4px;
      z-index: 1000;
      transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
      skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
      skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Add main landmark
    const heroSection = document.getElementById('home');
    if (heroSection) {
      heroSection.setAttribute('role', 'main');
      heroSection.id = 'main';
    }

    // Enhance keyboard navigation
    this.enhanceKeyboardNavigation();
  }

  enhanceKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      // ESC key closes mobile menu
      if (e.key === 'Escape') {
        this.navigationManager.closeMobileMenu();
      }
      
      // Arrow keys for navigation
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const currentSection = this.getCurrentSection();
        const sections = ['home', 'about', 'projects', 'contact'];
        const currentIndex = sections.indexOf(currentSection);
        
        let nextIndex;
        if (e.key === 'ArrowDown') {
          nextIndex = (currentIndex + 1) % sections.length;
        } else {
          nextIndex = currentIndex > 0 ? currentIndex - 1 : sections.length - 1;
        }
        
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          const nextSection = document.getElementById(sections[nextIndex]);
          if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    });
  }

  getCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      if (section.offsetTop <= scrollPosition) {
        return section.id;
      }
    }
    
    return 'home';
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioApp();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Page is hidden - pause any animations or processes
    document.body.classList.add('page-hidden');
  } else {
    // Page is visible - resume animations or processes
    document.body.classList.remove('page-hidden');
  }
});

// Error handling
window.addEventListener('error', (e) => {
  console.error('JavaScript Error:', e.error);
  // You could implement user-friendly error reporting here
});

// Service worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Service worker registration would go here if needed
    console.log('Portfolio app loaded successfully');
  });
}
