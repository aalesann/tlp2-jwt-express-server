const User = require("../models/User");
const generarJWT = require("../helpers/generar-jwt");
const bcrypt = require('bcrypt');


const ctrlAuth = {};

ctrlAuth.iniciarSesion = async (req, res) => {

    const { username, password } = req.body;
    if(!username || !password){
        return res.status(400).json({
            ok: false,
            msg: 'Todos los campos son obligatorios'
        });
    }

    try {
        // Buscar si el usuario pertenece a nuestro sistema
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'Error al autenticarse' - 'Usuario no encontrado'
            });
        }

        if (!user.isActive) {
            return res.status(400).json({
                ok: false,
                msg: 'Error al autenticarse' - 'Usuario inactivo'
            });
        }

        // Verificar la contraseña
        const validPassword = bcrypt.compareSync(password, user.password);
        
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Error al autenticarse' - 'Contraseña incorrecta'
            });
        }

        // Generar el token
        const token = await generarJWT(user._id)
        if(!token){
            return res.status(400).json({
                ok: false,
                msg: 'Error al autenticarse'
            });
        }

        const userWithToken = user.toObject();
        userWithToken.token = token;
        return res.json(userWithToken);
    } catch (error) {
        return res.json({ msg: 'Error al iniciar sesión' });
    }
};

module.exports = ctrlAuth;