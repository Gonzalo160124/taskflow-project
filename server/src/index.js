const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const { PORT } = require('./config/env');
const taskRoutes = require('./routes/task.routes');

const app = express();

// ── Middlewares globales ──
app.use(cors({
  origin: 'https://taskflow-project-beige.vercel.app'
}));
app.use(express.json());

// ── Documentación Swagger ──
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ── Rutas ──
app.use('/api/v1/tasks', taskRoutes);

// ── Ruta de prueba ──
app.get('/', (req, res) => {
  res.json({ message: 'TaskFlow API funcionando correctamente' });
});

// ── Middleware global de manejo de errores ──
app.use((err, req, res, next) => {
  if (err.message === 'NOT_FOUND') {
    return res.status(404).json({ error: 'Recurso no encontrado.' });
  }
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor.' });
});

// ── Arrancar servidor ──
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
  console.log(`Documentación Swagger en http://localhost:${PORT}/api/docs`);
});