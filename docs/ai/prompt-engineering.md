# Prompt Engineering

## ¿Qué voy a documentar aquí?
En este documento recogeré las técnicas de prompt engineering que he aprendido y aplicado. Incluiré ejemplos de prompts que han funcionado bien, cuáles no han dado buenos resultados y qué he aprendido del proceso.

--------------------------------------------------------------------------------------------------------------------

Técnicas utilizadas

1. Prompts con rol
Definir un rol para la IA mejora la calidad y el enfoque de la respuesta, ya que la IA adapta su nivel de detalle y vocabulario al perfil indicado.

2. Few-shot prompting
Proporcionar ejemplos previos guía a la IA hacia el formato y estilo esperado, reduciendo respuestas genéricas.

3. Razonamiento paso a paso
Pedir a la IA que razone antes de responder mejora la precisión en explicaciones técnicas y resolución de problemas.

4. Prompts con restricciones
Añadir restricciones claras (líneas máximas, sin librerías, en español) obliga a la IA a ser concisa y práctica.

--------------------------------------------------------------------------------------------------------------------

## Los 10 prompts

Prompt 1 — Rol: desarrollador senior
**Técnica:** Prompt con rol
**Prompt:** `Actúa como un desarrollador senior de JavaScript. Revisa la función createCard() de mi proyecto y dime cómo mejorarla.`
**Resultado:** La IA detectó tres mejoras:

1. Separar la lógica de los event listeners:
```javascript
function createCard(task) {
  const card = document.createElement('div');
  card.dataset.id = task.id;
  card.className = buildCardClass(task);
  card.innerHTML = buildCardHTML(task);
  attachCardEvents(card, task);
  return card;
}
```

2. Evitar innerHTML con datos del usuario por riesgo XSS:
```javascript
card.querySelector('.task-title').textContent = task.text;
```

3. Convertir el id a string:
```javascript
card.dataset.id = String(task.id);
```

**Por qué funciona:** Definir el rol de desarrollador senior hace que la IA priorice buenas prácticas y seguridad en lugar de dar una respuesta superficial.

--------------------------------------------------------------------------------------------------------------------

Prompt 2 — Rol: experto en seguridad
**Técnica:** Prompt con rol
**Prompt:** `Actúa como un experto en seguridad web. ¿Qué vulnerabilidades podría tener mi app TaskFlow?`
**Resultado:** La IA detectó 4 vulnerabilidades:

1. XSS por uso de innerHTML:
```javascript
// ❌ Vulnerable
card.innerHTML = `<span>${task.text}</span>`;

// ✅ Seguro
const span = document.createElement('span');
span.textContent = task.text;
card.appendChild(span);
```

2. Datos no sanitizados en LocalStorage
3. Sin límite de tareas
4. Sin protección contra spam

**Por qué funciona:** El rol de experto en seguridad orienta a la IA a buscar problemas específicos que normalmente no mencionaría.

--------------------------------------------------------------------------------------------------------------------

Prompt 3 — Few-shot: mensajes de commit
**Técnica:** Few-shot prompting
**Prompt:** `Aquí tienes dos ejemplos de mensajes de commit bien escritos: "añadir validación de formulario" y "refactorizar función renderTasks para mejorar rendimiento". Ahora genera 5 mensajes de commit para estos cambios.`
**Resultado:**
```
1. añadir comentarios JSDoc a todas las funciones del proyecto
2. mejorar manejo de errores en saveToLocalStorage con try/catch
3. añadir validación de duplicados en validateTaskInput
4. extraer constantes de estilos de prioridad a PRIORITY_STYLES
5. separar lógica de createCard en funciones auxiliares
```
**Por qué funciona:** Los ejemplos previos establecen un patrón claro que la IA replica con precisión.

--------------------------------------------------------------------------------------------------------------------

Prompt 4 — Few-shot: comentarios JSDoc
**Técnica:** Few-shot prompting
**Prompt:** `Aquí tienes un ejemplo de comentario JSDoc bien escrito: [...]. Ahora genera comentarios JSDoc para estas tres funciones siguiendo el mismo estilo.`
**Resultado:**
```javascript
/**
 * Actualiza los contadores de tareas en el DOM.
 * @returns {void}
 */
function updateCounters() { ... }

/**
 * Renderiza la lista de tareas filtrando por término de búsqueda.
 * @param {string} [searchTerm=''] - Término para filtrar las tareas por texto
 * @returns {void}
 */
function renderTasks(searchTerm) { ... }

/**
 * Valida el texto introducido para una nueva misión.
 * @param {string} text - Texto introducido por el usuario
 * @returns {{ valid: boolean, error?: string, text?: string }} Resultado de la validación
 */
function validateTaskInput(text) { ... }
```
**Por qué funciona:** Mostrar un ejemplo del resultado esperado elimina la ambigüedad y asegura consistencia en el estilo.

--------------------------------------------------------------------------------------------------------------------

Prompt 5 — Paso a paso: LocalStorage
**Técnica:** Razonamiento paso a paso
**Prompt:** `Explícame paso a paso cómo funciona el LocalStorage en el navegador y por qué lo usamos en TaskFlow.`
**Resultado:**
- **Paso 1:** Los datos se guardan en el navegador con un límite de 5MB
- **Paso 2:** Se usa `JSON.stringify()` para convertir el array a texto
```javascript
localStorage.setItem('tasks', JSON.stringify(tasks));
```
- **Paso 3:** Se usa `JSON.parse()` para recuperar los datos
```javascript
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
```
- **Paso 4:** El `|| []` evita errores si no hay datos guardados
- **Paso 5:** Sin LocalStorage las tareas se perderían al refrescar la página

