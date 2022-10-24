const router = require('express').Router();

const { createTask, getTasks } = require('../controllers/task.controllers');
const { check } = require('express-validator');

const validarJWT = require('../middlewares/validar-jwt');
const validarCampos = require('../middlewares/validar-campos');
const validarEmail = require('../helpers/validarEmail');

// Crear nueva tarea
router.post('/task', [
    //validarJWT,
    check('title')
    .not()
    .isEmpty().withMessage('- campo vacío')
    .isString().withMessage('El titulo no es un string'),

    check('description')
    .not()
    .isEmpty().withMessage('- campo vacío')
    .isString().withMessage('La descripcion no es un string'),

    validarCampos
], createTask);

router.get('/task', [
    validarJWT
], getTasks);

module.exports = router;