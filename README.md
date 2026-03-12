# ⚔️ TaskFlow Online — SAO Edition

> *"No matter how much HP you have, if you lose your will to fight, that's when it's really over."*  
> — Kirito, Sword Art Online

Aplicación web de gestión de tareas con temática de **Sword Art Online**. Organiza tus misiones, sube de nivel y mejora tus stats completando tareas.

🌐 **Demo en vivo:** [taskflow-project-beige.vercel.app](https://taskflow-project-beige.vercel.app)

---

## 🎮 Funcionalidades

- **Añadir misiones** — Crea tareas con nombre, categoría y prioridad
- **Completar misiones** — Marca tareas como completadas y sube de nivel
- **Editar misiones** — Modifica el texto de cualquier tarea existente
- **Eliminar misiones** — Borra tareas que ya no necesitas
- **Filtrar por categoría** — Filtra las misiones por tipo desde el sidebar
- **Ordenar por prioridad** — Ordena las tareas de urgente a secundaria
- **Búsqueda en tiempo real** — Encuentra misiones mientras escribes
- **Sistema de niveles** — Cada tarea completada sube tu nivel y mejora tus stats
- **Modo oscuro/claro** — Cambia la apariencia de la app
- **Persistencia de datos** — Las tareas se guardan en el navegador

---

## 🗂️ Categorías de misiones

| Categoría | Descripción |
|---|---|
| ⚔️ BOSS FIGHT | Tareas importantes y desafiantes |
| 💎 RECOLECCIÓN | Tareas de recopilación de información o recursos |
| 🔬 INVESTIGACIÓN | Tareas de estudio o análisis |
| 🧭 AVENTURA | Tareas de exploración o nuevas experiencias |

---

## 🚀 Cómo usar el proyecto

### 1. Clonar el repositorio
```bash
git clone https://github.com/Gonzalo160124/taskflow-project.git
cd taskflow-project
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Compilar Tailwind CSS
```bash
npx tailwindcss@3 -i ./input.css -o ./output.css --watch
```

### 4. Abrir en el navegador
Abre el archivo `index.html` directamente en Chrome o Firefox.

---

## 📖 Ejemplos de uso

### Añadir una misión
1. Escribe el nombre de la misión en el campo de texto
2. Selecciona la categoría (⚔️ BOSS FIGHT, 💎 RECOLECCIÓN, etc.)
3. Selecciona la prioridad (URGENTE, NORMAL, SECUNDARIA)
4. Pulsa **+ AÑADIR** o presiona **Enter**

### Filtrar por categoría
1. Haz clic en una categoría del sidebar izquierdo
2. Solo se mostrarán las misiones de esa categoría
3. Haz clic de nuevo para quitar el filtro

### Subir de nivel
1. Completa una misión haciendo clic en el círculo de la izquierda
2. Tu nivel sube automáticamente en el header
3. Tus stats de HP, MP y XP aumentan en el sidebar

### Editar una misión
1. Haz clic en el botón **✎ EDITAR** de cualquier misión
2. Modifica el texto en el popup
3. Pulsa **Aceptar** para guardar los cambios

---

## 🗂️ Estructura del proyecto
```
taskflow-project/
├── index.html          # Estructura y diseño de la app
├── app.js              # Lógica de la aplicación
├── input.css           # Estilos base de Tailwind
├── output.css          # CSS compilado
├── tailwind.config.js  # Configuración de Tailwind
├── package.json        # Dependencias del proyecto
└── docs/
    └── ai/
        ├── ai-comparison.md       # Comparativa ChatGPT vs Claude
        ├── cursor-workflow.md     # Flujo de trabajo con Cursor
        ├── prompt-engineering.md  # 10 prompts documentados
        ├── experiments.md         # Experimentos con y sin IA
        └── reflection.md          # Reflexión final
```

---

## 🛠️ Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| HTML5 | Estructura de la app |
| CSS3 + Tailwind CSS 3 | Estilos y diseño |
| JavaScript ES6+ | Lógica de la aplicación |
| LocalStorage | Persistencia de datos |
| Google Fonts | Tipografías Orbitron y Rajdhani |
| Vercel | Despliegue en producción |

---

## 👨‍💻 Autor

**Gonzalo** — Estudiante de DAM  
Proyecto desarrollado con ayuda de IA como parte del aprendizaje de herramientas modernas de desarrollo.