const express = require('express');
const path = require('path');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static('public'));

// Ruta raíz - Página de Inicio
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta /acerca - Página de Información
app.get('/acerca', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'acerca.html'));
});

// Ruta /contacto - Página de Contacto
app.get('/contacto', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contacto.html'));
});

// Ruta /agencia - Página de Agencia Web Moderna
app.get('/agencia', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'agencia.html'));
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