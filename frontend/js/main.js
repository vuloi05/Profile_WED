// Navigation scroll effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact form handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());
        
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (response.ok) {
                alert('Gửi tin nhắn thành công!');
                contactForm.reset();
            } else {
                alert(result.message || 'Có lỗi xảy ra. Vui lòng thử lại sau.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
        }
    });
}

// Mobile menu toggle
const createMobileMenu = () => {
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    
    // Create mobile menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.classList.add('mobile-menu-btn');
    mobileMenuBtn.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    
    // Add mobile menu styles
    const style = document.createElement('style');
    style.textContent = `
        .mobile-menu-btn {
            display: none;
            background: none;
            border: none;
            cursor: pointer;
            padding: 0.5rem;
        }
        
        .mobile-menu-btn span {
            display: block;
            width: 25px;
            height: 3px;
            background: var(--light);
            margin: 5px 0;
            transition: all 0.3s ease;
        }
        
        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: block;
            }
            
            .nav-links {
                position: fixed;
                top: 70px;
                left: 0;
                width: 100%;
                background: rgba(15, 23, 42, 0.98);
                padding: 2rem;
                flex-direction: column;
                align-items: center;
                transform: translateY(-100%);
                opacity: 0;
                transition: all 0.3s ease;
            }
            
            .nav-links.active {
                transform: translateY(0);
                opacity: 1;
            }
            
            .mobile-menu-btn.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .mobile-menu-btn.active span:nth-child(2) {
                opacity: 0;
            }
            
            .mobile-menu-btn.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -6px);
            }
        }
    `;
    
    document.head.appendChild(style);
    nav.insertBefore(mobileMenuBtn, navLinks);
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && navLinks.classList.contains('active')) {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
};

// Initialize mobile menu
createMobileMenu();

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements with animation classes
document.querySelectorAll('.fade-in, .slide-in').forEach(element => {
    observer.observe(element);
});

// Add animation styles
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    .fade-in {
        opacity: 0;
        transition: opacity 0.6s ease-out;
    }
    
    .fade-in.animate {
        opacity: 1;
    }
    
    .slide-in {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease-out;
    }
    
    .slide-in.animate {
        opacity: 1;
        transform: translateY(0);
    }
`;

document.head.appendChild(animationStyles); 