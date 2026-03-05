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

function saveToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateCounters() {
  const done   = tasks.filter(t => t.done).length;
  const active = tasks.filter(t => !t.done).length;
  countTotal.textContent  = tasks.length;
  countActive.textContent = active;
  countDone.textContent   = done;
}

// ── Crear tarjeta HTML ──
function createCard(task) {
  const card = document.createElement('div');
  card.dataset.id = task.id;

  const badgeClass = task.priority === 'urgente'
    ? 'bg-sao-red/15 text-sao-red border border-sao-red/40'
    : task.priority === 'normal'
    ? 'bg-sao-yellow/10 text-sao-yellow border border-sao-yellow/30'
    : 'bg-sao-accent/10 text-sao-accent border border-sao-accent/25';

  const badgeText = task.priority === 'urgente' ? 'URGENTE'
    : task.priority === 'normal' ? 'NORMAL' : 'SECUNDARIA';

  card.className = task.done
    ? 'relative flex items-center gap-4 bg-sao-surface/70 border border-transparent rounded px-6 py-4 cursor-pointer opacity-40 transition-all duration-300'
    : 'relative flex items-center gap-4 bg-sao-surface/70 border border-sao-border rounded px-6 py-4 cursor-pointer transition-all duration-300 hover:border-sao-accent hover:bg-sao-accent/5 hover:translate-x-1 hover:shadow-[0_0_20px_rgba(0,207,255,0.15)]';

  card.innerHTML = `
    <div class="task-check w-5 h-5 border-2 ${task.done ? 'bg-sao-accent border-sao-accent' : 'border-sao-border'} flex-shrink-0 flex items-center justify-center text-[10px] text-sao-bg transition-all duration-300">
      <span class="${task.done ? '' : 'hidden'}">✓</span>
    </div>
    <div class="flex-1 flex items-center gap-4 flex-wrap">
      <span class="task-title font-semibold text-[0.95rem] tracking-wide ${task.done ? 'line-through text-sao-muted' : ''}">${task.text}</span>
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

// ── Renderizar todas las tareas ──
function renderTasks(filter = '') {
  activeList.innerHTML = '';
  doneList.innerHTML   = '';

  const filtered = tasks.filter(t =>
    t.text.toLowerCase().includes(filter.toLowerCase())
  );

  filtered.forEach(task => {
    const card = createCard(task);
    if (task.done) {
      doneList.appendChild(card);
    } else {
      activeList.appendChild(card);
    }
  });

  updateCounters();
}

// ── Añadir nueva tarea ──
function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  const newTask = {
    id:       Date.now(),
    text:     text,
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