# TaskFlow API — Backend

API RESTful construida con Node.js y Express para gestionar las misiones de TaskFlow.

## 🚀 Cómo arrancar el servidor
```bash
cd server
npm install
npm run dev
```

El servidor arrancará en `http://localhost:3000`.

---

## 🗂️ Arquitectura de carpetas
```
server/
├── src/
│   ├── config/
│   │   └── env.js           # Carga y valida variables de entorno
│   ├── controllers/
│   │   └── task.controller.js  # Extrae datos de red y llama a servicios
│   ├── routes/
│   │   └── task.routes.js   # Mapea URLs y verbos HTTP a controladores
│   ├── services/
│   │   └── task.service.js  # Lógica de negocio pura
│   └── index.js             # Punto de entrada del servidor
├── .env                     # Variables de entorno (no subir a Git)
├── .gitignore
└── package.json
```

---

## 🔄 Arquitectura por capas

La aplicación está dividida en tres capas estrictas:

**1. Capa de rutas (routes)**
Su única misión es escuchar la red y mapear cada URL y verbo HTTP al controlador correcto. No toma decisiones lógicas.

**2. Capa de controladores (controllers)**
Extrae los datos de `req.body` y `req.params`, aplica validaciones defensivas y llama a la capa de servicios. Si la validación falla devuelve un `400`. Si el servicio lanza un error lo captura y devuelve el código HTTP adecuado.

**3. Capa de servicios (services)**
Contiene la lógica de negocio pura. No conoce la existencia de Express, HTTP, `req` ni `res`. Trabaja únicamente con datos limpios de JavaScript.

---

## 🔧 Middlewares

**`express.json()`**
Intercepta el cuerpo crudo de cada petición HTTP y lo convierte en un objeto JavaScript accesible en `req.body`.

**`cors()`**
Gestiona las cabeceras de seguridad CORS, permitiendo que el frontend bajo un dominio diferente pueda consumir la API.

**Middleware global de errores `(err, req, res, next)`**
Captura cualquier error no controlado que ocurra en la aplicación. Si el error es `NOT_FOUND` devuelve un 404. Para cualquier otro error registra la traza en consola y devuelve un 500 genérico sin filtrar detalles técnicos al cliente.

---

## 📡 Endpoints de la API

### GET /api/v1/tasks
Devuelve todas las tareas almacenadas.

**Respuesta exitosa (200):**
```json
[
  {
    "id": 1773998446549,
    "texto": "Derrotar al boss final",
    "categoria": "⚔️ BOSS FIGHT",
    "prioridad": "urgente",
    "done": false
  }
]
```

---

### POST /api/v1/tasks
Crea una nueva tarea.

**Body requerido:**
```json
{
  "texto": "Derrotar al boss final",
  "categoria": "⚔️ BOSS FIGHT",
  "prioridad": "urgente"
}
```

**Respuesta exitosa (201):**
```json
{
  "id": 1773998446549,
  "texto": "Derrotar al boss final",
  "categoria": "⚔️ BOSS FIGHT",
  "prioridad": "urgente",
  "done": false
}
```

**Errores posibles:**
- `400` — Texto vacío o menor de 3 caracteres
- `400` — Categoría no válida
- `400` — Prioridad no válida

---

### DELETE /api/v1/tasks/:id
Elimina una tarea por su ID.

**Respuesta exitosa (204):** Sin contenido

**Errores posibles:**
- `400` — ID no es un número válido
- `404` — Tarea no encontrada

---

## 🔐 Variables de entorno

| Variable | Descripción | Ejemplo |
|---|---|---|
| PORT | Puerto donde escucha el servidor | 3000 |

Crea un archivo `.env` en la carpeta `server` con estas variables. Nunca subas este archivo a Git.