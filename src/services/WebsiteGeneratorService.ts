import { BusinessData, Product } from './DataService';

export interface GeneratedWebsite {
  html: string;
  css: string;
  js: string;
  previewUrl: string;
}

export class WebsiteGeneratorService {
  static generateWebsite(
    businessData: Partial<BusinessData>, 
    products: Product[] = [], 
    theme: string = 'modern'
  ): GeneratedWebsite {
    const html = this.generateHTML(businessData, products, theme);
    const css = this.generateCSS(theme);
    const js = this.generateJS();
    
    // In a real implementation, this would deploy to a subdomain
    const previewUrl = `https://${businessData.business_name?.toLowerCase().replace(/\s+/g, '-') || 'preview'}.break-even.app`;
    
    return {
      html,
      css,
      js,
      previewUrl
    };
  }

  private static generateHTML(businessData: Partial<BusinessData>, products: Product[], theme: string): string {
    const businessName = businessData.business_name || 'My Business';
    const businessDescription = businessData.business_description || 'Welcome to our business';
    const businessLocation = businessData.business_location || '';
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${businessName}</title>
    <link rel="stylesheet" href="styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
</head>
<body class="theme-${theme}">
    <!-- Header -->
    <header class="header">
        <nav class="nav">
            <div class="nav-brand">
                ${businessData.logo_url ? 
                  `<img src="${businessData.logo_url}" alt="${businessName}" class="logo">` : 
                  `<h1 class="brand-name">${businessName}</h1>`
                }
            </div>
            <ul class="nav-menu">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#products">Products</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>

    <!-- Hero Section -->
    <section id="home" class="hero">
        <div class="hero-content">
            <h1 class="hero-title">${businessName}</h1>
            <p class="hero-subtitle">${businessDescription}</p>
            ${businessLocation ? `<p class="hero-location">📍 ${businessLocation}</p>` : ''}
            <div class="hero-actions">
                <button class="btn btn-primary" onclick="scrollToSection('products')">View Products</button>
                <button class="btn btn-secondary" onclick="scrollToSection('contact')">Contact Us</button>
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section id="about" class="about">
        <div class="container">
            <h2>About Us</h2>
            <p>${businessDescription}</p>
            ${businessLocation ? `<p><strong>Location:</strong> ${businessLocation}</p>` : ''}
        </div>
    </section>

    <!-- Products Section -->
    <section id="products" class="products">
        <div class="container">
            <h2>Our Products</h2>
            <div class="products-grid">
                ${products.map(product => `
                    <div class="product-card">
                        ${product.image_url ? `<img src="${product.image_url}" alt="${product.name}" class="product-image">` : ''}
                        <div class="product-info">
                            <h3 class="product-name">${product.name}</h3>
                            <p class="product-description">${product.description}</p>
                            <div class="product-price">$${product.price.toFixed(2)}</div>
                            <button class="btn btn-primary" onclick="contactAboutProduct('${product.name}')">Inquire</button>
                        </div>
                    </div>
                `).join('')}
            </div>
            ${products.length === 0 ? '<p class="no-products">Products coming soon!</p>' : ''}
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="contact">
        <div class="container">
            <h2>Contact Us</h2>
            <div class="contact-content">
                <div class="contact-info">
                    <h3>Get in Touch</h3>
                    <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
                    ${businessLocation ? `<p><strong>Visit us:</strong> ${businessLocation}</p>` : ''}
                </div>
                <form class="contact-form" onsubmit="submitContactForm(event)">
                    <input type="text" id="name" placeholder="Your Name" required>
                    <input type="email" id="email" placeholder="Your Email" required>
                    <input type="text" id="subject" placeholder="Subject" required>
                    <textarea id="message" placeholder="Your Message" rows="5" required></textarea>
                    <button type="submit" class="btn btn-primary">Send Message</button>
                </form>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <p>&copy; 2024 ${businessName}. All rights reserved.</p>
            <p>Website powered by Break-Even Dashboard</p>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html>`;
  }

  private static generateCSS(theme: string): string {
    const themeColors = this.getThemeColors(theme);
    
    return `/* Reset and Base Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', sans-serif;
    line-height: 1.6;
    color: ${themeColors.text};
    background-color: ${themeColors.background};
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Header */
.header {
    background: ${themeColors.headerBg};
    backdrop-filter: blur(10px);
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
    border-bottom: 1px solid ${themeColors.border};
}

.nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
}

.nav-brand .brand-name {
    font-size: 1.5rem;
    font-weight: 700;
    color: ${themeColors.primary};
}

.logo {
    height: 40px;
    width: auto;
}

.nav-menu {
    display: flex;
    list-style: none;
    gap: 2rem;
}

.nav-menu a {
    text-decoration: none;
    color: ${themeColors.text};
    font-weight: 500;
    transition: color 0.3s ease;
}

.nav-menu a:hover {
    color: ${themeColors.primary};
}

/* Hero Section */
.hero {
    background: linear-gradient(135deg, ${themeColors.primary}20, ${themeColors.secondary}20);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 2rem;
}

.hero-content {
    max-width: 600px;
}

.hero-title {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: ${themeColors.text};
}

.hero-subtitle {
    font-size: 1.25rem;
    margin-bottom: 1rem;
    color: ${themeColors.textSecondary};
}

.hero-location {
    font-size: 1rem;
    color: ${themeColors.textSecondary};
    margin-bottom: 2rem;
}

.hero-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
}

