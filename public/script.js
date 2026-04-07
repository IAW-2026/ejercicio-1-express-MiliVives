// Archivo JavaScript para interactividad del cliente
console.log('✅ Script.js cargado correctamente desde archivos estáticos');

// ===== CONTADOR DE VISITAS =====
async function cargarContador() {
    const numeroVisitasEl = document.getElementById('numero-visitas');
    const mensajeVisitasEl = document.getElementById('mensaje-visitas');

    if (!numeroVisitasEl || !mensajeVisitasEl) {
        return;
    }

    try {
        const respuesta = await fetch('/api/contador');
        const datos = await respuesta.json();

        // Actualizar el contador en la página
        numeroVisitasEl.textContent = datos.visitas;
        mensajeVisitasEl.textContent = datos.mensaje;

        console.log('📊 Contador cargado:', datos.visitas, 'visitas');
    } catch (error) {
        console.error('❌ Error al cargar el contador:', error);
        numeroVisitasEl.textContent = 'Error';
        mensajeVisitasEl.textContent = 'No se pudo cargar la información del contador.';
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

// ===== FRASES ALEATORIAS =====
async function obtenerFraseAleatoria() {
    const fraseTextoEl = document.getElementById('frase-texto');
    const fraseInfoEl = document.getElementById('frase-info');
    const boton = document.getElementById('obtener-frase-btn');

    if (!fraseTextoEl || !fraseInfoEl || !boton) {
        return; // Salir si los elementos no existen en esta página
    }

    try {
        // Cambiar el texto del botón mientras carga
        const textoOriginal = boton.textContent;
        boton.textContent = '⏳ Cargando...';
        boton.disabled = true;

        console.log('📡 Solicitando frase aleatoria al servidor...');

        // Hacer fetch a la ruta /frase
        const response = await fetch('/frase');

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();

        console.log('✅ Frase recibida:', data.frase);

        // Actualizar el texto de la frase con animación
        fraseTextoEl.textContent = `"${data.frase}"`;
        fraseTextoEl.classList.add('frase-nueva');

        // Actualizar la información adicional
        fraseInfoEl.textContent = `💡 Frase ${Math.floor(Math.random() * data.total_frases) + 1} de ${data.total_frases} disponibles`;

        // Remover la clase de animación después de un tiempo
        setTimeout(() => {
            fraseTextoEl.classList.remove('frase-nueva');
        }, 500);

    } catch (error) {
        console.error('❌ Error al obtener frase:', error);
        fraseTextoEl.textContent = '❌ Error al cargar la frase. Inténtalo de nuevo.';
        fraseInfoEl.textContent = '💡 Verifica que el servidor esté ejecutándose';
    } finally {
        // Restaurar el botón
        boton.textContent = '🎲 Obtener Frase Aleatoria';
        boton.disabled = false;
    }
}

// Agregar event listener al botón de frases cuando la página carga
document.addEventListener('DOMContentLoaded', function() {
    const botonFrase = document.getElementById('obtener-frase-btn');
    if (botonFrase) {
        botonFrase.addEventListener('click', obtenerFraseAleatoria);
    }
});

// ===== FORMULARIO DE SALUDO PERSONALIZADO =====
async function enviarSaludo(event) {
    event.preventDefault(); // Prevenir envío tradicional del formulario

    const nombreInput = document.getElementById('nombre-saludo');
    const saludoBtn = document.getElementById('saludo-btn');
    const respuestaDiv = document.getElementById('saludo-respuesta');
    const saludoTexto = document.getElementById('saludo-texto');
    const saludoInfo = document.getElementById('saludo-info');

    const nombre = nombreInput.value.trim();

    // Validación básica
    if (!nombre) {
        mostrarRespuestaSaludo('❌ Por favor, ingresa tu nombre.', 'error');
        return;
    }

    try {
        // Deshabilitar el botón mientras se envía
        const textoOriginal = saludoBtn.textContent;
        saludoBtn.disabled = true;
        saludoBtn.textContent = '⏳ Enviando...';

        console.log('📡 Enviando nombre al servidor para saludo personalizado...');

        // Enviar datos usando fetch POST
        const response = await fetch('/api/saludo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre: nombre
            })
        });

        const data = await response.json();

        if (response.ok && data.success) {
            // Éxito: mostrar el saludo personalizado
            mostrarRespuestaSaludo(data.saludo, 'success', data.mensaje_adicional);

            console.log('✅ Saludo recibido:', data.saludo);
        } else {
            // Error del servidor
            mostrarRespuestaSaludo(data.mensaje || 'Error desconocido del servidor', 'error');
            console.error('❌ Error del servidor:', data);
        }

    } catch (error) {
        // Error de conexión
        mostrarRespuestaSaludo('❌ Error de conexión. Verifica que el servidor esté ejecutándose.', 'error');
        console.error('❌ Error de fetch:', error);
    } finally {
        // Rehabilitar el botón
        saludoBtn.disabled = false;
        saludoBtn.textContent = '🚀 Enviar Saludo';
    }
}

function mostrarRespuestaSaludo(texto, tipo, infoAdicional = '') {
    const respuestaDiv = document.getElementById('saludo-respuesta');
    const saludoTexto = document.getElementById('saludo-texto');
    const saludoInfo = document.getElementById('saludo-info');

    // Determinar colores según el tipo
    const colores = {
        success: { bg: 'rgba(72, 187, 120, 0.2)', border: 'rgba(72, 187, 120, 0.5)', text: '#c6f6d5' },
        error: { bg: 'rgba(252, 129, 129, 0.2)', border: 'rgba(252, 129, 129, 0.5)', text: '#fed7d7' }
    };

    const color = colores[tipo] || colores.error;

    // Actualizar contenido
    saludoTexto.textContent = texto;
    saludoInfo.textContent = infoAdicional || (tipo === 'success' ? '💡 Respuesta generada dinámicamente por el servidor' : '💡 Inténtalo de nuevo');

    // Aplicar estilos
    respuestaDiv.style.background = color.bg;
    respuestaDiv.style.borderLeft = `4px solid ${color.border}`;

    // Mostrar el contenedor con animación
    respuestaDiv.style.display = 'block';
    respuestaDiv.classList.add('respuesta-nueva');

    // Remover clase de animación después de un tiempo
    setTimeout(() => {
        respuestaDiv.classList.remove('respuesta-nueva');
    }, 500);

    // Hacer scroll hasta la respuesta
    respuestaDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Agregar event listener al formulario de saludo cuando la página carga
document.addEventListener('DOMContentLoaded', function() {
    const saludoForm = document.getElementById('saludo-form');
    if (saludoForm) {
        saludoForm.addEventListener('submit', enviarSaludo);
    }
});
