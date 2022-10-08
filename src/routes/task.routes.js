const router = require('express').Router();
const { createTask, getTasks } = require('../controllers/task.controllers');

const validarJWT = require('../middlewares/validar-jwt');

// Crear nueva tarea
router.post('/task', [
    validarJWT,
], createTask);


router.get('/task', [
    validarJWT
], getTasks);

module.exports = router;