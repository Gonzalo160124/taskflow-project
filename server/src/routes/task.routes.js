const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');

/**
 * @swagger
 * /api/v1/tasks:
 *   get:
 *     summary: Obtiene todas las tareas
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: Lista de tareas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   texto:
 *                     type: string
 *                   categoria:
 *                     type: string
 *                   prioridad:
 *                     type: string
 *                   done:
 *                     type: boolean
 */
router.get('/', taskController.getTasks);

/**
 * @swagger
 * /api/v1/tasks:
 *   post:
 *     summary: Crea una nueva tarea
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - texto
 *               - categoria
 *               - prioridad
 *             properties:
 *               texto:
 *                 type: string
 *                 example: Derrotar al boss final
 *               categoria:
 *                 type: string
 *                 example: "⚔️ BOSS FIGHT"
 *               prioridad:
 *                 type: string
 *                 example: urgente
 *     responses:
 *       201:
 *         description: Tarea creada correctamente
 *       400:
 *         description: Datos inválidos
 */
router.post('/', taskController.createTask);

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   delete:
 *     summary: Elimina una tarea por su ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID de la tarea
 *     responses:
 *       204:
 *         description: Tarea eliminada correctamente
 *       404:
 *         description: Tarea no encontrada
 */
router.delete('/:id', taskController.deleteTask);

module.exports = router;