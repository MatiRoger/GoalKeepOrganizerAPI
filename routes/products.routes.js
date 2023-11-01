const express = require('express');
const routes = express();
const { createProducts, getAllProducts } = require('../controllers/products.controller');

routes.post('/', createProducts);
routes.get('/', getAllProducts);

module.exports = routes