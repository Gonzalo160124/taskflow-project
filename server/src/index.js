const express = require('express');
const cors = require('cors');
const { PORT } = require('./config/env');
const taskRoutes = require('./routes/task.routes');

const app = express();

// ── Middlewares globales ──
app.use(cors());
app.use(express.json());

// ── Rutas ──
app.use('/api/v1/tasks', taskRoutes);

// ── Ruta de prueba ──
app.get('/', (req, res) => {
  res.json({ message: 'TaskFlow API funcionando correctamente' });
});

// ── Arrancar servidor ──
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});