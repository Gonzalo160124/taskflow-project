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