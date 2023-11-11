const express = require('express');
const routes = express();
const { createProducts, editProducts, deleteProducts, getAllItems } = require('../controllers/products.controller');

routes.post('/', createProducts);
routes.get('/', getAllItems)
routes.put('/:id', editProducts);
routes.delete('/:id', deleteProducts);

module.exports = routes