const express = require('express');
const routes = express();
const { createcards, deletecards, getAllCards} = require('../controllers/card.controller');

routes.post('/', createcards);
routes.get('/', getAllCards);
routes.delete('/:id', deletecards);

module.exports = routes