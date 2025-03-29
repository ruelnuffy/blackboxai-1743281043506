// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'hidden md:hidden bg-white w-full absolute z-10 shadow-lg';
    mobileMenu.innerHTML = `
        <div class="flex flex-col">
            <a href="#" class="py-2 px-4 text-gray-500 font-semibold hover:text-blue-500 hover:bg-gray-100">Home</a>
            <a href="#" class="py-2 px-4 text-gray-500 font-semibold hover:text-blue-500 hover:bg-gray-100">Features</a>
            <a href="#" class="py-2 px-4 text-gray-500 font-semibold hover:text-blue-500 hover:bg-gray-100">Testimonials</a>
            <a href="#" class="py-2 px-4 text-gray-500 font-semibold hover:text-blue-500 hover:bg-gray-100">FAQ</a>
            <a href="#" class="py-2 px-4 text-gray-500 font-semibold hover:text-blue-500 hover:bg-gray-100">Contact</a>
        </div>
    `;
    document.querySelector('nav').appendChild(mobileMenu);

    // Toggle mobile menu
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Testimonial carousel functionality
    let currentTestimonial = 0;
    const testimonials = [
        {
            name: "John D.",
            role: "Investor",
            content: "I made $5,000 in my first month using this system. It's changed my life!"
        },
        {
            name: "Sarah M.",
            role: "Freelancer",
            content: "The training materials are excellent. I've doubled my income in just 2 weeks."
        },
        {
            name: "Michael T.",
            role: "Entrepreneur",
            content: "Best investment I've ever made. The support team is incredibly helpful."
        }
    ];

    function updateTestimonial() {
        const testimonialContainer = document.getElementById('testimonial-content');
        if (testimonialContainer) {
            testimonialContainer.innerHTML = `
                <p class="text-lg italic mb-4">"${testimonials[currentTestimonial].content}"</p>
                <p class="font-bold">${testimonials[currentTestimonial].name}</p>
                <p class="text-gray-600">${testimonials[currentTestimonial].role}</p>
            `;
        }
    }

    // Initialize testimonial if element exists
    if (document.getElementById('testimonial-content')) {
        updateTestimonial();
        let testimonialInterval = setInterval(rotateTestimonials, 5000);

        function rotateTestimonials() {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            updateTestimonial();
        }

        // Manual navigation buttons
        document.querySelector('.testimonial-prev')?.addEventListener('click', () => {
            clearInterval(testimonialInterval);
            currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
            updateTestimonial();
            testimonialInterval = setInterval(rotateTestimonials, 5000);
        });

        document.querySelector('.testimonial-next')?.addEventListener('click', () => {
            clearInterval(testimonialInterval);
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            updateTestimonial();
            testimonialInterval = setInterval(rotateTestimonials, 5000);
        });
    }

    // Form validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            let isValid = true;

            // Reset error states
            [nameInput, emailInput, messageInput].forEach(input => {
                input.classList.remove('border-red-500');
                const errorElement = document.getElementById(`${input.id}-error`);
                if (errorElement) errorElement.remove();
            });

            // Name validation
            if (!nameInput.value.trim()) {
                showError(nameInput, 'Please enter your name');
                isValid = false;
            }

            // Email validation
            if (!emailInput.value.trim()) {
                showError(emailInput, 'Please enter your email');
                isValid = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email');
                isValid = false;
            }

            // Message validation
            if (!messageInput.value.trim()) {
                showError(messageInput, 'Please enter your message');
                isValid = false;
            }

            if (isValid) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4';
                successMessage.innerHTML = `
                    <strong class="font-bold">Success!</strong>
                    <span class="block sm:inline">Thank you for your message! We will contact you soon.</span>
                `;
                contactForm.prepend(successMessage);
                
                // Reset form
                contactForm.reset();
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }
        });

        function showError(input, message) {
            input.classList.add('border-red-500');
            const errorElement = document.createElement('p');
            errorElement.id = `${input.id}-error`;
            errorElement.className = 'mt-1 text-sm text-red-600';
            errorElement.textContent = message;
            input.parentNode.insertBefore(errorElement, input.nextSibling);
        }
    }

    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isOpen = answer.classList.contains('max-h-0');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.querySelector('.faq-answer').classList.add('max-h-0');
                    otherItem.querySelector('.faq-question i').classList.replace('fa-minus', 'fa-plus');
                }
            });

            // Toggle current item
            if (isOpen) {
                answer.classList.remove('max-h-0');
                question.querySelector('i').classList.replace('fa-plus', 'fa-minus');
            } else {
                answer.classList.add('max-h-0');
                question.querySelector('i').classList.replace('fa-minus', 'fa-plus');
            }
        });
    });
});