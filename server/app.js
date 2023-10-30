const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connection = require('../db/connection')
const app = express();

const products = require('../routes/products.routes');

dotenv.config();

app.use(express.json());
app.use(morgan('dev'));

const port = process.env.PORT;

app.use('/products', products)

app.listen(port,()=>{
    console.log(`Escuchando puerto: ${port}`);
})


connection()