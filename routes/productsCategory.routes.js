const express = require('express');
const routes = express();
const { createProductCategory } = require('../controllers/productCategory.controller');

routes.post('/', createProductCategory);

module.exports = routes;