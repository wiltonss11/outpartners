// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Smooth scrolling para links de navegação
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animação de contagem para estatísticas
    const statNumbers = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                animateCounter(target, finalValue);
                observer.unobserve(target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => {
        observer.observe(stat);
    });

    // Função para animar contadores
    function animateCounter(element, finalValue) {
        const isPercentage = finalValue.includes('%');
        const isCurrency = finalValue.includes('R$');
        const isTime = finalValue.includes('24/7');
        
        if (isTime) {
            element.textContent = finalValue;
            return;
        }

        const numericValue = parseInt(finalValue.replace(/[^\d]/g, ''));
        let currentValue = 0;
        const increment = numericValue / 50;
        const duration = 2000;
        const stepTime = duration / 50;

        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= numericValue) {
                currentValue = numericValue;
                clearInterval(timer);
            }

            let displayValue = Math.floor(currentValue);
            if (isPercentage) {
                element.textContent = displayValue + '%';
            } else if (isCurrency) {
                element.textContent = 'R$ ' + displayValue.toLocaleString() + 'M+';
            } else {
                element.textContent = displayValue.toLocaleString() + '+';
            }
        }, stepTime);
    }

    // Efeito de hover nos cards de serviço
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Carrossel de depoimentos
    initTestimonialsCarousel();

    // Botões interativos
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            // Adicionar efeito de ripple
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }

    // WhatsApp button com efeito de pulso
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    if (whatsappBtn) {
        setInterval(() => {
            whatsappBtn.style.transform = 'scale(1.05)';
            setTimeout(() => {
                whatsappBtn.style.transform = 'scale(1)';
            }, 200);
        }, 3000);
    }

    // Formulário de contato
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Aqui você pode adicionar a lógica para enviar o formulário
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        });
    }

    // Portfolio modals
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    portfolioCards.forEach(card => {
        card.addEventListener('click', function() {
            const modalId = this.getAttribute('data-target');
            const modal = document.querySelector(modalId);
            if (modal) {
                $(modal).modal('show');
            }
        });
    });

    // Criar partículas flutuantes tecnológicas
    createTechParticles();

    // Efeito de digitação no título principal
    initTypewriterEffect();
});

// Função para inicializar o carrossel de depoimentos
function initTestimonialsCarousel() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentSlide = 0;
    const totalSlides = testimonialCards.length;

    function showSlide(index) {
        // Esconder todos os slides
        testimonialCards.forEach(card => {
            card.classList.remove('active');
        });
        
        // Remover classe active de todos os indicadores
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        // Mostrar slide atual
        testimonialCards[index].classList.add('active');
        indicators[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }

    // Event listeners para botões
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }

    // Event listeners para indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // Auto-play do carrossel
    setInterval(nextSlide, 5000);
}

// Função para criar partículas tecnológicas
function createTechParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'tech-particles';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 15; i++) {
        createTechParticle(particlesContainer);
    }
}

function createTechParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'tech-particle';
    particle.style.cssText = `
        position: absolute;
        width: 3px;
        height: 3px;
        background: rgba(0, 194, 135, 0.8);
        border-radius: 50%;
        animation: techFloat 8s infinite linear;
        left: ${Math.random() * 100}%;
        animation-delay: ${Math.random() * 8}s;
        box-shadow: 0 0 10px rgba(0, 194, 135, 0.6);
    `;
    container.appendChild(particle);
}

// Função para efeito de digitação
function initTypewriterEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Iniciar animação após um pequeno delay
        setTimeout(typeWriter, 1000);
    }
}

// Adicionar CSS para animações tecnológicas
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(0, 194, 135, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .testimonial-card {
        transition: all 0.5s ease;
    }

    .portfolio-card {
        transition: all 0.3s ease;
    }

    .portfolio-card:hover {
        transform: translateY(-10px);
    }

    .service-card {
        transition: all 0.3s ease;
    }

    .service-card:hover {
        transform: translateY(-10px);
    }

    .contact-item {
        transition: all 0.3s ease;
    }

    .contact-item:hover {
        transform: translateX(10px);
    }

    .social-link {
        transition: all 0.3s ease;
    }

    .social-link:hover {
        transform: translateY(-3px);
    }

    @keyframes techFloat {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }

    .tech-particle {
        box-shadow: 0 0 15px rgba(0, 194, 135, 0.8);
    }

    /* Efeito de brilho nos cards */
    .service-card::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(45deg, transparent, rgba(0, 194, 135, 0.1), transparent);
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
    }

    .service-card:hover::after {
        opacity: 1;
    }

    /* Efeito de scan line */
    .hero-section::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: linear-gradient(90deg, transparent, rgba(0, 194, 135, 0.8), transparent);
        animation: scanLine 3s ease-in-out infinite;
    }

    @keyframes scanLine {
        0% {
            transform: translateY(-100vh);
        }
        100% {
            transform: translateY(100vh);
        }
    }
`;
document.head.appendChild(style);

// Função para adicionar efeito de glassmorphism
function addGlassmorphismEffect() {
    const cards = document.querySelectorAll('.service-card, .portfolio-card, .testimonial-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

// Inicializar efeito glassmorphism após carregamento
window.addEventListener('load', function() {
    setTimeout(addGlassmorphismEffect, 1000);
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = '0 8px 32px rgba(0, 194, 135, 0.1)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.9)';
        navbar.style.boxShadow = '0 8px 32px rgba(0, 194, 135, 0.1)';
    }
}); 