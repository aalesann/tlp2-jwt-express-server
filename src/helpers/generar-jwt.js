const jwt = require('jsonwebtoken');

const generarJWT = (uid) => {
    const payload = { uid };
    return new Promise((resolve, reject) => {
        // Se genera el token con el id del usuario y la palabra secreta
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: '5h'
        }, (err, token) => {
            if(err){
                reject('No se pudo generar el token');
            }

            resolve(token);
        })
    })
}


module.exports = generarJWT;