// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar');

// Theme Management
class ThemeManager {
  constructor() {
    this.currentTheme = localStorage.getItem('theme') || 'light';
    this.init();
  }

  init() {
    this.setTheme(this.currentTheme);
    this.updateThemeIcon();
    themeToggle.addEventListener('click', () => this.toggleTheme());
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
    // In your PortfolioApp class init() method, add:
    this.devToBlogManager = new AdvancedDevToBlogManager();

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
// Advanced Blog Manager - Add this to your script.js file

class AdvancedDevToBlogManager {
  constructor() {
      this.apiUrl = 'https://dev.to/api/articles';
      this.username = 'dishankg';
      this.posts = [];
      this.currentPage = 1;
      this.postsPerPage = 6;
      this.isLoading = false;
      this.init();
  }

  async init() {
      this.createBlogModal();
      await this.loadBlogPosts();
      this.setupEventListeners();
  }

  async loadBlogPosts(page = 1) {
      if (this.isLoading) return;
      this.isLoading = true;

      try {
          const response = await fetch(`${this.apiUrl}?username=${this.username}&page=${page}&per_page=${this.postsPerPage}`);
          
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const posts = await response.json();
          
          if (page === 1) {
              this.posts = posts;
          } else {
              this.posts = [...this.posts, ...posts];
          }
          
          this.renderBlogPosts();
          this.updateLoadMoreButton(posts.length);
      } catch (error) {
          console.error('Failed to load blog posts:', error);
          this.showFallbackMessage();
      } finally {
          this.isLoading = false;
      }
  }

  renderBlogPosts() {
      const blogGrid = document.getElementById('blog-posts-grid');
      if (!blogGrid) return;

      blogGrid.innerHTML = '';

      if (this.posts.length === 0) {
          this.showFallbackMessage();
          return;
      }

      this.posts.forEach((post, index) => {
          const blogCard = this.createAdvancedBlogCard(post, index);
          blogGrid.appendChild(blogCard);
      });
  }

  createAdvancedBlogCard(post, index) {
      const article = document.createElement('article');
      article.className = 'blog-card advanced-blog-card';
      
      const publishedDate = new Date(post.published_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
      });

      const coverImage = post.cover_image || this.generatePlaceholderImage(post.title);
      const readingTime = Math.ceil(post.reading_time_minutes) || 5;
      const excerpt = post.description || 'Click to read this insightful post about my development journey...';

      article.innerHTML = `
          <div class="blog-image">
              <img src="${coverImage}" alt="${post.title}" loading="lazy" onerror="this.src='${this.generatePlaceholderImage(post.title)}'">
              <div class="blog-overlay">
                  <button class="preview-btn" data-post-index="${index}">
                      Quick Preview
                  </button>
              </div>
          </div>
          <div class="blog-content">
              <div class="blog-meta">
                  <span class="blog-date">${publishedDate}</span>
                  <span class="reading-time">${readingTime} min read</span>
              </div>
              <h3 class="blog-title">
                  <a href="${post.url}" target="_blank" rel="noopener">
                      ${post.title}
                  </a>
              </h3>
              <p class="blog-excerpt">
                  ${excerpt}
              </p>
              <div class="blog-tags">
                  ${post.tag_list.slice(0, 3).map(tag => `<span class="tag">${tag}</span>`).join('')}
                  ${post.tag_list.length > 3 ? `<span class="tag-more">+${post.tag_list.length - 3}</span>` : ''}
              </div>
              <div class="blog-actions">
                  <div class="blog-stats">
                      <span class="stat">❤️ ${post.public_reactions_count || 0}</span>
                      <span class="stat">💬 ${post.comments_count || 0}</span>
                  </div>
                  <div class="blog-links">
                      <button class="blog-link preview-link" data-post-index="${index}">
                          Preview
                      </button>
                      <a href="${post.url}" target="_blank" rel="noopener" class="blog-link external-link">
                          Read Full Post
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                              <polyline points="15,3 21,3 21,9"/>
                              <line x1="10" y1="14" x2="21" y2="3"/>
                          </svg>
                      </a>
                  </div>
              </div>
          </div>
      `;

      return article;
  }

  createBlogModal() {
      // Modal is created in HTML - this method can be used for dynamic creation if needed
      const existingModal = document.getElementById('blog-modal');
      if (existingModal) return;

      const modal = document.createElement('div');
      modal.id = 'blog-modal';
      modal.className = 'blog-modal';
      modal.innerHTML = `
          <div class="modal-overlay" id="modal-overlay"></div>
          <div class="modal-content">
              <div class="modal-header">
                  <h2 id="modal-title">Blog Post Preview</h2>
                  <button class="modal-close" id="modal-close" aria-label="Close modal">&times;</button>
              </div>
              <div class="modal-body" id="modal-body">
                  <!-- Post content will be loaded here -->
              </div>
              <div class="modal-footer">
                  <a href="#" target="_blank" rel="noopener" class="btn btn-primary" id="modal-read-full">
                      Read Full Post on dev.to
                  </a>
              </div>
          </div>
      `;
      document.body.appendChild(modal);
  }

  setupEventListeners() {
      // Modal event listeners
      document.addEventListener('click', (e) => {
          if (e.target.matches('.preview-btn, .preview-link')) {
              e.preventDefault();
              const postIndex = parseInt(e.target.dataset.postIndex);
              this.openPostPreview(postIndex);
          }
          
          if (e.target.matches('#modal-close, #modal-overlay')) {
              this.closeModal();
          }
      });

      // Load more functionality
      const loadMoreBtn = document.getElementById('load-more-posts');
      if (loadMoreBtn) {
          loadMoreBtn.addEventListener('click', () => {
              this.currentPage++;
              this.loadBlogPosts(this.currentPage);
          });
      }

      // Keyboard accessibility
      document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape') {
              this.closeModal();
          }
      });
  }

  async openPostPreview(postIndex) {
      const post = this.posts[postIndex];
      if (!post) return;

      const modal = document.getElementById('blog-modal');
      const modalTitle = document.getElementById('modal-title');
      const modalBody = document.getElementById('modal-body');
      const modalReadFull = document.getElementById('modal-read-full');

      modalTitle.textContent = post.title;
      modalReadFull.href = post.url;

      // Show loading state
      modalBody.innerHTML = '<div class="blog-loading"><div class="loading-spinner"></div><p>Loading post preview...</p></div>';
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';

      try {
          const postContent = this.getPostPreview(post);
          modalBody.innerHTML = postContent;
      } catch (error) {
          console.error('Error loading post preview:', error);
          modalBody.innerHTML = `
              <div class="modal-error">
                  <p>Unable to load preview. Please read the full post on dev.to.</p>
                  <p><strong>Description:</strong> ${post.description || 'No description available'}</p>
              </div>
          `;
      }
  }

  getPostPreview(post) {
      const publishedDate = new Date(post.published_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
      });

      const description = post.description || "This post shares insights from my journey in web development, including personal experiences, lessons learned, and practical tips for fellow developers and career changers.";

      return `
          <div class="post-preview">
              ${post.cover_image ? `<img src="${post.cover_image}" alt="${post.title}" class="post-cover">` : ''}
              <div class="post-meta">
                  <span class="post-date">Published on ${publishedDate}</span>
                  <span class="post-reading-time">${post.reading_time_minutes || 5} min read</span>
              </div>
              <div class="post-description">
                  <p>${description}</p>
              </div>
              <div class="post-tags">
                  ${post.tag_list.map(tag => `<span class="preview-tag">${tag}</span>`).join('')}
              </div>
              <div class="post-stats">
                  <div class="stat-item">
                      <strong>${post.public_reactions_count || 0}</strong>
                      <span>reactions</span>
                  </div>
                  <div class="stat-item">
                      <strong>${post.comments_count || 0}</strong>
                      <span>comments</span>
                  </div>
              </div>
          </div>
      `;
  }

  closeModal() {
      const modal = document.getElementById('blog-modal');
      modal.style.display = 'none';
      document.body.style.overflow = '';
  }

  generatePlaceholderImage(title) {
      const colors = ['6366f1', '3b82f6', '8b5cf6', 'f59e0b', 'ef4444'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const encodedTitle = encodeURIComponent(title.substring(0, 30));
      return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><rect width="400" height="200" fill="%23${color}"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="white" font-family="system-ui" font-size="14" font-weight="600">${encodedTitle}</text></svg>`;
  }

  updateLoadMoreButton(postsLoaded) {
      const loadMoreBtn = document.getElementById('load-more-posts');
      if (!loadMoreBtn) return;

      if (postsLoaded < this.postsPerPage) {
          loadMoreBtn.style.display = 'none';
      } else {
          loadMoreBtn.style.display = 'block';
      }
  }

  showFallbackMessage() {
      const blogGrid = document.getElementById('blog-posts-grid');
      if (!blogGrid) return;

      blogGrid.innerHTML = `
          <div class="blog-fallback">
              <h3>More posts coming soon!</h3>
              <p>I'm actively writing about my development journey, AI-assisted learning, and career change experiences. Follow me on dev.to to get notified of new posts!</p>
              <a href="https://dev.to/dishankg" target="_blank" rel="noopener" class="btn btn-primary">
                  Follow on dev.to
              </a>
          </div>
      `;
  }
}

// Initialize the blog manager - Add this to your PortfolioApp init() method:
// this.devToBlogManager = new AdvancedDevToBlogManager();