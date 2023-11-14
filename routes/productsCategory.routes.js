const express = require('express');
const routes = express();
const { createProductCategory, getAllCategories } = require('../controllers/productCategory.controller');

routes.post('/', createProductCategory);
routes.get('/', getAllCategories)

module.exports = routes;