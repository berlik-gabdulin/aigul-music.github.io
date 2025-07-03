# Aigul Music Website - API Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Build System (Gulp Tasks)](#build-system-gulp-tasks)
3. [JavaScript APIs](#javascript-apis)
4. [SASS/SCSS Styling System](#sassscss-styling-system)
5. [HTML Components](#html-components)
6. [CSS Classes](#css-classes)
7. [Third-Party Dependencies](#third-party-dependencies)
8. [Usage Examples](#usage-examples)

## Project Overview

The Aigul Music website is a front-end web application built for musician Aigül. It features a responsive design with video integration, newsletter signup, social media links, and an interactive menu system.

**Technology Stack:**
- Build System: Gulp 4
- Styling: SASS/SCSS with Bootstrap grid
- JavaScript: jQuery-based interactions
- Third-party: MailChimp integration, YouTube embeds

## Build System (Gulp Tasks)

### Available Gulp Tasks

#### `gulp` (default)
**Description:** Runs the complete development workflow including compilation, watching, and browser sync.

**Usage:**
```bash
gulp
```

**What it does:**
- Compiles SASS/SCSS to CSS
- Concatenates and minifies JavaScript
- Starts BrowserSync server
- Watches files for changes

#### `gulp styles`
**Description:** Compiles SASS/SCSS files to minified CSS.

**Configuration:**
- Source: `app/sass/**/*.sass` or `app/scss/**/*.scss`
- Output: `app/css/main.min.css`
- Features: Autoprefixer, CleanCSS minification

**Usage:**
```bash
gulp styles
```

#### `gulp scripts`
**Description:** Concatenates and minifies JavaScript files.

**Configuration:**
- Source files (in order):
  1. `app/libs/jquery/dist/jquery.min.js`
  2. `app/js/common.js`
- Output: `app/js/scripts.min.js`

**Usage:**
```bash
gulp scripts
```

#### `gulp browser-sync`
**Description:** Starts a local development server with live reload.

**Configuration:**
- Base directory: `app/`
- Port: Auto-assigned
- Live reload: Enabled

**Usage:**
```bash
gulp browser-sync
```

#### `gulp rsync`
**Description:** Deploys the application to a remote server.

**Configuration:**
```javascript
// Edit these settings in gulpfile.js
hostname: 'username@yousite.com',
destination: 'yousite/public_html/',
```

**Usage:**
```bash
gulp rsync
```

## JavaScript APIs

### Menu System

#### `toggleMenu()`
**Description:** Handles the main navigation menu toggle functionality.

**Triggered by:** Click on `.toggle-menu` element

**Behavior:**
- Opens/closes fullscreen menu overlay
- Toggles menu button animation
- Manages body scroll state
- Handles video frame cleanup

**Example:**
```javascript
$('.toggle-menu').click(function() {
    // Menu toggle logic
});
```

#### `navigationClick()`
**Description:** Handles navigation link clicks within the menu.

**Triggered by:** Click on `.nav a` elements

**Behavior:**
- Closes menu overlay
- Removes active states
- Provides smooth navigation

**Example:**
```javascript
$('.nav a').click(function() {
    $('body').removeClass('popup');
    $('.fullscreen, .toggle-menu').removeClass('active');
});
```

### Popup System

#### `popupHandler()`
**Description:** Manages popup overlays for videos and content.

**Triggered by:** Click on `a.popup` elements

**Parameters:**
- `href`: Target popup ID
- `data-src`: YouTube video URL (optional)

**Behavior:**
- Prevents default link behavior
- Loads YouTube videos in iframe
- Shows targeted popup overlay
- Manages z-index layering

**Example:**
```html
<a href="#video-frame" 
   data-src="https://www.youtube.com/embed/VIDEO_ID?autoplay=1"
   class="popup">
   Play Video
</a>
```

### Cookie Management

#### `getCookie(name)`
**Description:** Retrieves a cookie value by name.

**Parameters:**
- `name` (string): Cookie name to retrieve

**Returns:** Cookie value or `null` if not found

**Example:**
```javascript
var cookieValue = getCookie("cookiesAccept");
if (cookieValue === null) {
    // Show cookie consent
}
```

#### `cookieConsent()`
**Description:** Manages cookie consent banner and acceptance.

**Behavior:**
- Shows consent banner after 3 seconds if no consent cookie exists
- Sets consent cookie when user accepts
- Hides banner after acceptance

**Example:**
```javascript
$('.accept').click(function() {
    $('.cookies').addClass('hidden');
    document.cookie = "cookiesAccept=true";
});
```

## SASS/SCSS Styling System

### Variables

#### Color Variables
```scss
// SCSS Version
$accent: orange;           // Primary accent color
$text: #333;              // Default text color
$bgcolor: #FFEBE2;        // Background color

// SASS Version
$accent: orange
$text: #333
```

#### Typography Variables
```scss
// SCSS Version
$default-font: "Coco Gothic", sans-serif;
$accent-font: "Playfair Display";
$accent-font-reg: "Playfair Display Regular";

// SASS Version
$default-font: "roboto-example", sans-serif
```

#### Grid Variables
```scss
// Bootstrap customization
$grid-gutter-width: 30px;
$grid-columns: 12;
$grid-breakpoints: (xs: 0, sm: 576px, md: 768px, lg: 992px, xl: 1200px);
$container-max-widths: (sm: 540px, md: 720px, lg: 960px, xl: 1140px);
$gutter: $grid-gutter-width;
```

### Mixins

#### `font-face` Mixin
**Description:** Generates cross-browser compatible @font-face declarations.

**Parameters:**
- `$font-family` (string): Font family name
- `$file-path` (string): Path to font files (without extension)
- `$weight` (string): Font weight (default: normal)
- `$style` (string): Font style (default: normal)
- `$asset-pipeline` (boolean): Use Rails asset pipeline (default: false)

**SCSS Usage:**
```scss
@include font-face("MyFont", "/fonts/myfont", bold, normal, false);
```

**SASS Usage:**
```sass
+font-face("MyFont", "/fonts/myfont", bold, normal, false)
```

**Generated Output:**
```css
@font-face {
    font-family: "MyFont";
    font-display: swap;
    font-weight: bold;
    font-style: normal;
    src: url('/fonts/myfont.eot');
    src: url('/fonts/myfont.eot?#iefix') format('embedded-opentype'),
         url('/fonts/myfont.ttf') format('truetype');
}
```

### Media Query Structure

#### Responsive Breakpoints
```sass
// Desktop First Approach
+media-breakpoint-down(lg)  // ≥1200px
+media-breakpoint-down(md)  // ≥992px
+media-breakpoint-down(sm)  // ≥768px
+media-breakpoint-down(xs)  // ≥576px

// Mobile First Approach
+media-breakpoint-up(sm)    // ≤576px
+media-breakpoint-up(md)    // ≤768px
+media-breakpoint-up(lg)    // ≤992px
+media-breakpoint-up(xl)    // ≤1200px
```

## HTML Components

### Navigation Menu

#### Hamburger Menu Button
```html
<div class="toggle-menu">
    <span class="top"></span>
    <span class="center"></span>
    <span class="bottom"></span>
</div>
```

#### Fullscreen Menu Overlay
```html
<div class="fullscreen menu">
    <div class="fullscreen__inner">
        <nav class="nav">
            <ul>
                <li><a href="#music">Music</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#video">Video</a></li>
            </ul>
        </nav>
    </div>
</div>
```

### Video Components

#### Video Popup Trigger
```html
<a href="#video-frame" 
   data-src="https://www.youtube.com/embed/VIDEO_ID?autoplay=1&rel=0&showinfo=0&modestbranding=1" 
   class="popup">
    <img src="/img/youtube-play-button.png" alt="" class="youtube-play">
    <p class="video-title">Video Title</p>
</a>
```

#### Video Modal
```html
<div id="#video-frame" class="video-frame fullscreen">
    <div class="fullscreen__inner">
        <iframe frameborder="0" width="100%" height="100%" class="video-frame__frame"></iframe>
    </div>
</div>
```

### Newsletter Signup

#### MailChimp Form
```html
<form action="MAILCHIMP_ACTION_URL" method="post" 
      id="mc-embedded-subscribe-form" 
      name="mc-embedded-subscribe-form" 
      class="validate" target="_blank" novalidate>
    <div class="form-row">
        <div class="mc-field-group">
            <input type="text" name="FNAME" class="required" placeholder="Name">
        </div>
        <div class="mc-field-group">
            <input type="email" name="EMAIL" class="required email" placeholder="EMAIL">
        </div>
        <div class="mc-field-group">
            <input type="submit" value="JOIN" name="subscribe" class="button">
        </div>
    </div>
</form>
```

### Social Media Links

#### Social Icons Component
```html
<div class="social">
    <a href="YOUTUBE_URL" target="_blank">
        <img src="/img/icons/004-youtube-logo-1.svg" alt="">
    </a>
    <a href="FACEBOOK_URL" target="_blank">
        <img src="/img/icons/002-facebook.svg" alt="">
    </a>
    <a href="INSTAGRAM_URL" target="_blank">
        <img src="/img/icons/005-instagram.svg" alt="">
    </a>
    <!-- Additional social links -->
</div>
```

### Cookie Consent Banner

```html
<div class="cookies hidden">
    <p>Cookie consent message with 
       <a href="#policy" class="popup">Privacy Policy</a> link
    </p>
    <span class="accept">Accept</span>
</div>
```

## CSS Classes

### Layout Classes

#### Grid System
```css
.container         /* Bootstrap container */
.row              /* Bootstrap row */
.col              /* Bootstrap column */
.vw50             /* 50% viewport width */
.vw100            /* 100% viewport width */
```

#### Positioning
```css
.center-block     /* Center block element */
.text-center      /* Center text alignment */
```

#### Responsive Images
```css
.img-responsive   /* Responsive image */
.img-width        /* Full width image */
```

### Component-Specific Classes

#### Menu States
```css
.toggle-menu.active    /* Active hamburger menu */
.menu.active          /* Active fullscreen menu */
.popup                /* Body class when popup is open */
```

#### Popup System
```css
.fullscreen           /* Fullscreen overlay base */
.fullscreen.active    /* Active fullscreen overlay */
.popup                /* Popup trigger class */
```

#### Form Styling
```css
.mc-field-group      /* MailChimp form field wrapper */
.averta             /* Custom font class */
.required           /* Required form field */
.email              /* Email input validation */
```

## Third-Party Dependencies

### jQuery
**Version:** Latest (included via CDN)
**Usage:** DOM manipulation, event handling, AJAX

### Bootstrap
**Components Used:** Grid system only
**Customization:** Grid variables modified in `_vars.scss`

### MailChimp
**Integration:** Newsletter signup form
**Validation:** Built-in MailChimp validation

### BrowserSync
**Purpose:** Development server with live reload
**Configuration:** Serves from `app/` directory

## Usage Examples

### Setting Up Development Environment

1. **Install Dependencies:**
```bash
npm install
```

2. **Start Development Server:**
```bash
gulp
```

3. **Build for Production:**
```bash
gulp styles
gulp scripts
```

### Customizing Styles

1. **Modify Variables:**
```scss
// In _vars.scss
$accent: #ff6b6b;           // Change accent color
$default-font: "Roboto";    // Change primary font
```

2. **Add Custom Styles:**
```sass
// In main.sass
.custom-component
    background: $accent
    padding: 20px
    
    +media-breakpoint-down(md)
        padding: 10px
```

### Adding New Video Content

```html
<a href="#video-frame" 
   data-src="https://www.youtube.com/embed/NEW_VIDEO_ID?autoplay=1&rel=0&showinfo=0&modestbranding=1" 
   class="popup">
    <img src="/img/youtube-play-button.png" alt="" class="youtube-play">
    <p class="video-title">New Video Title</p>
</a>
```

### Creating New Popup Content

1. **Add Trigger:**
```html
<a href="#my-popup" class="popup">Open Popup</a>
```

2. **Add Popup Modal:**
```html
<div id="#my-popup" class="my-popup fullscreen">
    <div class="fullscreen__inner">
        <div class="fullscreen__inner-text">
            <!-- Your content here -->
        </div>
    </div>
</div>
```

### Deployment

1. **Configure rsync settings in gulpfile.js:**
```javascript
hostname: 'user@yourserver.com',
destination: 'path/to/public_html/',
```

2. **Deploy:**
```bash
gulp rsync
```

---

## Support and Maintenance

**File Structure:**
- `gulpfile.js` - Build configuration
- `app/js/common.js` - Custom JavaScript
- `app/sass/` or `app/scss/` - Styling source
- `app/index.html` - Main HTML template

**Browser Support:**
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Internet Explorer 11+ (with fallbacks)

**Performance Features:**
- Minified CSS and JavaScript
- Optimized font loading with `font-display: swap`
- Compressed images and assets