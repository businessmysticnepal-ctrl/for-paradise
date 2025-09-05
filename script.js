document.addEventListener('DOMContentLoaded', function() {

    // --- Mobile Navigation ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    // --- Counter Animation ---
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower

    const startCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    // --- Intersection Observer for starting counters on scroll ---
    const impactSection = document.querySelector('#impact');
    let hasAnimated = false; // Flag to ensure animation runs only once

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                startCounters();
                hasAnimated = true; // Set flag to true after animating
                observer.unobserve(impactSection); // Optional: stop observing after animation
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the element is visible
    });

    observer.observe(impactSection);

    // --- Basic Contact Form Submission (for demonstration) ---
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevents the default form submission

        // You would typically send form data to a server here.
        // For this example, we'll just show an alert.
        const name = document.getElementById('name').value;
        alert(`Thank you, ${name}! Your message has been received. We will get back to you soon.`);
        
        contactForm.reset(); // Clear the form fields
    });

});