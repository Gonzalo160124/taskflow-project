// ── Elementos del DOM ──
const taskInput    = document.getElementById('task-input');
const categorySelect = document.getElementById('task-category');
const prioritySelect = document.getElementById('task-priority');
const addBtn       = document.getElementById('add-btn');
const searchInput  = document.getElementById('search-input');
const activeList   = document.querySelector('#active-list');
const doneList     = document.querySelector('#done-list');

// ── Cargar tareas desde LocalStorage ──
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// ── Crear tarjeta HTML ──
function createCard(task) {
  const card = document.createElement('div');
  card.className = 'task-card' + (task.done ? ' done' : '');
  card.dataset.id = task.id;

  const badgeClass = task.priority === 'urgente' ? 'badge-alta'
                   : task.priority === 'normal'   ? 'badge-media'
                   : 'badge-baja';

  const badgeText = task.priority === 'urgente' ? 'URGENTE'
                  : task.priority === 'normal'   ? 'NORMAL'
                  : 'SECUNDARIA';

  card.innerHTML = `
    <div class="task-check"><span class="check-icon">✓</span></div>
    <div class="task-info">
      <span class="task-title">${task.text}</span>
      <span class="task-category">${task.category}</span>
      <span class="badge ${badgeClass}">${badgeText}</span>
    </div>
    <button class="delete-btn" style="
      background: transparent; border: 1px solid #ff4e6a33;
      color: #ff4e6a; font-family: 'Orbitron', sans-serif;
      font-size: 0.55rem; letter-spacing: 1px; padding: 4px 10px;
      cursor: pointer; border-radius: 3px;
      transition: all 0.3s ease;
    ">✕ BORRAR</button>
  `;

  // Marcar como completada al pulsar el check
  card.querySelector('.task-check').addEventListener('click', () => {
    task.done = !task.done;
    saveToLocalStorage();
    renderTasks();
  });

  // Borrar tarea
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