Herramientas del ecosistema Backend

# Axios
Axios es una librería JavaScript para hacer peticiones HTTP desde el navegador o desde Node.js. Es una alternativa más potente a `fetch` nativo ya que incluye interceptores de peticiones y respuestas, transformación automática de JSON, cancelación de peticiones y mejor manejo de errores. Se usa cuando necesitas más control sobre las peticiones HTTP de tu aplicación.

---

# Postman
Postman es una plataforma para diseñar, probar y documentar APIs. Permite hacer peticiones HTTP de cualquier tipo (GET, POST, PUT, DELETE) sin necesidad de escribir código, organizar las peticiones en colecciones, crear entornos de variables (desarrollo, producción), automatizar pruebas y generar documentación de la API automáticamente. Es la herramienta estándar de la industria para trabajar con APIs REST.

---

# Sentry
Sentry es una plataforma de monitorización de errores en tiempo real. Cuando una aplicación en producción lanza un error, Sentry lo captura automáticamente y envía una notificación al equipo de desarrollo con toda la información necesaria para reproducirlo: stack trace, contexto del usuario, versión del código, etc. Se usa para detectar y solucionar errores en producción sin necesidad de que el usuario los reporte manualmente.

---

# Swagger
Swagger (también conocido como OpenAPI) es un estándar para documentar APIs REST. Permite describir todos los endpoints de una API (URLs, métodos HTTP, parámetros, respuestas) en un formato estándar que genera automáticamente una interfaz web interactiva donde cualquier desarrollador puede explorar y probar la API sin necesidad de herramientas externas. Se usa para que los equipos de frontend y backend puedan trabajar de forma independiente con un contrato claro.

---

¿Por qué se usan estas herramientas juntas?

En un proyecto real estas herramientas forman un ecosistema completo:

- **Axios** gestiona las peticiones HTTP del frontend de forma robusta
- **Postman** permite probar y documentar la API durante el desarrollo
- **Swagger** genera documentación interactiva de la API para otros desarrolladores
- **Sentry** monitoriza los errores en producción para mantener la app estable