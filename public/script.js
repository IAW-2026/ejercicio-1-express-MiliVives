// Archivo JavaScript para interactividad del cliente
console.log('✅ Script.js cargado correctamente desde archivos estáticos');

// Obtener elementos del DOM
const miBoton = document.getElementById('miBoton');
const mensajeDiv = document.getElementById('mensaje');

// Contador de clics
let contadorClics = 0;

// Event listener para el botón
miBoton.addEventListener('click', () => {
    contadorClics++;
    
    // Mensajes diferentes según el número de clics
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

// Información en la consola
console.log('📄 Archivos estáticos siendo servidos por Express');
console.log('📁 Carpeta: public/');
console.log('📝 Archivos:');
console.log('   - index.html (este archivo)');
console.log('   - styles.css (estilos CSS)');
console.log('   - script.js (este script)');
console.log('🎯 Middleware: app.use(express.static("public"))');
