# Portfolio Website - Cursor & Claude Desktop Instructions

## Project Overview

This is Dishank Gupta's personal developer portfolio website built with vanilla HTML, CSS, and JavaScript. It features a modern, responsive design with dark/light theme toggle functionality and showcases web development projects and skills.

**Status**: Complete and fully functional portfolio website ready for deployment.

## Project Structure

```
dishank-portfolio/
├── index.html          # Main portfolio page
├── style.css           # All styling and theme management
├── script.js           # Interactive functionality
├── .replit            # Replit configuration
├── replit.md          # Documentation
└── attached_assets/    # Project assets and bio
```

## Key Features

- **Responsive Design**: Mobile-first approach with hamburger navigation
- **Theme Management**: Dark/light mode toggle with localStorage persistence
- **Smooth Scrolling**: Section navigation with active state management
- **Interactive Elements**: Hover effects, animations, and transitions
- **Accessibility**: Keyboard navigation, focus management, skip links
- **Performance Optimized**: Vanilla JS, minimal dependencies, efficient CSS

## User Profile & Preferences

### About Dishank Gupta
- **Personality**: ENTP ("The Debater"), Type 7w5 ("The Explorer")
- **Skills**: HTML5, CSS3, JavaScript, Responsive Design, Git & GitHub, Web Performance
- **Projects**: Personal Portfolio, To-Do List App, Weather App with API Integration
- **Contact**: dishank.2427@gmail.com
- **GitHub**: https://github.com/dishankgupta
- **Preferred Colors**: McLaren Orange, BMW Blue (#16588E)
- **Communication Style**: Simple, everyday language

### Personal Motto
*"Curiosity, logic, and a dash of fun make anything possible."*

## Development Guidelines for Cursor/Claude Desktop

### 1. Code Style & Standards

**HTML Guidelines:**
- Use semantic HTML5 elements
- Maintain proper document structure
- Include accessibility attributes (aria-labels, roles)
- Keep clean, readable markup

**CSS Guidelines:**
- Use CSS custom properties for theming
- Mobile-first responsive design approach
- Consistent naming conventions (kebab-case)
- Efficient selectors and minimal specificity conflicts
- Smooth transitions for all interactive elements

**JavaScript Guidelines:**
- ES6+ modern JavaScript syntax
- Class-based architecture for components
- Event delegation for performance
- LocalStorage for theme persistence
- Debounced/throttled scroll events

### 2. Theme System

The website uses a sophisticated theme management system:

```css
:root {
  /* Light theme variables */
  --primary-color: #3b82f6;
  --accent-color: #6366f1;
  --bg-color: #ffffff;
  --text-color: #1e293b;
}

[data-theme="dark"] {
  /* Dark theme overrides */
  --bg-color: #0f172a;
  --text-color: #f1f5f9;
}
```

**Theme Management Rules:**
- Always use CSS custom properties for colors
- Maintain contrast ratios for accessibility
- Smooth transitions between theme changes
- Icon updates with animations during theme switch

### 3. Responsive Breakpoints

```css
/* Mobile-first approach */
@media (max-width: 768px) {
  /* Tablet and mobile styles */
}

@media (max-width: 480px) {
  /* Small mobile styles */
}
```

### 4. Component Architecture

**JavaScript Classes:**
- `ThemeManager`: Handles theme switching and persistence
- `NavigationManager`: Mobile menu and scroll behavior
- `SmoothScroll`: Section navigation and active states
- `ScrollAnimations`: Intersection Observer for animations
- `PerformanceOptimizer`: Scroll/resize event optimization

### 5. Common Development Tasks

#### Adding New Sections
1. Add section to HTML with unique ID
2. Add navigation link in nav menu
3. Include section in smooth scroll targets
4. Add responsive styles if needed

#### Modifying Theme Colors
1. Update CSS custom properties in `:root` and `[data-theme="dark"]`
2. Test contrast ratios for accessibility
3. Verify all elements update correctly

#### Adding New Projects
1. Duplicate existing project card structure
2. Update project details, tech stack, and links
3. Ensure project image/icon is appropriate
4. Test responsive behavior

### 6. Performance Considerations

**Optimization Rules:**
- Use efficient CSS selectors
- Minimize DOM queries in JavaScript
- Throttle scroll events (16ms for 60fps)
- Debounce resize events (250ms)
- Lazy load images when added

### 7. Accessibility Requirements

**Must-Have Features:**
- Keyboard navigation support
- Focus indicators on all interactive elements
- Semantic HTML structure
- Alt text for images
- Skip links for screen readers
- Proper heading hierarchy

### 8. Browser Support

**Target Browsers:**
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

**Fallbacks:**
- CSS custom properties with fallback values
- Intersection Observer with polyfill if needed
- LocalStorage with graceful degradation

### 9. Deployment Checklist

Before deploying:
- [ ] Test all theme switching functionality
- [ ] Verify mobile navigation works properly
- [ ] Check smooth scrolling on all devices
- [ ] Validate HTML and CSS
- [ ] Test performance on slow connections
- [ ] Verify all links work correctly
- [ ] Check accessibility with screen reader

### 10. Common Issues & Solutions

**Theme Toggle Not Working:**
- Check if localStorage is supported
- Verify CSS custom properties are properly defined
- Ensure JavaScript event listeners are attached

**Mobile Menu Issues:**
- Check z-index stacking
- Verify touch events work on mobile
- Test with different screen sizes

**Smooth Scrolling Problems:**
- Ensure section IDs match navigation hrefs
- Check for conflicting CSS scroll-behavior
- Verify offset calculations for fixed navbar

### 11. Future Enhancement Ideas

**Potential Improvements:**
- Contact form with backend integration
- Blog section with dynamic content
- Project showcase with filtering
- Progressive Web App (PWA) features
- Advanced animations with GSAP
- Image optimization and lazy loading

### 12. File Management

**Important Files:**
- `index.html`: Main structure, don't break semantic layout
- `style.css`: All styling, maintain CSS custom properties system
- `script.js`: All functionality, keep class-based architecture

**Backup Strategy:**
- Always test changes locally first
- Keep version history in Git
- Document any major architectural changes

## Quick Commands for Development

### Cursor Shortcuts
- `Ctrl/Cmd + Shift + P`: Command palette
- `Ctrl/Cmd + K`: AI chat
- `Ctrl/Cmd + L`: Select line
- `Alt + Click`: Multiple cursors

### Common Tasks
- **Preview**: Use live server extension or local HTTP server
- **Validation**: Use built-in HTML/CSS validators
- **Performance**: Check with browser DevTools Lighthouse
- **Responsive**: Test with browser DevTools device simulation

## Best Practices Reminder

1. **Always test on mobile devices** - This is a mobile-first design
2. **Maintain theme consistency** - Use CSS custom properties
3. **Keep accessibility in mind** - Test with keyboard navigation
4. **Performance matters** - Monitor bundle size and load times
5. **Code readability** - Write self-documenting code with clear naming
6. **User experience** - Smooth animations and responsive interactions

---

*This portfolio represents Dishank Gupta's journey in web development. Keep the personal touch and enthusiasm that makes it unique while maintaining professional standards.*