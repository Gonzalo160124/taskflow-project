// ── API Client ──
const API_URL = 'https://taskflow-project-3fn1.vercel.app/api/v1/tasks';

async function getTasks() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Error al obtener las tareas.');
  return response.json();
}

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

async function deleteTask(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Error al eliminar la tarea.');
}

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

// ── Estado de la app ──
let tasks = [];

// ── Stats del jugador ──
let playerStats = JSON.parse(localStorage.getItem('playerStats')) || {
  level: 80,
  hp: 2400, hpMax: 3000,
  mp: 880,  mpMax: 1000,
  xp: 4500, xpMax: 9999
};

function saveStats() {
  localStorage.setItem('playerStats', JSON.stringify(playerStats));
}

function updateStatsUI() {
  document.getElementById('player-level').textContent = playerStats.level;
  document.getElementById('hp-bar').style.width = `${(playerStats.hp / playerStats.hpMax) * 100}%`;
  document.getElementById('hp-text').textContent = `${playerStats.hp}/${playerStats.hpMax}`;
  document.getElementById('mp-bar').style.width = `${(playerStats.mp / playerStats.mpMax) * 100}%`;
  document.getElementById('mp-text').textContent = `${playerStats.mp}/${playerStats.mpMax}`;
  document.getElementById('xp-bar').style.width = `${(playerStats.xp / playerStats.xpMax) * 100}%`;
  document.getElementById('xp-text').textContent = `${playerStats.xp}/${playerStats.xpMax}`;
}

function levelUp() {
  playerStats.level += 1;
  playerStats.hpMax += 100;
  playerStats.hp = Math.min(playerStats.hp + 100, playerStats.hpMax);
  playerStats.mpMax += 50;
  playerStats.mp = Math.min(playerStats.mp + 50, playerStats.mpMax);
  playerStats.xp = Math.min(playerStats.xp + 500, playerStats.xpMax);
  saveStats();
  updateStatsUI();
}

function levelDown() {
  if (playerStats.level <= 1) return;
  playerStats.level -= 1;
  playerStats.hpMax -= 100;
  playerStats.hp = Math.min(playerStats.hp, playerStats.hpMax);
  playerStats.mpMax -= 50;
  playerStats.mp = Math.min(playerStats.mp, playerStats.mpMax);
  playerStats.xp = Math.max(playerStats.xp - 500, 0);
  saveStats();
  updateStatsUI();
}

// ── UI de estados de red ──
function showLoading() {
  activeList.innerHTML = '<div class="text-sao-muted font-display text-[0.8rem] tracking-widest animate-pulse">// CARGANDO MISIONES...</div>';
  doneList.innerHTML = '';
}

function showError(message) {
  activeList.innerHTML = `<div class="text-sao-red font-display text-[0.8rem] tracking-widest">// ERROR: ${message}</div>`;
}

// ── Contadores ──
function updateCounters() {
  const totalCount     = tasks.length;
  const completedCount = tasks.filter(task => task.done).length;
  const activeCount    = tasks.filter(task => !task.done).length;
  countTotal.textContent  = totalCount;
  countActive.textContent = activeCount;
  countDone.textContent   = completedCount;
}

// ── Estilos de prioridad ──
const PRIORITY_STYLES = {
  urgente:    { class: 'bg-sao-red/15 text-sao-red border border-sao-red/40', label: 'URGENTE' },
  normal:     { class: 'bg-sao-yellow/10 text-sao-yellow border border-sao-yellow/30', label: 'NORMAL' },
  secundaria: { class: 'bg-sao-accent/10 text-sao-accent border border-sao-accent/25', label: 'SECUNDARIA' }
};

const BASE_CARD_CLASS = 'relative flex flex-wrap items-center gap-4 bg-sao-surface/70 rounded px-6 py-4 cursor-pointer transition-all duration-300';
const CARD_CLASS_DONE = 'border border-transparent opacity-40';
const CARD_CLASS_ACTIVE = 'border border-sao-border hover:border-sao-accent hover:bg-sao-accent/5 hover:translate-x-1 hover:shadow-[0_0_20px_rgba(0,207,255,0.15)]';

