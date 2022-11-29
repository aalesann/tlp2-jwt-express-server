/* 
* Archivo de configuración de la aplicación
* En este archivo se configuran los parámetros de la aplicación
* como ser: el puerto, variables de entorno, rutas y middlewares 
*/

const path = require('path');
const express = require('express'); // Importando librería express
const cors = require('cors');
const morgan = require('morgan');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const dbConnect = require('./src/db/connection'); // Se importa la función de conexión a la BD.

dbConnect(); // Se inicializa la conexión a la Base de Datos

// Inicializaciones
const app = express(); // Inicializando la librería express

// Creando un servidor http 
const server = http.createServer(app);

// Configurando socket.io para que escuche en el servidor http
const io = new Server(server);


// Configuraciones
const port = process.env.PORT || 4000;


// MIDDLEWARES
app.use(cors());
app.use(morgan('dev'));
app.use(express.json()); // Para que el servidor comprenda archivos con formato json


// Directorio de archivos estáticos
app.use(express.static(path.join(__dirname, 'src/public')));

// Importando rutas
app.use(require('./src/routes/user.routes')); // Importando rutas
app.use(require('./src/routes/auth.routes')); // Importando rutas
app.use(require('./src/routes/task.routes')); // Importando rutas

// A partir de aquí, debería pasarse toda la configuración y escucha de eventos, hacía otro archivo
let listMessages = [];

// Socket.io events
io.on('connection', (socket) => {

    // Escuchando evento de envío de mensaje
    socket.on('new-message', (data) => {
        
        // Guardando mensaje en la lista de mensajes
        listMessages = [...listMessages, data ];

        // Remitir mensaje escuchado a todos los clientes conectados
        io.emit('new-message', listMessages);
    });


    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

});
// Aquí termina la configuración de socket.io

// Configurando puerto
server.listen(port, () => console.log(`Servidor corriendo en http://localhost:${port}`));


// Instalar dependecias con npm install
// Installar nodemon con npm i nodemon -D
// Ejecutar con: npm run dev
// Para detener el servidor: Hacer un clic en la terminal y presionar Ctrl + C