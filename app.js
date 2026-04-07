const express = require('express');
const path = require('path');
const app = express();

// Variable global para contar visitas a la ruta raíz
let contadorVisitas = 0;

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

  // Enviar respuesta HTML con los datos recibidos
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Mensaje Enviado - Express Contacto</title>
      <link rel="stylesheet" href="styles.css">
    </head>
    <body>
      <div class="container">
        <nav class="navbar">
          <ul>
            <li><a href="/" class="nav-link">🏠 Inicio</a></li>
            <li><a href="/acerca" class="nav-link">ℹ️ Acerca</a></li>
            <li><a href="/contacto" class="nav-link">📬 Contacto</a></li>
            <li><a href="/encuesta" class="nav-link">❓ Encuesta</a></li>
          </ul>
        </nav>

        <h1>✅ ¡Mensaje Enviado Exitosamente!</h1>
        
        <div class="content" style="background-color: #c6f6d5; border-left-color: #48bb78;">
          <h2>Datos Recibidos por el Servidor</h2>
          <p>A continuación se muestra la información que procesó Express desde tu formulario:</p>
        </div>

        <div class="form-container">
          <div style="background-color: #f0f7ff; padding: 2rem; border-radius: 10px; border-left: 4px solid #4299e1;">
            <div style="margin-bottom: 1.5rem; padding-bottom: 1.5rem; border-bottom: 2px solid #cbd5e0;">
              <strong style="color: #2d3748;">👤 Nombre:</strong><br>
              <code style="background-color: #e2e8f0; padding: 8px 12px; border-radius: 5px; display: inline-block; margin-top: 0.5rem;">
                ${nombre}
              </code>
            </div>

            <div style="margin-bottom: 1.5rem; padding-bottom: 1.5rem; border-bottom: 2px solid #cbd5e0;">
              <strong style="color: #2d3748;">📧 Email:</strong><br>
              <code style="background-color: #e2e8f0; padding: 8px 12px; border-radius: 5px; display: inline-block; margin-top: 0.5rem;">
                ${email}
              </code>
            </div>

            <div style="margin-bottom: 1rem;">
              <strong style="color: #2d3748;">💬 Mensaje:</strong><br>
              <code style="background-color: #e2e8f0; padding: 1rem; border-radius: 5px; display: block; margin-top: 0.5rem; white-space: pre-wrap; word-break: break-word;">
                ${mensaje}
              </code>
            </div>
          </div>

          <div class="info-box" style="margin-top: 2rem; background-color: #fffacd; border-left-color: #f59e0b;">
            <h3>📍 Información Técnica</h3>
            <p>
              <strong>Método de envío:</strong> HTTP POST<br>
              <strong>Ruta:</strong> /contacto<br>
              <strong>Procesado por:</strong> req.body (Express middleware)<br>
              <strong>Validación:</strong> ✅ Completada en el servidor<br>
              <strong>Timestamp:</strong> ${new Date().toLocaleString()}
            </p>
          </div>
        </div>

        <div class="navigation-buttons">
          <a href="/contacto" class="btn btn-primary">✏️ Enviar Otro Mensaje</a>
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