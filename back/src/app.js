// CREACION Y CONFIGURACION DE EXPRESS
const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

// RUTAS
app.use('/api', require('./routes/api'));

module.exports = app