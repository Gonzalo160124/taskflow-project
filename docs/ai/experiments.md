# Experimentos con IA

## ¿Qué voy a documentar aquí?
En este documento registraré los experimentos que he realizado con las distintas herramientas de IA durante el desarrollo de TaskFlow. Incluiré qué probé, qué resultado obtuve y qué conclusiones saqué de cada experimento.

----------------------------------------------------------------------------

1- Configuración del servidor MCP en Cursor

# ¿Qué es MCP?
Model Context Protocol es un protocolo creado por Anthropic que permite a los modelos de IA conectarse con herramientas externas como el sistema de archivos, GitHub, bases de datos, etc. Es como darle acceso directo a la IA para que pueda leer archivos e interactuar con el proyecto.

# Instalación
a. Abrir Cursor y ir a **Settings**
b. Buscar la sección **MCP** y hacer clic en **Add custom MCP**
c. Introducir la siguiente configuración:
```jsonc
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "C:\\Users\\Usuario\\Desktop\\taskflow-project"
      ]
    }
  }
}
```

d. Guardar y verificar que el servidor aparece como conectado.

---------------------------------------------------------------------------

2- Consultas realizadas con MCP

# Consulta 1 — Estructura de archivos
**Prompt:** ¿Qué archivos hay en mi proyecto?

**Resultado:** El servidor listó correctamente todos los archivos del proyecto incluyendo `app.js`, `index.html`, `tailwind.config.js` y la carpeta `docs/ai/` con todos sus documentos.

---

# Consulta 2 — Explicación del código
**Prompt:** Lee el archivo app.js y explícame qué hace cada función

**Resultado:** La IA leyó el archivo y explicó detalladamente cada función, incluyendo `saveToLocalStorage`, `updateCounters`, `createCard`, `renderTasks`, `validateTaskInput` y `addTask`, describiendo sus parámetros y comportamiento.

---

# Consulta 3 — Conteo de líneas
**Prompt:** ¿Cuántas líneas de código tiene el index.html?

**Resultado:** La IA respondió que el archivo `index.html` tiene 193 líneas.

---

# Consulta 4 — Dependencias del proyecto
**Prompt:** ¿Qué dependencias tiene el proyecto según el package.json?

**Resultado:** La IA identificó que el proyecto solo tiene una dependencia de desarrollo: `tailwindcss ^4.2.1`, sin dependencias de producción.

---

# Consulta 5 — Búsqueda en el código
**Prompt:** Busca en el código todas las funciones que usan LocalStorage

**Resultado:** La IA encontró dos usos de LocalStorage en `app.js`: la inicialización en la línea 14 con `getItem` y la función `saveToLocalStorage` con `setItem`.

---

3- Casos de uso de MCP en proyectos reales

- **Revisión de código:** Permite a la IA leer archivos del proyecto y detectar errores o mejoras sin tener que copiar y pegar el código manualmente.
- **Documentación automática:** La IA puede leer el código y generar documentación actualizada del proyecto.
- **Búsqueda inteligente:** Permite buscar patrones o usos específicos en todo el código del proyecto.
- **Análisis de dependencias:** Facilita revisar el estado de las dependencias y detectar posibles problemas.
- **Onboarding de nuevos desarrolladores:** Un nuevo desarrollador puede preguntar a la IA sobre la estructura del proyecto y obtener explicaciones detalladas al instante.


--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


Experimentos de programación con y sin IA

# Problemas generales

Problema 1 — Invertir una cadena de texto
**Sin IA:** Resuelto en aproximadamente 2 minutos
**Con IA:** Resuelto en segundos

**Solución con IA:**
```javascript
function invertirCadena(texto) {
  return texto.split('').reverse().join('');
}
```

Problema 2 — Encontrar el número mayor de un array
**Sin IA:** Resuelto en aproximadamente 2 minutos
**Con IA:** Resuelto en segundos

**Solución con IA:**
```javascript
function encontrarMayor(numeros) {
  return Math.max(...numeros);
}
```

Problema 3 — Contar las vocales de una frase
**Sin IA:** Resuelto en aproximadamente 2 minutos
**Con IA:** Resuelto en segundos

**Solución con IA:**
```javascript
function contarVocales(frase) {
  return (frase.toLowerCase().match(/[aeiouáéíóú]/g) || []).length;
}
```

**Conclusión problemas generales:** Sin IA los 3 problemas llevaron unos 6 minutos en total. Con IA se resolvieron en segundos con soluciones limpias y bien estructuradas.

-------------------------------------------------------------------------------------------------------------------------------------------------------

# Problemas relacionados con TaskFlow

Problema 4 — Contar tareas por categoría
**Sin IA:** Más tiempo que los problemas generales
**Con IA:** Resuelto en segundos

**Solución con IA:**
```javascript
function contarPorCategoria() {
  return tasks.reduce((acc, task) => {
    acc[task.category] = (acc[task.category] || 0) + 1;
    return acc;
  }, {});
}
```

Problema 5 — Ordenar tareas alfabéticamente
**Sin IA:** Más tiempo que los problemas generales
**Con IA:** Resuelto en segundos

**Solución con IA:**
```javascript
function ordenarAlfabeticamente() {
  return [...tasks].sort((a, b) => a.text.localeCompare(b.text));
}
```

Problema 6 — Mostrar solo tareas urgentes
**Sin IA:** Más tiempo que los problemas generales
**Con IA:** Resuelto en segundos

**Solución con IA:**
```javascript
function filtrarUrgentes() {
  return tasks.filter(task => task.priority === 'urgente');
}
```

**Conclusión problemas TaskFlow:** Los problemas relacionados con el proyecto fueron más difíciles sin IA porque requieren escribir lógica personalizada específica para la app que yo mismo estoy diseñando, algo que no se puede encontrar fácilmente buscandolo por Google o con libros sobre aprendizaje de código. Con IA el tiempo fue igualmente mínimo, debido a que tenemos la opción de pasar el código a la IA para que lo lea y analice antes de solucionar el problema. 

------------------------------------------------------------------------------------------------------------------------------------------------------

# Conclusión general de experimentos

| | Sin IA | Con IA |
|---|---|---|
| Problemas generales | ~6 minutos | Segundos |
| Problemas TaskFlow | Más de 6 minutos | Segundos |
| Calidad del código | Correcta | Correcta y más concisa |
| Comprensión del problema | Alta | Alta |

La IA reduce drásticamente el tiempo de resolución manteniendo o mejorando la calidad del código. Los problemas generales son más fáciles de resolver sin IA porque hay mucha documentación y ejemplos en internet. Sin embargo los problemas específicos del proyecto, que requieren lógica personalizada, son donde la IA marca una diferencia mayor ya que no existe una solución predefinida que buscar a no ser que la IA pueda analizar tu código.