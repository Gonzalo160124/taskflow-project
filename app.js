// ── Elementos del DOM ──
const taskInput      = document.getElementById('task-input');
const categorySelect = document.getElementById('task-category');
const prioritySelect = document.getElementById('task-priority');
const addBtn         = document.getElementById('add-btn');
const searchInput    = document.getElementById('search-input');
const activeList     = document.getElementById('active-list');
const doneList       = document.getElementById('done-list');
const countTotal     = document.getElementById('count-total');
const countActive    = document.getElementById('count-active');
const countDone      = document.getElementById('count-done');

// ── Cargar tareas desde LocalStorage ──
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

/**
 * Guarda el array de tareas en LocalStorage.
 * @returns {boolean} true si se guardó correctamente, false si ocurrió un error
 */
function saveToLocalStorage() {
  try {
    const serialized = JSON.stringify(tasks);
    localStorage.setItem('tasks', serialized);
    return true;
  } catch (error) {
    if (error.name === 'QuotaExceededError') {
      console.error('LocalStorage lleno: no se puede guardar más datos.');
    } else {
      console.error('Error al guardar tareas:', error.message);
    }
    return false;
  }
}

/**
 * Actualiza los contadores de tareas en el DOM (total, activas y completadas).
 * @returns {void}
 */
function updateCounters() {
  const totalCount    = tasks.length;
  const completedCount = tasks.filter(task => task.done).length;
  const activeCount   = tasks.filter(task => !task.done).length;

  countTotal.textContent  = totalCount;
  countActive.textContent = activeCount;
  countDone.textContent   = completedCount;
}

// ── Estilos de prioridad (mapeo simplificado) ──
const PRIORITY_STYLES = {
  urgente:     { class: 'bg-sao-red/15 text-sao-red border border-sao-red/40', label: 'URGENTE' },
  normal:      { class: 'bg-sao-yellow/10 text-sao-yellow border border-sao-yellow/30', label: 'NORMAL' },
  secundaria:  { class: 'bg-sao-accent/10 text-sao-accent border border-sao-accent/25', label: 'SECUNDARIA' }
};

const BASE_CARD_CLASS = 'relative flex items-center gap-4 bg-sao-surface/70 rounded px-6 py-4 cursor-pointer transition-all duration-300';
const CARD_CLASS_DONE = 'border border-transparent opacity-40';
const CARD_CLASS_ACTIVE = 'border border-sao-border hover:border-sao-accent hover:bg-sao-accent/5 hover:translate-x-1 hover:shadow-[0_0_20px_rgba(0,207,255,0.15)]';

/**
 * Crea un elemento DOM con el HTML de una tarjeta de tarea.
 * @param {Object} task - Objeto de la tarea
 * @param {number} task.id - Identificador único
 * @param {string} task.text - Texto de la misión
 * @param {string} task.category - Categoría de la tarea
 * @param {string} task.priority - Prioridad (urgente, normal, secundaria)
 * @param {boolean} task.done - Si está completada
 * @returns {HTMLDivElement} Elemento div con la tarjeta renderizada y sus event listeners
 */
function createCard(task) {
  const card = document.createElement('div');
  card.dataset.id = task.id;

  const { class: badgeClass, label: badgeText } = PRIORITY_STYLES[task.priority] ?? PRIORITY_STYLES.secundaria;
  const checkClass = task.done ? 'bg-sao-accent border-sao-accent' : 'border-sao-border';
  const titleClass = task.done ? 'line-through text-sao-muted' : '';
  const cardClass = `${BASE_CARD_CLASS} ${task.done ? CARD_CLASS_DONE : CARD_CLASS_ACTIVE}`;

  card.className = cardClass;
  card.innerHTML = `
    <div class="task-check w-5 h-5 border-2 ${checkClass} flex-shrink-0 flex items-center justify-center text-[10px] text-sao-bg transition-all duration-300">
      <span class="${task.done ? '' : 'hidden'}">✓</span>
    </div>
    <div class="flex-1 flex items-center gap-4 flex-wrap">
      <span class="task-title font-semibold text-[0.95rem] tracking-wide ${titleClass}">${task.text}</span>
      <span class="font-display text-[0.6rem] text-sao-muted px-2 py-0.5 border border-sao-border bg-white/5 tracking-wide">${task.category}</span>
      <span class="font-display text-[0.6rem] font-bold tracking-widest px-2 py-0.5 uppercase ${badgeClass}">${badgeText}</span>
    </div>
    <button class="delete-btn font-display text-[0.55rem] tracking-wide px-2 py-1 bg-transparent border border-sao-red/20 text-sao-red rounded cursor-pointer transition-all duration-300 hover:bg-sao-red/15 hover:border-sao-red focus:outline-none focus:ring-2 focus:ring-sao-red/30">
      ✕ BORRAR
    </button>
  `;

  card.querySelector('.task-check').addEventListener('click', () => {
    task.done = !task.done;
    saveToLocalStorage();
    renderTasks();
  });

  card.querySelector('.delete-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    tasks = tasks.filter(t => t.id !== task.id);
    saveToLocalStorage();
    renderTasks();
  });

  return card;
}

/**
 * Renderiza la lista de tareas filtrando por término de búsqueda.
 * Separa las tareas en listas activas y completadas, y actualiza los contadores.
 * @param {string} [searchTerm=''] - Término para filtrar las tareas por texto
 * @returns {void}
 */
function renderTasks(searchTerm = '') {
  activeList.innerHTML = '';
  doneList.innerHTML   = '';

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredTasks = tasks.filter(task =>
    task.text.toLowerCase().includes(normalizedSearch)
  );

  filteredTasks.forEach(task => {
    const card = createCard(task);
    if (task.done) {
      doneList.appendChild(card);
    } else {
      activeList.appendChild(card);
    }
  });

  updateCounters();
}

/**
 * Valida el texto introducido para una nueva misión.
 * Comprueba que no esté vacío, tenga al menos 3 caracteres y no sea duplicada.
 * @param {string} text - Texto introducido por el usuario
 * @returns {{ valid: boolean, error?: string, text?: string }} Objeto con valid (boolean),
 *   error (mensaje si no es válida) o text (texto limpio si es válida)
 */
function validateTaskInput(text) {
  const trimmed = text.trim();
  if (!trimmed) return { valid: false, error: 'El nombre de la misión no puede estar vacío.' };
  if (trimmed.length < 3) return { valid: false, error: 'La misión debe tener al menos 3 caracteres.' };
  const isDuplicate = tasks.some(t => t.text.trim().toLowerCase() === trimmed.toLowerCase());
  if (isDuplicate) return { valid: false, error: 'Ya existe una misión con ese nombre.' };
  return { valid: true, text: trimmed };
}

/**
 * Añade una nueva tarea a la lista tras validar el formulario.
 * Lee los valores del input, categoría y prioridad. Si la validación falla,
 * muestra un alert y no añade la tarea.
 * @returns {void}
 */
function addTask() {
  const validation = validateTaskInput(taskInput.value);
  if (!validation.valid) {
    alert(validation.error);
    return;
  }

  const newTask = {
    id:       Date.now(),
    text:     validation.text,
    category: categorySelect.value,
    priority: prioritySelect.value,
    done:     false
  };

  tasks.push(newTask);
  saveToLocalStorage();
  renderTasks();
  taskInput.value = '';
}

// ── Eventos ──
addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTask();
});

searchInput.addEventListener('input', () => {
  renderTasks(searchInput.value);
});

// ── Inicio ──
renderTasks();