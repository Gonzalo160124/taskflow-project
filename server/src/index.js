const express = require('express');
const cors = require('cors');
const { PORT } = require('./config/env');

const app = express();

// ── Middlewares globales ──
app.use(cors());
app.use(express.json());

// ── Ruta de prueba ──
app.get('/', (req, res) => {
  res.json({ message: 'TaskFlow API funcionando correctamente' });
});

// ── Arrancar servidor ──
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});