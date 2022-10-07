// Se crea un objeto para añadirle los métodos que se van a exportar
const ctrlHome = {};

// Se añade la propiedad getHome que es una función que recibe dos parámetros
// req: request y res: response. Sirven para manejar la petición y la respuesta del servidor
ctrlHome.getHome =(req, res) => {
    res.send({
        message: 'Petición GET'
    })
};

ctrlHome.postHome =(req, res) => {
    res.send({
        message: 'Petición POST'
    })
};

ctrlHome.putHome = (req, res) => {
    res.json({
        message: "Peticion  PUT"
    })
};

ctrlHome.deleteHome = (req, res) => {
    res.json({
        message: "Peticion DELETE"
    })
};

// Se exporta el objeto ctrlHome que contiene los métodos getHome, postHome, putHome y deleteHome
module.exports = ctrlHome;