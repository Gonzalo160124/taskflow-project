# Flujo de Trabajo con Cursor

## ¿Qué voy a documentar aquí?
En este documento documentaré mi experiencia usando Cursor como IDE asistido por IA. Explicaré cómo ha cambiado mi forma de escribir código, qué funcionalidades he usado y cómo lo he integrado en el desarrollo de TaskFlow.

---------------------------------------------------------------------------------------------

1 Instalación y primeros pasos

Cursor es un IDE basado en VS Code con inteligencia artificial integrada. Al abrirlo por primera vez la interfaz resulta muy familiar, ya que comparte el mismo explorador de archivos, terminal integrada y sistema de extensiones que VS Code.

-------------------------------------------------------------------------------------------

2 Atajos de teclado más utilizados

| Atajo | Función |
|-------|---------|
| Ctrl+L | Abrir chat contextual |
| Ctrl+K | Edición inline de código |
| Ctrl+I | Composer — cambios en varios archivos |
| Tab | Aceptar sugerencia de autocompletado |

El autocompletado ha sido la funcionalidad más utilizada, ya que sugiere código en tiempo real mientras escribes comentarios o empiezas a escribir una función.

----------------------------------------------------------------------------------------

Ejemplo 1 — Cambio de temática de colores

Se pidió a Cursor que cambiase la paleta de colores SAO (azul oscuro y cyan) por una temática inspirada en Matrix (negro y verde neón). Cursor detectó automáticamente todos los archivos afectados y realizó los cambios de forma coherente en todo el proyecto, manteniendo la estructura y el diseño intactos.

**Lo que mejoró:** Cursor fue capaz de entender el contexto visual del proyecto y aplicar los cambios de forma global sin romper ningún elemento de la interfaz.

-------------------------------------------------------------------------------------

Ejemplo 2 — Selección de roles de jugador

Se pidió a Cursor que implementase un sistema de selección de roles de jugador con tres opciones: Tank, Support y DMG. Cursor generó el código necesario integrándolo con el diseño existente y respetando la estética SAO del proyecto.

**Lo que mejoró:** En lugar de escribir el código manualmente, Cursor generó la funcionalidad completa en pocos segundos, ahorrando tiempo y manteniendo la coherencia visual con el resto de la app.

---------------------------------------------------------------------------------------

# Conclusión

Cursor ha demostrado ser una herramienta muy útil para acelerar el desarrollo. El autocompletado es su punto más fuerte en el día a día, mientras que el Composer resulta especialmente potente para cambios que afectan a varios archivos a la vez.