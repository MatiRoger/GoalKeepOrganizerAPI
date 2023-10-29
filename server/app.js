const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors')
const connection = require('../db/connection')
const app = express();

dotenv.config();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

const port = process.env.PORT;

app.listen(port,()=>{
    console.log(`Escuchando puerto: ${port}`);
})


connection()