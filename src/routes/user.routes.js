// El método Router() de Express nos permite crear rutas
const router = require('express').Router();

// Importando controladores
const {
    getUsers,
    postUser,
    putUser,
    deleteUser,

} = require('../controllers/user.controllers');
const validarJWT = require('../middlewares/validar-jwt');

// Definiendo rutas

// Ruta para obtener todos los usuarios
router.get('/user',[
    validarJWT
] ,getUsers);

// Crear nuevo usuario
router.post('/user', [
    validarJWT
], postUser);

// Editar usuario, requiere ID de usuario
router.put('/user', [
    
], putUser);

// Eliminar usuario, requiere ID de usuario
router.delete('/user', [], deleteUser);



// Se exporta el objeto router que contiene las rutas
module.exports = router;