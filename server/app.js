const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors')
const connection = require('../db/connection');
const reservationRoutes = require('../routes/reservation.routes');
const galleryCarruselRoutes = require('../routes/carrusel.routes')
const galleryCardRoutes = require('../routes/card.routes')
const footballFieldsRoutes = require('../routes/footballField.routes')
const user = require('../routes/user.routes')
const products = require('../routes/products.routes');
const productCategory = require('../routes/productsCategory.routes');
const app = express();

dotenv.config();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

const port = process.env.PORT;



app.listen(port,()=>{
    console.log(`Escuchando puerto: ${port}`);
})

//declaracion de rutas
app.use("/reservas", reservationRoutes);

app.use('/gallerycard', galleryCardRoutes);
app.use('/gallerycarrusel', galleryCarruselRoutes)
app.use('/user', user);
app.use('/products', products);
app.use('/productCategory', productCategory);
app.use('/footballfields', footballFieldsRoutes);
connection();