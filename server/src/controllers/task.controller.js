const taskService = require('../services/task.service');

/**
 * Obtiene todas las tareas.
 */
function getTasks(req, res) {
  const tasks = taskService.obtenerTodas();
  res.status(200).json(tasks);
}

/**
 * Crea una nueva tarea con validación defensiva.
 */
function createTask(req, res) {
  const { texto, categoria, prioridad } = req.body;

  if (!texto || typeof texto !== 'string' || texto.trim().length < 3) {
    return res.status(400).json({ error: 'El texto es obligatorio y debe tener al menos 3 caracteres.' });
  }

  const categoriasValidas = ['⚔️ BOSS FIGHT', '💎 RECOLECCIÓN', '🔬 INVESTIGACIÓN', '🧭 AVENTURA'];
  if (!categoria || !categoriasValidas.includes(categoria)) {
    return res.status(400).json({ error: 'La categoría no es válida.' });
  }

  const prioridadesValidas = ['urgente', 'normal', 'secundaria'];
  if (!prioridad || !prioridadesValidas.includes(prioridad)) {
    return res.status(400).json({ error: 'La prioridad no es válida.' });
  }

  const nuevaTarea = taskService.crearTarea({ texto: texto.trim(), categoria, prioridad });
  res.status(201).json(nuevaTarea);
}

/**
 * Elimina una tarea por su ID.
 */
function deleteTask(req, res) {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: 'El ID debe ser un número válido.' });
  }

  try {
    taskService.eliminarTarea(id);
    res.status(204).send();
  } catch (error) {
    if (error.message === 'NOT_FOUND') {
      return res.status(404).json({ error: 'Tarea no encontrada.' });
    }
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
}

module.exports = { getTasks, createTask, deleteTask };