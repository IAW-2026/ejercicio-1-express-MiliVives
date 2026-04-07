const express = require('express');
const path = require('path');
const app = express();

// Variable global para contar visitas a la ruta raíz
let contadorVisitas = 0;

// Lista en memoria de mensajes enviados desde el formulario de contacto
const mensajesEnMemoria = [];

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta raíz - Página de Inicio
app.get('/', (req, res) => {
  // Incrementar contador cada vez que se accede
  contadorVisitas++;

  // Log para debugging
  console.log(`🏠 Visita #${contadorVisitas} a la página principal`);

  // Servir el archivo HTML estático
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta API GET para obtener el contador de visitas
app.get('/api/contador', (req, res) => {
  console.log(`📊 API llamada - Contador actual: ${contadorVisitas}`);
  res.json({
    visitas: contadorVisitas,
    mensaje: `Esta página ha sido visitada ${contadorVisitas} ${contadorVisitas === 1 ? 'vez' : 'veces'} desde que se inició el servidor.`
  });
});

// Array simulado de productos
const productos = [
  {
    id: 1,
    nombre: 'Laptop Pro',
    descripcion: 'Computadora portátil de alta performance para profesionales',
    precio: 999.99,
    categoria: 'Electrónica',
    stock: 15
  },
  {
    id: 2,
    nombre: 'Mouse Inalámbrico',
    descripcion: 'Mouse ergonómico con conexión inalámbrica de 2.4GHz',
    precio: 29.99,
    categoria: 'Accesorios',
    stock: 50
  },
  {
    id: 3,
    nombre: 'Teclado Mecánico RGB',
    descripcion: 'Teclado gaming con switches mecánicos y iluminación RGB',
    precio: 149.99,
    categoria: 'Accesorios',
    stock: 20
  },
  {
    id: 4,
    nombre: 'Monitor LED 27"',
    descripcion: 'Monitor 4K UHD con panel IPS y soporte VESA',
    precio: 399.99,
    categoria: 'Electrónica',
    stock: 8
  },
  {
    id: 5,
    nombre: 'Auriculares Bluetooth',
    descripcion: 'Auriculares inalámbricos con cancelación de ruido activa',
    precio: 199.99,
    categoria: 'Audio',
    stock: 25
  },
  {
    id: 6,
    nombre: 'Webcam 1080P',
    descripcion: 'Cámara web Full HD con micrófono integrado',
    precio: 79.99,
    categoria: 'Electrónica',
    stock: 30
  }
];

// Ruta API GET para obtener lista de productos
app.get('/api/productos', (req, res) => {
  console.log(`📦 API llamada - Se solicitaron ${productos.length} productos`);
  res.json({
    cantidad: productos.length,
    productos: productos
  });
});

app.get('/productos', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'productos.html'));
});

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static('public'));

// Ruta /acerca - Página de Información
app.get('/acerca', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'acerca.html'));
});

// Ruta /contacto GET - Mostrar formulario
app.get('/contacto', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contacto.html'));
});

