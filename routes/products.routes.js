const express = require('express');
const routes = express();
const { createProducts } = require('../controllers/products.controller');

routes.post('/', createProducts);

module.exports = routes