/* Buttons */
.btn {
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    display: inline-block;
}

.btn-primary {
    background: ${themeColors.primary};
    color: white;
}

.btn-primary:hover {
    background: ${themeColors.primaryHover};
    transform: translateY(-2px);
}

.btn-secondary {
    background: transparent;
    color: ${themeColors.primary};
    border: 2px solid ${themeColors.primary};
}

.btn-secondary:hover {
    background: ${themeColors.primary};
    color: white;
}

/* Sections */
section {
    padding: 5rem 0;
}

section h2 {
    font-size: 2.5rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 3rem;
    color: ${themeColors.text};
}

/* About Section */
.about {
    background: ${themeColors.sectionBg};
}

.about p {
    font-size: 1.1rem;
    text-align: center;
    max-width: 800px;
    margin: 0 auto 1rem;
    color: ${themeColors.textSecondary};
}

/* Products Section */
.products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
}

.product-card {
    background: ${themeColors.cardBg};
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.product-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.product-info {
    padding: 1.5rem;
}

.product-name {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: ${themeColors.text};
}

.product-description {
    color: ${themeColors.textSecondary};
    margin-bottom: 1rem;
}

.product-price {
    font-size: 1.5rem;
    font-weight: 700;
    color: ${themeColors.primary};
    margin-bottom: 1rem;
}

.no-products {
    text-align: center;
    color: ${themeColors.textSecondary};
    font-style: italic;
}

/* Contact Section */
.contact {
    background: ${themeColors.sectionBg};
}

.contact-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: start;
}

.contact-info h3 {
    margin-bottom: 1rem;
    color: ${themeColors.text};
}

.contact-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.contact-form input,
.contact-form textarea {
    padding: 12px;
    border: 2px solid ${themeColors.border};
    border-radius: 8px;
    font-size: 1rem;
    background: ${themeColors.inputBg};
    color: ${themeColors.text};
}

.contact-form input:focus,
.contact-form textarea:focus {
    outline: none;
    border-color: ${themeColors.primary};
}

/* Footer */
.footer {
    background: ${themeColors.footerBg};
    text-align: center;
    padding: 2rem;
    color: ${themeColors.textSecondary};
}

/* Responsive Design */
@media (max-width: 768px) {
    .hero-title {
        font-size: 2.5rem;
    }
    
    .hero-actions {
        flex-direction: column;
        align-items: center;
    }
    
    .contact-content {
        grid-template-columns: 1fr;
        gap: 2rem;
    }
    
    .nav-menu {
        display: none;
    }
}`;
  }

  private static generateJS(): string {
    return `// Smooth scrolling for navigation
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Contact form submission
function submitContactForm(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // In a real implementation, this would send data to your backend
    alert(\`Thank you \${name}! Your message has been sent. We'll get back to you soon.\`);
    
    // Reset form
    event.target.reset();
}

// Product inquiry
function contactAboutProduct(productName) {
    const contactSection = document.getElementById('contact');
    const subjectField = document.getElementById('subject');
    const messageField = document.getElementById('message');
    
    // Scroll to contact form
    contactSection.scrollIntoView({ behavior: 'smooth' });
    
    // Pre-fill form with product inquiry
    setTimeout(() => {
        subjectField.value = \`Inquiry about \${productName}\`;
        messageField.value = \`Hi, I'm interested in learning more about \${productName}. Could you please provide more details?\`;
        subjectField.focus();
    }, 500);
}

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.8)';
    }
});`;
  }

  private static getThemeColors(theme: string) {
    const themes = {
      modern: {
        primary: '#3B82F6',
        primaryHover: '#2563EB',
        secondary: '#F3F4F6',
        background: '#FFFFFF',
        text: '#1F2937',
        textSecondary: '#6B7280',
        headerBg: 'rgba(255, 255, 255, 0.8)',
        sectionBg: '#F9FAFB',
        cardBg: '#FFFFFF',
        footerBg: '#1F2937',
        border: '#E5E7EB',
        inputBg: '#FFFFFF'
      },
      elegant: {
        primary: '#7C3AED',
        primaryHover: '#6D28D9',
        secondary: '#F5F3FF',
        background: '#FFFFFF',
        text: '#1F2937',
        textSecondary: '#6B7280',
        headerBg: 'rgba(255, 255, 255, 0.9)',
        sectionBg: '#FAFAFA',
        cardBg: '#FFFFFF',
        footerBg: '#1F2937',
        border: '#E5E7EB',
        inputBg: '#FFFFFF'
      },
      minimal: {
        primary: '#000000',
        primaryHover: '#374151',
        secondary: '#F9FAFB',
        background: '#FFFFFF',
        text: '#000000',
        textSecondary: '#6B7280',
        headerBg: 'rgba(255, 255, 255, 0.95)',
        sectionBg: '#FAFAFA',
        cardBg: '#FFFFFF',
        footerBg: '#000000',
        border: '#E5E7EB',
        inputBg: '#FFFFFF'
      }
    };

    return themes[theme as keyof typeof themes] || themes.modern;
  }
}