const express = require('express');
const { createFootballField, getFootballFields, deleteFootballField, updateFootballField } = require('../controllers/footballField.controller');

const route = express();


route.post('/', createFootballField);
route.get('/', getFootballFields);
route.delete('/', deleteFootballField);
route.patch('/',updateFootballField)

module.exports = route;