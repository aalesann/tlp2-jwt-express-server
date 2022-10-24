const User = require("../models/User")


const validarEmail = async (value) => {
    console.log({ value })
    const user = await User.findOne({ email: value })

    if (user) {
        throw new Error('El usuario ya existe')
    }

    return true;
}


module.exports = validarEmail;