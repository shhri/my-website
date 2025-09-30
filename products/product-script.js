// Common JavaScript for Product Pages

// On Page Load Animation
document.addEventListener('DOMContentLoaded', function() {
    // Animate elements with animation classes when they enter viewport
    const animatedElements = document.querySelectorAll('.animate-fade-up, .animate-fade-right, .animate-fade-left');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
    
    // Image Gallery Lightbox
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            openLightbox(imgSrc);
        });
    });
    
    // Form Validation
    const quoteForm = document.getElementById('quote-form');
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Basic validation
            let isValid = true;
            const requiredFields = quoteForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            // Email validation
            const emailField = quoteForm.querySelector('input[type="email"]');
            if (emailField && emailField.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    isValid = false;
                    emailField.classList.add('error');
                }
            }
            
            if (isValid) {
                // Show success message
                showSuccessMessage();
                quoteForm.reset();
            } else {
                // Show error message
                showErrorMessage();
            }
        });
    }
});

// Function to handle fixed header on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Lightbox functionality
function openLightbox(imgSrc) {
    const lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');
    
    const img = document.createElement('img');
    img.src = imgSrc;
    
    const closeBtn = document.createElement('span');
    closeBtn.classList.add('lightbox-close');
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', () => {
        lightbox.classList.add('fade-out');
        setTimeout(() => {
            document.body.removeChild(lightbox);
        }, 300);
    });
    
    lightbox.appendChild(img);
    lightbox.appendChild(closeBtn);
    document.body.appendChild(lightbox);
    
    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', function(event) {
        if (event.target === lightbox) {
            lightbox.classList.add('fade-out');
            setTimeout(() => {
                document.body.removeChild(lightbox);
            }, 300);
        }
    });
    
    // Prevent scrolling when lightbox is open
    document.body.style.overflow = 'hidden';
    
    // Add animation
    setTimeout(() => {
        lightbox.classList.add('show');
    }, 10);
}

// Success and Error Messages
function showSuccessMessage() {
    const messageContainer = document.querySelector('.form-message') || createMessageContainer();
    messageContainer.textContent = 'Your quote request has been submitted successfully! We\'ll contact you soon.';
    messageContainer.className = 'form-message success';
    messageContainer.style.display = 'block';
    
    setTimeout(() => {
        messageContainer.style.display = 'none';
    }, 5000);
}

function showErrorMessage() {
    const messageContainer = document.querySelector('.form-message') || createMessageContainer();
    messageContainer.textContent = 'Please fill in all required fields correctly.';
    messageContainer.className = 'form-message error';
    messageContainer.style.display = 'block';
}

function createMessageContainer() {
    const messageContainer = document.createElement('div');
    messageContainer.className = 'form-message';
    const form = document.getElementById('quote-form');
    form.parentNode.insertBefore(messageContainer, form.nextSibling);
    return messageContainer;
}

// Contact Popup Functionality
function createContactPopup() {
    // Create popup container
    const popup = document.createElement('div');
    popup.classList.add('contact-popup');
    
    // Create popup content
    const popupContent = document.createElement('div');
    popupContent.classList.add('popup-content');
    
    // Add title
    const title = document.createElement('h3');
    title.textContent = 'Contact Us';
    popupContent.appendChild(title);
    
    // Add contact options
    const options = document.createElement('div');
    options.classList.add('contact-options');
    
    // WhatsApp option
    const whatsappOption = document.createElement('a');
    whatsappOption.classList.add('contact-option', 'whatsapp-option');
    whatsappOption.href = "https://wa.me/917017672967?text=Hello%20RR%20Developers%2C%20I'm%20interested%20in%20your%20products%20and%20would%20like%20to%20request%20a%20quote.%20Please%20provide%20more%20information.%20Thank%20you!";
    whatsappOption.target = "_blank";
    
    const whatsappIcon = document.createElement('span');
    whatsappIcon.className = 'material-icons';
    whatsappIcon.textContent = 'whatsapp';
    
    const whatsappText = document.createElement('span');
    whatsappText.textContent = 'WhatsApp';
    
    whatsappOption.appendChild(whatsappIcon);
    whatsappOption.appendChild(whatsappText);
    options.appendChild(whatsappOption);
    
    // Call option
    const callOption = document.createElement('a');
    callOption.classList.add('contact-option', 'call-option');
    callOption.href = "tel:+919720080903";
    
    const callIcon = document.createElement('span');
    callIcon.className = 'material-icons';
    callIcon.textContent = 'phone';
    
    const callText = document.createElement('span');
    callText.textContent = 'Call Us';
    
    callOption.appendChild(callIcon);
    callOption.appendChild(callText);
    options.appendChild(callOption);
    
    popupContent.appendChild(options);
    
    // Add close button
    const closeBtn = document.createElement('button');
    closeBtn.classList.add('popup-close');
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', () => {
        popup.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(popup);
            document.body.style.overflow = 'auto';
        }, 300);
    });
    
    popupContent.appendChild(closeBtn);
    popup.appendChild(popupContent);
    document.body.appendChild(popup);
    
    // Show popup with animation
    setTimeout(() => {
        popup.classList.add('show');
    }, 10);
    
    // Close popup when clicking outside
    popup.addEventListener('click', function(event) {
        if (event.target === popup) {
            popup.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(popup);
                document.body.style.overflow = 'auto';
            }, 300);
        }
    });
    
    // Prevent scrolling when popup is open
    document.body.style.overflow = 'hidden';
}

