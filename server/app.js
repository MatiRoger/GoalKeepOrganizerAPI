const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connection = require('../db/connection');
const reservationRoutes = require('../routes/reservation.routes');

const app = express();

dotenv.config();

app.use(express.json());
app.use(morgan('dev'));

const port = process.env.PORT;

app.listen(port,()=>{
    console.log(`Escuchando puerto: ${port}`);
})

//declaracion de rutas
app.use("/reservas", reservationRoutes);


connection();