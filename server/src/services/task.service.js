// ── Persistencia simulada en memoria ──
let tasks = [];

/**
 * Devuelve todas las tareas almacenadas.
 * @returns {Array} Array de tareas
 */
function obtenerTodas() {
  return tasks;
}

/**
 * Crea una nueva tarea y la añade al array.
 * @param {Object} data - Datos de la tarea
 * @returns {Object} La tarea creada
 */
function crearTarea(data) {
  const nuevaTarea = {
    id: Date.now(),
    texto: data.texto,
    categoria: data.categoria,
    prioridad: data.prioridad,
    done: false
  };
  tasks.push(nuevaTarea);
  return nuevaTarea;
}

/**
 * Elimina una tarea por su ID.
 * @param {number} id - ID de la tarea
 * @throws {Error} Si la tarea no existe
 */
function eliminarTarea(id) {
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) throw new Error('NOT_FOUND');
  tasks.splice(index, 1);
}

module.exports = { obtenerTodas, crearTarea, eliminarTarea };