**Por qué funciona:** Pedir una explicación paso a paso obliga a la IA a estructurar la información de forma ordenada.

--------------------------------------------------------------------------------------------------------------------

Prompt 6 — Paso a paso: flujo de añadir tarea
**Técnica:** Razonamiento paso a paso
**Prompt:** `Razona paso a paso qué ocurre en el código cuando el usuario añade una nueva misión en TaskFlow.`
**Resultado:**
- **Paso 1:** El usuario escribe en el input
- **Paso 2:** Se dispara el evento click o Enter
```javascript
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTask();
});
```
- **Paso 3:** `validateTaskInput()` comprueba vacío, longitud y duplicados
- **Paso 4:** Se crea el objeto de la tarea
```javascript
const newTask = {
  id: Date.now(),
  text: validation.text,
  category: categorySelect.value,
  priority: prioritySelect.value,
  done: false
};
```
- **Paso 5:** Se guarda en LocalStorage
- **Paso 6:** Se renderiza la lista y se actualizan los contadores
- **Paso 7:** Se limpia el input

**Por qué funciona:** Razonar paso a paso permite seguir el hilo de ejecución del código de forma clara.

--------------------------------------------------------------------------------------------------------------------

Prompt 7 — Restricciones: ordenar por prioridad

**Técnica:** Prompt con restricciones
**Prompt:** `Genera una función JavaScript que ordene las tareas por prioridad. Restricciones: máximo 5 líneas, sin librerías externas, compatible con el código actual de TaskFlow.`
**Resultado:**
```javascript
function sortTasksByPriority(tasks) {
  const order = { urgente: 0, normal: 1, secundaria: 2 };
  return [...tasks].sort((a, b) => order[a.priority] - order[b.priority]);
}
```
**Por qué funciona:** Las restricciones claras evitan soluciones sobredimensionadas y fuerzan código limpio y eficiente.

--------------------------------------------------------------------------------------------------------------------

Prompt 8 — Restricciones: exportar a CSV

**Técnica:** Prompt con restricciones
**Prompt:** `Escribe una función que exporte las tareas a formato CSV. Restricciones: solo JavaScript puro, sin dependencias, menos de 10 líneas.`
**Resultado:**
```javascript
function exportToCSV() {
  const headers = 'id,texto,categoria,prioridad,completada';
  const rows = tasks.map(t =>
    `${t.id},"${t.text}","${t.category}",${t.priority},${t.done}`
  );
  const csv = [headers, ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'taskflow-misiones.csv';
  a.click();
}
```
**Por qué funciona:** Restringir el uso de librerías obliga a usar las APIs nativas del navegador, resultando en código más ligero.

--------------------------------------------------------------------------------------------------------------------

Prompt 9 — Restricciones: mejorar botón con Tailwind

**Técnica:** Prompt con restricciones
**Prompt:** `Mejora el diseño del botón AÑADIR usando solo clases de Tailwind. Restricciones: mantener la estética SAO, no modificar el HTML.`
**Resultado:**
```html
<button id="add-btn"
  class="font-display text-[0.65rem] font-bold tracking-widest uppercase
         px-6 py-2.5
         bg-sao-accent/10 text-sao-accent border border-sao-accent rounded
         cursor-pointer
         transition-all duration-300
         hover:bg-sao-accent/30 hover:shadow-[0_0_30px_rgba(0,207,255,0.6)] hover:scale-105
         focus:outline-none focus:ring-2 focus:ring-sao-accent focus:ring-offset-2 focus:ring-offset-sao-bg
         active:scale-95">
  + AÑADIR
</button>
```
**Por qué funciona:** Restringir el ámbito de la solución centra la respuesta en lo que realmente se necesita.

--------------------------------------------------------------------------------------------------------------------

Prompt 10 — Restricciones: resumen para README
**Técnica:** Prompt con restricciones
**Prompt:** `Genera un resumen del proyecto TaskFlow para el README. Restricciones: máximo 5 líneas, en español, sin tecnicismos.`
**Resultado:**
```
TaskFlow Online es una aplicación web para gestionar tareas con temática de Sword Art Online.
Permite añadir, completar y eliminar misiones organizadas por categoría y prioridad.
Las tareas se guardan automáticamente en el navegador para no perderlas al cerrar la página.
Incluye un buscador en tiempo real y un modo oscuro/claro para personalizar la experiencia.
Diseñada con HTML, CSS y JavaScript puro, sin frameworks ni dependencias complejas.
```
**Por qué funciona:** Limitar la longitud y el vocabulario obliga a la IA a priorizar la información más relevante.

--------------------------------------------------------------------------------------------------------------------

# Conclusión

Las técnicas de prompt engineering mejoran significativamente la calidad de las respuestas de la IA. Definir un rol, proporcionar ejemplos, pedir razonamiento paso a paso y añadir restricciones claras son las estrategias más efectivas para obtener respuestas precisas, útiles y adaptadas al contexto del proyecto.