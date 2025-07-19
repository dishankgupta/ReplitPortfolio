# Portfolio Website - Replit Guide

## Overview

This is a personal developer portfolio website built with vanilla HTML, CSS, and JavaScript. It features a modern, responsive design with dark/light theme toggle functionality. The site serves as a showcase for web development projects and skills with a clean, professional aesthetic.

**Status**: Complete and deployed - User confirmed satisfaction with all features and design.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Static Site Structure**: Pure HTML/CSS/JavaScript without frameworks
- **Single Page Application (SPA)**: All content on one page with smooth scrolling navigation
- **Component-Based CSS**: Modular CSS structure using CSS custom properties for theming
- **Responsive Design**: Mobile-first approach with hamburger menu for smaller screens

### Key Design Decisions
- **Vanilla JavaScript**: Chosen for simplicity and performance over frameworks
- **CSS Custom Properties**: Used for efficient theme management and consistent styling
- **Local Storage**: Persists user theme preference across sessions
- **Class-Based JavaScript**: Object-oriented approach for theme management

## Key Components

### Navigation System
- Fixed navigation bar with smooth scrolling to sections
- Responsive hamburger menu for mobile devices
- Theme toggle button integrated into navigation

### Theme Management
- **ThemeManager Class**: Handles theme switching logic
- **CSS Custom Properties**: Defines color schemes for light/dark themes
- **Local Storage**: Remembers user preference
- **Smooth Transitions**: Animated theme switching with visual feedback

### Responsive Design
- Mobile-first CSS approach
- Flexbox and CSS Grid for layouts
- Breakpoint-based responsive navigation

## Data Flow

### Theme Management Flow
1. User clicks theme toggle button
2. ThemeManager toggles between light/dark themes
3. CSS custom properties update automatically
4. New theme preference saved to localStorage
5. Theme icon updates with rotation animation

### Navigation Flow
1. User clicks navigation link
2. Smooth scroll to target section
3. Mobile menu closes automatically (on mobile)
4. Active state updates for current section

## External Dependencies

### None Currently
- **Pure Vanilla Stack**: No external libraries or frameworks
- **Self-Contained**: All functionality built from scratch
- **No Build Process**: Direct HTML/CSS/JS files

### Potential Future Dependencies
- Font loading from Google Fonts or similar
- Icon libraries for enhanced UI elements
- Animation libraries for advanced effects

## Deployment Strategy

### Static Site Hosting
- **Current Setup**: Ready for any static hosting service
- **Deployment Options**: 
  - GitHub Pages
  - Netlify
  - Vercel
  - Traditional web hosting

### File Structure
```
/
├── index.html (main page)
├── style.css (all styles)
├── script.js (all functionality)
└── assets/ (images, if added)
```

### Performance Considerations
- Minimal HTTP requests (3 files total)
- CSS custom properties for efficient theme switching
- Optimized animations using CSS transforms
- Local storage for persistent user preferences

### Future Enhancements
- Image optimization and lazy loading
- Progressive Web App (PWA) features
- Contact form with backend integration
- Project showcase with dynamic content loading