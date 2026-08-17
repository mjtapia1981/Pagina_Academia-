// ============================================
// CONTADORES NUMERICOS ANIMADOS
// ============================================

// Función principal para animar los contadores
function animateCounters() {
    // Seleccionar todos los elementos con clase "counter"
    const counters = document.querySelectorAll('.counter');
    
    // Recorrer cada contador
    counters.forEach(counter => {
        // Obtener el número objetivo del atributo data-target
        const target = parseInt(counter.getAttribute('data-target'));
        // Obtener el número inicial (0 por defecto)
        let current = 0;
        // Calcular el incremento (target / 60 pasos)
        const increment = target / 60;
        
        // Crear un intervalo que se ejecuta cada 25 milisegundos
        const timer = setInterval(() => {
            // Sumar el incremento al valor actual
            current += increment;
            
            // Si ya alcanzamos o superamos el objetivo
            if (current >= target) {
                // Mostrar el número objetivo exacto
                counter.textContent = target;
                // Detener el intervalo
                clearInterval(timer);
            } else {
                // Mostrar el número actual (sin decimales)
                counter.textContent = Math.floor(current);
            }
        }, 25); // 25 milisegundos entre cada actualización
    });
}

// Ejecutar la animación cuando la página se haya cargado completamente
window.addEventListener('load', function() {
    // Esperar medio segundo para asegurar que todo esté listo
    setTimeout(() => {
        animateCounters();
    }, 500);
});

// ============================================
// MODO OSCURO
// ============================================

const darkModeBtn = document.getElementById('darkModeBtn');
const body = document.body;

if (darkModeBtn) {
    // Verificar preferencia guardada
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        darkModeBtn.innerHTML = '<i class="bi bi-sun"></i>';
    }

    // Evento click del botón modo oscuro
    darkModeBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            darkModeBtn.innerHTML = '<i class="bi bi-sun"></i>';
        } else {
            localStorage.setItem('darkMode', 'disabled');
            darkModeBtn.innerHTML = '<i class="bi bi-moon-stars"></i>';
        }
    });
}

// ============================================
// BOTON VOLVER ARRIBA
// ============================================

const btnTop = document.getElementById('btnTop');

if (btnTop) {
    // Mostrar/ocultar botón según el scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btnTop.style.display = 'flex';
            btnTop.style.opacity = '1';
        } else {
            btnTop.style.display = 'none';
            btnTop.style.opacity = '0';
        }
    });

    // Al hacer click, volver arriba suavemente
    btnTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================

const navbar = document.querySelector('.navbar-custom');

if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = '#051b2e';
            navbar.style.padding = '0.5rem 0';
        } else {
            navbar.style.backgroundColor = '#0a2b44';
            navbar.style.padding = '1rem 0';
        }
    });
}

// ============================================
// ANCLAS SUAVES PARA EL NAVBAR
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            e.preventDefault();
            const navbarHeight = 0;
            const targetPosition = targetElement.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// VALIDACION DEL FORMULARIO
// ============================================

const contactForm = document.querySelector('#contacto form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nombre = contactForm.querySelector('input[type="text"]:first-of-type');
        const email = contactForm.querySelector('input[type="email"]');
        const telefono = contactForm.querySelectorAll('input[type="text"]')[1];
        
        let isValid = true;
        let errorMessage = '';
        
        // Validar nombre
        if (!nombre.value.trim()) {
            isValid = false;
            errorMessage += 'Por favor, ingresa tu nombre.\n';
            nombre.classList.add('is-invalid');
        } else {
            nombre.classList.remove('is-invalid');
        }
        
        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim() || !emailRegex.test(email.value)) {
            isValid = false;
            errorMessage += 'Por favor, ingresa un email válido.\n';
            email.classList.add('is-invalid');
        } else {
            email.classList.remove('is-invalid');
        }
        
        // Validar teléfono
        if (!telefono.value.trim()) {
            isValid = false;
            errorMessage += 'Por favor, ingresa tu teléfono.\n';
            telefono.classList.add('is-invalid');
        } else {
            telefono.classList.remove('is-invalid');
        }
        
        if (isValid) {
            alert('¡Mensaje enviado con éxito! Nos contactaremos a la brevedad.');
            contactForm.reset();
        } else {
            alert('Por favor corrige los siguientes errores:\n' + errorMessage);
        }
    });
    
    // Remover clase invalid al escribir
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            input.classList.remove('is-invalid');
        });
    });
}

// ============================================
// DETECTAR SECCIÓN ACTIVA EN EL NAVBAR
// ============================================

function detectActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    const scrollPosition = window.scrollY + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', () => {
    detectActiveSection();
});

detectActiveSection();

// ============================================
// EFECTO DE CARGA
// ============================================

console.log('✅ Nova Academy - JavaScript cargado correctamente');