# MyOs Documentation Website

## Overview

This is a static documentation website for MyOs, a minimal 64-bit operating system project. The website serves as the primary marketing and documentation platform, showcasing the OS features, providing a command reference, and offering download/wiki resources. Built with vanilla HTML, CSS, and JavaScript, the site emphasizes performance, responsive design, and clean presentation of technical information.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Static Site Design**
- Pure HTML/CSS/JavaScript implementation without frameworks
- Multi-page structure with `index.html` (main landing page), `commands.html` (command reference), and `wiki.html` (documentation)
- Component-based approach using reusable CSS classes and shared navigation

**Rationale**: Chosen for simplicity, fast load times, and easy deployment to static hosting platforms like GitHub Pages. No build process or dependencies required for the frontend.

**Styling System**
- CSS custom properties (CSS variables) for theming and consistency
- Dark theme with terminal-inspired aesthetic
- Responsive design with mobile-first approach
- Gradient backgrounds and glassmorphism effects (backdrop-filter)

**Key Design Decisions**:
- Uses `--primary`, `--secondary`, `--accent` color scheme for brand consistency
- JetBrains Mono font for code/terminal elements, Inter for body text
- Sticky navigation with blur effect for modern feel

**JavaScript Functionality**
- Vanilla JavaScript for DOM manipulation and interactivity
- Debounce utility function for performance optimization
- Mobile menu toggle with click-outside-to-close behavior
- Command data structure for dynamic rendering

**Architecture Pattern**: Event-driven with minimal state management. All interactions are event listeners on DOM elements.

### Backend Architecture

**Development Server**
- Node.js HTTP server (`server.js`) for local development
- Static file serving with MIME type detection
- No-cache headers for development workflow

**Rationale**: Simple HTTP server sufficient for serving static files during development. Production deployment uses static hosting, so no backend runtime required.

**Server Features**:
- Automatic content-type detection based on file extensions
- 404 error handling
- Listens on `0.0.0.0:5000` for accessibility in development environments

### Data Architecture

**Command Reference System**
- Commands defined as JavaScript object array in `script.js`
- Each command has: `name`, `description`, `category`
- Categories: System, Utilities, Filesystem

**Structure**:
```javascript
{
  name: 'command',
  description: 'описание',
  category: 'Category'
}
```

**Rationale**: In-memory data structure is sufficient for a small, static command list. No database needed as commands rarely change.

### Navigation Architecture

**Multi-page SPA-like Experience**
- Hash-based navigation (`#home`, `#features`, `#download`) on main page
- Separate pages for commands reference and wiki documentation
- Shared navigation component across all pages
- All pages link to external resources (GitHub, Issues, Google Drive for ISO download)

**Mobile Menu Pattern**:
- Toggle button with hamburger icon
- Overlay navigation that closes on link click or outside click
- CSS transforms for smooth animations

### Performance Optimization

**Debouncing Strategy**
- Utility function to limit high-frequency events
- Generic implementation: `debounce(fn, delay)`

**CSS Optimizations**:
- Font smoothing for better text rendering
- Hardware-accelerated animations where possible
- Minimal layout shifts with sticky positioning

**Caching Strategy**:
- Development: No-cache headers for immediate updates
- Production: Relies on static host caching policies

### Responsive Design

**Breakpoint Strategy**
- Mobile-first CSS approach
- Flexible layouts using flexbox
- Responsive navigation that transforms to mobile menu

**Key Techniques**:
- `viewport` meta tag for proper mobile scaling
- Percentage-based widths and max-widths
- Conditional menu display based on screen size

## External Dependencies

### Fonts
- **Google Fonts**: JetBrains Mono and Inter font families
- Loaded via CDN link in HTML head
- Fallback to system fonts if CDN unavailable

### Node.js Runtime (Development Only)
- **http**: Core Node.js module for development server
- **fs**: File system operations for serving static files
- **path**: Path manipulation utilities

**Note**: These dependencies are development-only. Production deployment requires no runtime.

### Browser APIs
- **DOM API**: Element selection and manipulation
- **Event API**: Click, scroll, and interaction handling
- **CSS Custom Properties**: For theming system

### Deployment Platform
- Designed for static hosting (GitHub Pages, Netlify, Vercel, etc.)
- No server-side rendering or backend required
- All resources served as static files

## Recent Changes (November 24, 2025)

**Copyright Year Updated to 2025**
- Updated all footer copyright notices from 2024 to 2025 across all pages (index.html, commands.html, wiki.html)

### New Wiki Page
- Created comprehensive `wiki.html` with full MyOs documentation
- Includes sections: Overview, Architecture, Bootloader, Kernel, Memory Management, Filesystem, Shell, Build System
- Features sidebar navigation for easy access to sections
- Beautiful glassmorphism design with fade-in animations

### External Links Integration
- Added real GitHub repository link: https://github.com/KaVoshnik/MyOs
- Added GitHub Issues for bug reporting: https://github.com/KaVoshnik/MyOs/issues
- Added Google Drive ISO download link: https://drive.google.com/drive/folders/1ohPWVVUCRF67QDXHc0DPyWFVI-qS9yYR?usp=sharing
- Updated all navigation menus and footers across all pages

### Content Refinements
- Removed "Contributing" section from main page (single developer project)
- Updated git clone command to use actual repository URL
- Changed download buttons from placeholders to functional Google Drive links

### Visual Enhancements
- Added extensive wiki page styling with:
  - Sticky sidebar navigation
  - Info cards with hover effects
  - Code examples with syntax highlighting
  - Animated section transitions
  - Requirement cards with 3D hover transforms
  - Step-by-step lists with numbered circles
- Enhanced button interactions with ripple effects
- Improved gradient backgrounds and particle effects
- Added social links with hover animations

### Asset Organization (Latest)
- Created dedicated `/images` folder for all image assets
- Moved 4 high-quality terminal screenshots to `/images`:
  - `image_1763983951706.png` - System boot and shell startup
  - `image_1763983958042.png` - Filesystem commands (ls, mkdir, touch)
  - `image_1763983961851.png` - Memory management and allocation testing
  - `image_1763983966341.png` - Disk information (diskinfo command)
- Updated image paths in index.html from `attached_assets/` to `images/`
- Removed unused image files, keeping only high-quality actively-used images
- Clean project structure with organized asset management