// ── Crear tarjeta ──
function createCard(task) {
  const card = document.createElement('div');
  card.dataset.id = String(task.id);

  const { class: badgeClass, label: badgeText } = PRIORITY_STYLES[task.prioridad] ?? PRIORITY_STYLES.secundaria;
  const checkClass  = task.done ? 'bg-sao-accent border-sao-accent' : 'border-sao-border';
  const titleClass  = task.done ? 'line-through text-sao-muted' : '';
  const cardClass   = `${BASE_CARD_CLASS} ${task.done ? CARD_CLASS_DONE : CARD_CLASS_ACTIVE}`;

  card.className = cardClass;
  card.innerHTML = `
    <div class="task-check w-5 h-5 border-2 ${checkClass} flex-shrink-0 flex items-center justify-center text-[10px] text-sao-bg transition-all duration-300">
      <span class="${task.done ? '' : 'hidden'}">✓</span>
    </div>
    <div class="flex-1 flex items-center gap-4 flex-wrap">
      <span class="task-title font-semibold text-[0.95rem] tracking-wide ${titleClass}">${task.texto}</span>
      <span class="font-display text-[0.6rem] text-sao-muted px-2 py-0.5 border border-sao-border bg-white/5 tracking-wide">${task.categoria}</span>
      <span class="font-display text-[0.6rem] font-bold tracking-widest px-2 py-0.5 uppercase ${badgeClass}">${badgeText}</span>
    </div>
    <button class="edit-btn font-display text-[0.55rem] tracking-wide px-2 py-1 bg-transparent border border-sao-accent/20 text-sao-accent rounded cursor-pointer transition-all duration-300 hover:bg-sao-accent/15 hover:border-sao-accent focus:outline-none focus:ring-2 focus:ring-sao-accent/30 mr-1">
      ✎ EDITAR
    </button>
    <button class="delete-btn font-display text-[0.55rem] tracking-wide px-2 py-1 bg-transparent border border-sao-red/20 text-sao-red rounded cursor-pointer transition-all duration-300 hover:bg-sao-red/15 hover:border-sao-red focus:outline-none focus:ring-2 focus:ring-sao-red/30">
      ✕ BORRAR
    </button>
  `;

  card.querySelector('.task-check').addEventListener('click', () => {
    const wasDone = task.done;
    task.done = !task.done;
    if (!wasDone && task.done) levelUp();
    if (wasDone && !task.done) levelDown();
    renderTasks();
  });

  card.querySelector('.edit-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    const newText = prompt('Editar misión:', task.texto);
    if (newText === null) return;
    if (newText.trim().length < 3) {
      alert('La misión debe tener al menos 3 caracteres.');
      return;
    }
    task.texto = newText.trim();
    renderTasks();
  });

  card.querySelector('.delete-btn').addEventListener('click', async (e) => {
    e.stopPropagation();
    try {
      await deleteTask(task.id);
      tasks = tasks.filter(t => t.id !== task.id);
      renderTasks();
    } catch (error) {
      alert('Error al eliminar la tarea: ' + error.message);
    }
  });

  return card;
}

// ── Renderizar tareas ──
let activeCategory = null;
let sortByPriority = false;
const PRIORITY_ORDER = { urgente: 0, normal: 1, secundaria: 2 };

function renderTasks(searchTerm = '') {
  activeList.innerHTML = '';
  doneList.innerHTML   = '';

  const normalizedSearch = searchTerm.trim().toLowerCase();
  let filteredTasks = tasks.filter(task => {
    const matchesSearch   = task.texto.toLowerCase().includes(normalizedSearch);
    const matchesCategory = activeCategory ? task.categoria === activeCategory : true;
    return matchesSearch && matchesCategory;
  });

  if (sortByPriority) {
    filteredTasks.sort((a, b) => PRIORITY_ORDER[a.prioridad] - PRIORITY_ORDER[b.prioridad]);
  }

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

// ── Validar input ──
function validateTaskInput(text) {
  const trimmed = text.trim();
  if (!trimmed) return { valid: false, error: 'El nombre de la misión no puede estar vacío.' };
  if (trimmed.length < 3) return { valid: false, error: 'La misión debe tener al menos 3 caracteres.' };
  const isDuplicate = tasks.some(t => t.texto.trim().toLowerCase() === trimmed.toLowerCase());
  if (isDuplicate) return { valid: false, error: 'Ya existe una misión con ese nombre.' };
  return { valid: true, text: trimmed };
}

// ── Añadir tarea ──
async function addTask() {
  const validation = validateTaskInput(taskInput.value);
  if (!validation.valid) {
    alert(validation.error);
    return;
  }

  try {
    const newTask = await createTask({
      texto:     validation.text,
      categoria: categorySelect.value,
      prioridad: prioritySelect.value
    });
    tasks.push(newTask);
    renderTasks();
    taskInput.value = '';
  } catch (error) {
    alert('Error al crear la tarea: ' + error.message);
  }
}

// ── Cargar tareas al inicio ──
async function loadTasks() {
  showLoading();
  try {
    tasks = await getTasks();
    renderTasks();
  } catch (error) {
    showError('No se puede conectar con el servidor.');
  }
}

// ── Filtro por categoría ──
function filterByCategory(category) {
  activeCategory = activeCategory === category ? null : category;
  updateCategoryStyles();
  renderTasks(searchInput.value);
}

// ── Ordenar por prioridad ──
function toggleSort() {
  sortByPriority = !sortByPriority;
  const btn = document.getElementById('sort-btn');
  btn.textContent = sortByPriority ? 'PRIORIDAD ↑' : 'PRIORIDAD ↕';
  btn.classList.toggle('border-sao-accent', sortByPriority);
  btn.classList.toggle('text-sao-accent', sortByPriority);
  renderTasks(searchInput.value);
}

// ── Toggle sidebar móvil ──
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('open');
}

// ── Actualizar estilos de categorías ──
function updateCategoryStyles() {
  document.querySelectorAll('.category-chip').forEach(chip => {
    if (chip.dataset.category === activeCategory) {
      chip.classList.add('border-sao-accent', 'text-sao-accent', 'bg-sao-accent/5');
      chip.classList.remove('border-sao-border', 'text-sao-muted');
    } else {
      chip.classList.remove('border-sao-accent', 'text-sao-accent', 'bg-sao-accent/5');
      chip.classList.add('border-sao-border', 'text-sao-muted');
    }
  });
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
updateStatsUI();
loadTasks();