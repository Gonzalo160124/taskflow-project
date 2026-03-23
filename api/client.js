const API_URL = 'https://taskflow-project-3fn1.vercel.app/api/v1/tasks';

/**
 * Obtiene todas las tareas del servidor.
 * @returns {Promise<Array>} Array de tareas
 */
async function getTasks() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Error al obtener las tareas.');
  return response.json();
}

/**
 * Crea una nueva tarea en el servidor.
 * @param {Object} task - Datos de la tarea
 * @returns {Promise<Object>} Tarea creada
 */
async function createTask(task) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task)
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }
  return response.json();
}

/**
 * Elimina una tarea del servidor por su ID.
 * @param {number} id - ID de la tarea
 * @returns {Promise<void>}
 */
async function deleteTask(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Error al eliminar la tarea.');
}