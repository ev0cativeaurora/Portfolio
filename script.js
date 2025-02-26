// Mobile menu toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu) {
    mobileMenu.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
}

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// Check saved theme
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
}

// Scroll to top button
const scrollTop = document.querySelector('.scroll-top');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        scrollTop.classList.add('active');
    } else {
        scrollTop.classList.remove('active');
    }
});

scrollTop.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Update active class in navigation
            document.querySelectorAll('.nav-links a').forEach(navLink => {
                navLink.classList.remove('active');
            });
            if (this.classList.contains('nav-links') || this.parentElement.classList.contains('nav-links')) {
                this.classList.add('active');
            }
            
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            navLinks.classList.remove('active');
        }
    });
});

// Set active nav item based on scroll position
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    
    // Get all sections
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-links a').forEach(navLink => {
                navLink.classList.remove('active');
                if (navLink.getAttribute('href') === '#' + sectionId) {
                    navLink.classList.add('active');
                }
            });
        }
    });
});

// Form Handling with Validation
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Create error message element function
        function createErrorMessage(inputElement, message) {
            // Remove any existing error
            clearErrorMessage(inputElement);
            
            // Create error element
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = message;
            errorMessage.style.color = '#dc3545';
            errorMessage.style.fontSize = '12px';
            errorMessage.style.marginTop = '5px';
            
            // Add error class to input
            inputElement.style.borderColor = '#dc3545';
            
            // Insert error after input
            inputElement.parentNode.appendChild(errorMessage);
        }
        
        // Clear error message function
        function clearErrorMessage(inputElement) {
            // Reset input style
            inputElement.style.borderColor = '';
            
            // Remove error message if exists
            const existingError = inputElement.parentNode.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
        }
        
        // Clear errors on input focus
        contactForm.querySelectorAll('input, textarea').forEach(element => {
            element.addEventListener('focus', function() {
                clearErrorMessage(this);
            });
        });
        
        // Form submission handler
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form inputs
            const firstName = document.getElementById('firstName');
            const lastName = document.getElementById('lastName');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const message = document.getElementById('message');
            const submitButton = contactForm.querySelector('button[type="submit"]');
            
            // Clear all previous errors
            contactForm.querySelectorAll('input, textarea').forEach(element => {
                clearErrorMessage(element);
            });
            
            // Validate inputs
            let isValid = true;
            
            // First Name validation
            if (!firstName.value.trim()) {
                createErrorMessage(firstName, 'Please enter your first name');
                isValid = false;
            }
            
            // Last Name validation
            if (!lastName.value.trim()) {
                createErrorMessage(lastName, 'Please enter your last name');
                isValid = false;
            }
            
            // Email validation
            if (!email.value.trim()) {
                createErrorMessage(email, 'Please enter your email address');
                isValid = false;
            } else {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(email.value.trim())) {
                    createErrorMessage(email, 'Please enter a valid email address');
                    isValid = false;
                }
            }
            
            // Message validation
            if (!message.value.trim()) {
                createErrorMessage(message, 'Please enter your message');
                isValid = false;
            }
            
            // If validation fails, stop form submission
            if (!isValid) {
                return;
            }
            
            // Get selected subject (radio button)
            const selectedSubject = document.querySelector('input[name="subject"]:checked');
            const subjectText = selectedSubject 
                ? selectedSubject.parentElement.textContent.trim() 
                : 'General Inquiry';
            
            // Prepare form data object for submission
            const formData = {
                firstName: firstName.value.trim(),
                lastName: lastName.value.trim(),
                email: email.value.trim(),
                phone: phone.value.trim() || 'Not provided',
                subject: subjectText,
                message: message.value.trim()
            };
            
            console.log('Form Data:', formData);
            
            // Show loading state
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate form submission (remove setTimeout in production and implement real API call)
            setTimeout(function() {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Thank you for your message! I will get back to you soon.';
                successMessage.style.color = '#28a745';
                successMessage.style.padding = '15px';
                successMessage.style.marginTop = '20px';
                successMessage.style.backgroundColor = 'rgba(40, 167, 69, 0.1)';
                successMessage.style.borderRadius = '5px';
                
                // Insert success message before the form
                contactForm.parentNode.insertBefore(successMessage, contactForm);
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
                
                // Auto-remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
                
            }, 1500); // Simulating server delay
        });
    }
});