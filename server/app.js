const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors')
const connection = require('../db/connection')

const galleryCarruselRoutes = require('../routes/carrusel.routes')
const galleryCardRoutes = require('../routes/card.routes')
const footballFieldsRoutes = require('../routes/footballField.routes')
const app = express();

dotenv.config();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

const port = process.env.PORT;

app.listen(port,()=>{
    console.log(`Escuchando puerto: ${port}`);
})


app.use('/gallerycard', galleryCardRoutes);
app.use('/gallerycarrusel', galleryCarruselRoutes)
app.use('/footballfields', footballFieldsRoutes);
connection();