// Archivo JavaScript para interactividad del cliente
console.log('✅ Script.js cargado correctamente desde archivos estáticos');

// ===== CONTADOR DE VISITAS =====
async function cargarContador() {
    try {
        const respuesta = await fetch('/api/contador');
        const datos = await respuesta.json();

        // Actualizar el contador en la página
        document.getElementById('numero-visitas').textContent = datos.visitas;
        document.getElementById('mensaje-visitas').textContent = datos.mensaje;

        console.log('📊 Contador cargado:', datos.visitas, 'visitas');
    } catch (error) {
        console.error('❌ Error al cargar el contador:', error);
        document.getElementById('numero-visitas').textContent = 'Error';
        document.getElementById('mensaje-visitas').textContent = 'No se pudo cargar la información del contador.';
    }
}

document.addEventListener('DOMContentLoaded', cargarContador);

// ===== CONTADOR DE CLICS (Página de Inicio) =====
const miBoton = document.getElementById('miBoton');
const mensajeDiv = document.getElementById('mensaje');

if (miBoton) {
    let contadorClics = 0;

    miBoton.addEventListener('click', () => {
        contadorClics++;
        
        let mensaje = '';
        
        if (contadorClics === 1) {
            mensaje = '¡Hiciste clic 1 vez! 😊';
        } else if (contadorClics === 2) {
            mensaje = '¡Hiciste clic 2 veces! 🎉';
        } else if (contadorClics === 5) {
            mensaje = '¡Ya van 5 clics! 🚀';
        } else if (contadorClics === 10) {
            mensaje = '¡10 clics alcanzados! 🌟';
        } else if (contadorClics % 10 === 0) {
            mensaje = `¡${contadorClics} clics! ¡Mantén el ritmo! 💪`;
        } else {
            mensaje = `Clics: ${contadorClics} ✨`;
        }
        
        mensajeDiv.textContent = mensaje;
    });
}

// ===== FORMULARIO DE CONTACTO (Página de Contacto) =====
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Obtener datos del formulario
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const asunto = document.getElementById('asunto').value;
        const mensaje = document.getElementById('mensaje').value;
        
        // Validar que los campos no estén vacíos
        if (!nombre || !email || !asunto || !mensaje) {
            mostrarMensaje('Por favor, completa todos los campos', 'error');
            return;
        }
        
        // Simular envío del formulario
        console.log('📧 Formulario enviado:', {
            nombre,
            email,
            asunto,
            mensaje
        });
        
        // Mostrar mensaje de éxito
        mostrarMensaje(`✅ ¡Gracias ${nombre}! Tu mensaje ha sido enviado correctamente. Nos pondremos en contacto pronto.`, 'success');
        
        // Limpiar el formulario
        contactForm.reset();
    });
    
    function mostrarMensaje(texto, tipo) {
        formMessage.textContent = texto;
        formMessage.className = `form-message ${tipo}`;
        
        // Auto-limpiar el mensaje después de 5 segundos (solo errores)
        if (tipo === 'error') {
            setTimeout(() => {
                formMessage.textContent = '';
                formMessage.className = 'form-message';
            }, 5000);
        }
    }
}

// ===== INFORMACIÓN EN LA CONSOLA =====
console.log('🌐 === SISTEMA DE RUTAS EXPRESS ===');
console.log('📄 Archivo: script.js (compartido en todas las páginas)');
console.log('📍 Rutas implementadas:');
console.log('   / - Página de Inicio (con contador de visitas)');
console.log('   /acerca - Información sobre el sitio');
console.log('   /contacto - Formulario de contacto');
console.log('   /agencia - Página de agencia moderna');
console.log('   /reset-contador - Reset del contador (demo)');
console.log('🎯 Middleware: app.use(express.static("public"))');
console.log('📊 Contador de visitas: Variable global en memoria del servidor');
