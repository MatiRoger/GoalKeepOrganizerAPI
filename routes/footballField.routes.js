const express = require('express');
const { createFootballField, getFootballFields } = require('../controllers/footballField.controller');

const route = express();


route.post('/', createFootballField);
route.get('/', getFootballFields);
route.delete('/', deleteFootballField);

module.exports = route;