// Script para página Agencia
console.log('✅ Agencia Script cargado');

// Efecto de clic en botones CTA
const ctaButtons = document.querySelectorAll('.cta-button, .cta-button-large');

ctaButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        // Crear efecto ripple
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Animación de números en scroll
const animateOnScroll = () => {
    const cards = document.querySelectorAll('.servicio-card, .portfolio-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    cards.forEach(card => observer.observe(card));
};

// Información en consola
console.log('🎨 === PÁGINA AGENCIA WEB ===');
console.log('📄 Archivo: agencia.html + agencia-styles.css');
console.log('🎨 Diseño completamente diferente al proyecto anterior');
console.log('✨ Características:');
console.log('   ✓ Navegación Sticky moderna');
console.log('   ✓ Hero section con efectos flotantes');
console.log('   ✓ Grid de servicios con hover effects');
console.log('   ✓ Portfolio de proyectos');
console.log('   ✓ Testimonios con glassmorphism');
console.log('   ✓ Footer responsivo');
console.log('🎯 Tecnologías CSS:');
console.log('   ✓ CSS Grid y Flexbox');
console.log('   ✓ Gradientes lineales');
console.log('   ✓ Animaciones @keyframes');
console.log('   ✓ Backdrop-filter (glassmorphism)');
console.log('   ✓ Media queries responsivas');
console.log('══════════════════════════');

// Inicializar animaciones en scroll
animateOnScroll();