// Add event listeners to all "Get Quote" buttons and handle mobile menu
document.addEventListener('DOMContentLoaded', function() {
    // Existing code...
    
    // Add event listeners to "Get Quote" buttons
    const quoteButtons = document.querySelectorAll('.nav-btn, .animated-quote-btn');
    quoteButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            createContactPopup();
        });
    });
    
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    // Function to handle menu toggle
    function toggleMobileMenu() {
        mobileMenuToggle?.classList.toggle('active');
        navLinks?.classList.toggle('active');
        
        // Toggle between menu and close icons for Material Icons
        const menuIcon = mobileMenuToggle.querySelector('.material-icons');
        if (menuIcon) {
            if (menuIcon.textContent === 'menu') {
                menuIcon.textContent = 'close';
            } else {
                menuIcon.textContent = 'menu';
            }
        }
    }
    
    // Add event listener to mobile menu toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Close menu when clicking a link
    if (navLinks) {
        const menuLinks = navLinks.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle?.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
});

// Custom styles for the lightbox and popup
const style = document.createElement('style');
style.textContent = `
.contact-popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.contact-popup.show {
    opacity: 1;
}

.popup-content {
    background-color: white;
    padding: 40px;
    border-radius: 12px;
    text-align: center;
    max-width: 90%;
    width: 400px;
    position: relative;
    box-shadow: 0 5px 20px rgba(0,0,0,0.2);
    transform: translateY(20px);
    transition: transform 0.3s ease;
}

.contact-popup.show .popup-content {
    transform: translateY(0);
}

.popup-content h3 {
    margin-top: 0;
    color: #333;
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 25px;
}

.contact-options {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}

.contact-option {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
    width: 45%;
    border-radius: 8px;
    text-decoration: none;
    color: white;
    font-weight: 500;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.contact-option i {
    font-size: 32px;
    margin-bottom: 12px;
}

.contact-option.whatsapp-option {
    background-color: #25D366;
}

.contact-option.call-option {
    background-color: #007bff;
}

.contact-option:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.popup-close {
    position: absolute;
    top: 10px;
    right: 15px;
    font-size: 24px;
    background: none;
    border: none;
    cursor: pointer;
    color: #777;
    transition: color 0.2s ease;
}

.popup-close:hover {
    color: #333;
}

.lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.lightbox.show {
    opacity: 1;
}

.lightbox.fade-out {
    opacity: 0;
}

.lightbox img {
    max-width: 90%;
    max-height: 90%;
    border-radius: 4px;
    box-shadow: 0 5px 30px rgba(0, 0, 0, 0.3);
}

.lightbox-close {
    position: absolute;
    top: 20px;
    right: 20px;
    color: white;
    font-size: 40px;
    cursor: pointer;
    transition: transform 0.3s ease;
}

.lightbox-close:hover {
    transform: rotate(90deg);
}

.form-message {
    padding: 15px;
    margin: 20px 0;
    border-radius: 8px;
    text-align: center;
    font-weight: 500;
    display: none;
}

.form-message.success {
    background-color: rgba(76, 175, 80, 0.2);
    color: #2e7d32;
    border: 1px solid rgba(76, 175, 80, 0.5);
}

.form-message.error {
    background-color: rgba(244, 67, 54, 0.2);
    color: #c62828;
    border: 1px solid rgba(244, 67, 54, 0.5);
}

.error {
    border-color: #f44336 !important;
}
`;
document.head.appendChild(style);