// Ruta /contacto POST - Procesar datos del formulario
app.post('/contacto', (req, res) => {
  // Obtener datos del formulario desde req.body
  const { nombre, email, mensaje } = req.body;

  // Validar que los datos no estén vacíos
  if (!nombre || !email || !mensaje) {
    return res.status(400).send(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Error - Express Contacto</title>
        <link rel="stylesheet" href="styles.css">
      </head>
      <body>
        <div class="container">
          <h1>❌ Error</h1>
          <div class="content" style="background-color: #fed7d7; border-left-color: #fc8181;">
            <h2>Campos incompletos</h2>
            <p>Por favor, completa todos los campos del formulario.</p>
            <div class="navigation-buttons">
              <a href="/contacto" class="btn btn-primary">← Volver al Formulario</a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `);
  }

  // Procesar datos correctamente
  console.log('📨 Datos recibidos del formulario:');
  console.log('  Nombre:', nombre);
  console.log('  Email:', email);
  console.log('  Mensaje:', mensaje);
  console.log('  Hora:', new Date().toLocaleString());

  // Guardar el mensaje en memoria
  mensajesEnMemoria.push({
    nombre,
    email,
    mensaje,
    fecha: new Date().toLocaleString()
  });

  const mensajesHtml = mensajesEnMemoria.map((item, index) => `
            <div class="message-card">
              <div class="message-header">
                <span><strong>${item.nombre}</strong> dijo:</span>
                <small>${item.fecha}</small>
              </div>
              <p>${item.mensaje}</p>
            </div>
          `).join('');

  // Enviar respuesta HTML con todos los mensajes acumulados
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Mensajes Guardados - Express Contacto</title>
      <link rel="stylesheet" href="styles.css">
    </head>
    <body>
      <div class="container">
        <nav class="navbar">
          <ul>
            <li><a href="/" class="nav-link">🏠 Inicio</a></li>
            <li><a href="/acerca" class="nav-link">ℹ️ Acerca</a></li>
            <li><a href="/contacto" class="nav-link active">📬 Contacto</a></li>
            <li><a href="/encuesta" class="nav-link">❓ Encuesta</a></li>
          </ul>
        </nav>

        <h1>✅ Mensaje Guardado</h1>
        
        <div class="content" style="background-color: #c6f6d5; border-left-color: #48bb78;">
          <h2>Mostrando todos los mensajes</h2>
          <p>El servidor guarda tus respuestas en memoria y las muestra juntas en cada envío.</p>
        </div>

        <div class="messages-list">
          ${mensajesHtml}
        </div>

        <div class="navigation-buttons">
          <a href="/contacto" class="btn btn-primary">✏️ Enviar otro mensaje</a>
          <a href="/" class="btn btn-secondary">🏠 Volver al Inicio</a>
        </div>
      </div>
    </body>
    </html>
  `);
});

// Nueva ruta /encuesta GET - mostrar formulario de selección
app.get('/encuesta', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'encuesta.html'));
});

// Nueva ruta /encuesta POST - procesar respuesta
app.post('/encuesta', (req, res) => {
  const { nombre, lenguaje } = req.body;

  if (!nombre || !lenguaje) {
    return res.status(400).send(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Error - Encuesta</title>
        <link rel="stylesheet" href="styles.css">
      </head>
      <body>
        <div class="container">
          <h1>❌ Error</h1>
          <div class="content" style="background-color: #fed7d7; border-left-color: #fc8181;">
            <h2>Faltan datos</h2>
            <p>Por favor, selecciona un lenguaje y escribe tu nombre.</p>
            <div class="navigation-buttons">
              <a href="/encuesta" class="btn btn-primary">← Volver a la encuesta</a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `);
  }

  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Resultado de la Encuesta</title>
      <link rel="stylesheet" href="styles.css">
    </head>
    <body>
      <div class="container">
        <nav class="navbar">
          <ul>
            <li><a href="/" class="nav-link">🏠 Inicio</a></li>
            <li><a href="/acerca" class="nav-link">ℹ️ Acerca</a></li>
            <li><a href="/contacto" class="nav-link">📬 Contacto</a></li>
            <li><a href="/encuesta" class="nav-link active">❓ Encuesta</a></li>
          </ul>
        </nav>

        <h1>✅ Encuesta Enviada</h1>

        <div class="content" style="background-color: #c6f6d5; border-left-color: #48bb78;">
          <h2>Gracias por participar, ${nombre}.</h2>
          <p>El servidor registró tu opción seleccionada.</p>
        </div>

        <div class="form-container">
          <div style="background-color: #f0f7ff; padding: 2rem; border-radius: 10px; border-left: 4px solid #4299e1;">
            <p><strong>Nombre:</strong> ${nombre}</p>
            <p><strong>Lenguaje favorito:</strong> ${lenguaje}</p>
          </div>
        </div>

        <div class="navigation-buttons">
          <a href="/encuesta" class="btn btn-primary">Responder otra vez</a>
          <a href="/" class="btn btn-secondary">Volver al Inicio</a>
        </div>
      </div>
    </body>
    </html>
  `);
});

// Ruta /reset-contador - Para reiniciar el contador (solo para demo)
app.get('/reset-contador', (req, res) => {
  contadorVisitas = 0;
  console.log('🔄 Contador de visitas reseteado a 0');
  res.redirect('/');
});

// Middleware básico para manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: '¡Algo salió mal!' });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});