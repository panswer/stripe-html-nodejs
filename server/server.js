const express = require('express');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const cors = require('cors');
const colors = require('colors');

/* 
    Inicializacion
*/
const app = express();

/* 
    Configuracion
*/
let pathENV = path.join(path.resolve(__dirname, '../.env'));

if (fs.existsSync(pathENV)) {
    dotenv.config({ path: pathENV });
    console.log(`${'SUCCESS'.bgGreen.black}: Archivo de variables cargadas satisfactoriamente`);
} else {
    console.log(`${'ERROR'.bgRed.black}: Error en direccion: ${pathENV}`);
}
require('./config/config');

/* 
    Middlewares
*/
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/* 
    Routes
*/
app.use(require('./routes/index'));

/* 
    Inicio de servicio
*/
app.listen(process.env.PORT, err => {
    if (err) {
        console.log(err);
        console.log(`${'ERROR'.bgRed.black}: no se a podido iniciar el servicio. ${err.message}`);
    } else {
        console.log(`${'SUCCESS'.bgGreen.black}: Servicio iniciado en puerto ${process.env.PORT}`);
    }
});