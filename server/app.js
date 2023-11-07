const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors')
const connection = require('../db/connection')
const app = express();

const user = require('../routes/user.routes')
const products = require('../routes/products.routes');
const productCategory = require('../routes/productsCategory.routes');

dotenv.config();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

const port = process.env.PORT;

app.use('/user', user);
app.use('/products', products);
app.use('/productCategory', productCategory);

app.listen(port,()=>{
    console.log(`Escuchando puerto: ${port}`);
})


connection()